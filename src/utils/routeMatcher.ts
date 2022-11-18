import {Route} from "../routing/Route";

export const matchRoute = (route: Route, requestPath: string) => {
    const pathPieces = route.getPath().substring(1).split("/");
    const requestPathPieces = requestPath.substring(1).split("/");

    if (pathPieces.length != requestPathPieces.length) {
        return false;
    }

    return pathPieces.every((pathPiece: string, index: number) => {
        if (pathPiece.includes(":")) {
            const parameterKey = pathPiece.substring(1);
            const parameterValue = requestPathPieces[index];
            route.setParameter(parameterKey, parameterValue);
            return true;
        }
        return pathPiece === requestPathPieces[index];
    });
}

export const getMatchedRoute = (routes: { GET: Array<Route>, POST: Array<Route>}, method: "GET" | "POST", path: string) => {
    const matchedRoute = routes[method].find((route: Route) => {
        return matchRoute(route, path);
    });
    if (!matchedRoute) {
        throw new Error("Route not found: " + path);
    }
    return matchedRoute;
}