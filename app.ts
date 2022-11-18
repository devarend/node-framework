import {Application} from "./src/Application";
import {Router} from "./src/routing/Router";
import {Request} from "./src/http/Request";
import {Response} from "./src/http/Response";

const router = new Router();
const app = new Application(router);

app.get("/", (req: Request, res: Response) => {
    res.html("<form method='POST' action='/test'><input name='testform'><input name='testform2'><button type='submit'>Submit</button></form>");
});
app.post("/test", (req: Request, res: Response) => {
    res.json({value: req.body.testform})
});
app.get("/middleware", () => {
    console.log("test")
}).middleware(() => {
    console.log("middleware")
});

app.listen(8080);
