import http, { IncomingMessage, Server, ServerResponse } from "http";
const { parser } = require('html-metadata-parser');
/*
implement your server code here
*/

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    interface Metadata {
      meta: Meta2,
      og: object,
      images: string[]
    }

    interface Meta2 {
      title: string,
      description: string,
      url: string,
    }

    if (req.method === "GET" && req.url?.match(/\/api\/metadata\/([a-z0-9]+)/)) {

      const address = req.url.split('/')[3]
      const url = `https://${address}`

      parser(url).then(
        (response: Metadata) => {
          const { meta, images } = response
          
          const obj = {
            Title: meta.title,
            Description: meta.description,
            images
          }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(obj, null, 3));

      }, (err: Error) => {

        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Address not found" }));
      })
      
    } else {

      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: 'Route not found' }));

    }
  }
);

server.listen(3001);
