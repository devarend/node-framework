# Node-framework
> A lightweight Node.js web framework with TypeScript

## Routing
GET routes are added with the `get` method and POST routes with the `post` method.
You can specify a controller or a callback:

```js
app.get("/", () => { console.log("GET Route") });
app.post("/login", () => { console.log("POST Route") });
```
**Query parameters**:

```js
app.get("/:id", (req: Request) => { console.log(req.query.id) });
```
`req.query`can be used for query parameters

**Form data**:
```js
app.post("/login", (req: Request)=> { console.log(req.body.testform) });
```
`req.body`can be used to retrieve form data

**Response**:
```js
app.get("/", (req: Request, res: Response) => { 
  res.html("<h1>HTML response</h1>");
});

app.get("/", (req: Request, res: Response) => { 
  res.json( {text: 'JSON response'} );
});
```
`res.html`can be used to render HTML
<br/>
`res.json`can be used to render JSON


## Middleware

Middleware can be added to routes with the method `middleware(callback: Function)`:

```js
app.get("/", ()=> { console.log("GET Route") }).middleware(() => { console.log("Middleware") });
```

## Controllers

You can specify a controller as a callback:

```js
app.post("/login", userController.login);
```

## Content Types
✅ application/json
<br/>
✅ application/x-www-form-urlencoded

## LICENSE

```
MIT License

Copyright (c) 2022 Arend

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

