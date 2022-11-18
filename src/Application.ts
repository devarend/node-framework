import * as http from "http";
import { Router } from "./routing/Router";
import { IncomingMessage, ServerResponse } from "http";
import { Route } from "./routing/Route";

export interface IApplication {
    get(path: string, callback: Function): this;
    post(path: string, callback: Function): this;
    listen(port: number, host: string): void;
}

export class Application implements IApplication {
    private router: Router;
    private route: Route;

    constructor(router: Router) {
        this.router = router;
    }

    public get(path: string, callback: Function): this {
        this.route = this.router.addGet(path, callback);
        return this;
    }

    public post(path: string, callback: Function): this {
        this.route = this.router.addPost(path, callback);
        return this;
    }

    public middleware(middleware: Function): void {
        this.route.setMiddleware(middleware);
    }

    private errorResponse(res: ServerResponse, errorMessage: string) {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.write(JSON.stringify({ error: errorMessage }));
        res.end();
    }

    private parsePostRequest(req: IncomingMessage, res: ServerResponse) {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            if (!data) {
                return false;
            }
            try {
                this.router.run(req, res, data);
            } catch (e) {
                this.errorResponse(res, e.message);
            }
        });
        return data;
    }

    private listener = (req: IncomingMessage, res: ServerResponse) => {
        if (req.url === '/favicon.ico') {
            res.writeHead(200, {'Content-Type': 'image/x-icon'} );
            res.end();
            return;
        }

        try {
            const data = this.parsePostRequest(req, res);
            this.router.run(req, res, data);
        } catch (e) {
            this.errorResponse(res, e.message);
        }
    }

    public listen(port: number, host: string = "localhost"): void {
        const server = http.createServer(this.listener);
        server.listen(port, host, () => {
            console.log(`Server is running on http://${host}:${port}`);
        });
    }

}