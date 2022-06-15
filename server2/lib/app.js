"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const { parser } = require('html-metadata-parser');
/*
implement your server code here
*/
const server = http_1.default.createServer((req, res) => {
    var _a;
    if (req.method === "GET" && ((_a = req.url) === null || _a === void 0 ? void 0 : _a.match(/\/api\/metadata\/([a-z0-9]+)/))) {
        const address = req.url.split('/')[3];
        const url = `https://${address}`;
        parser(url).then((response) => {
            const { meta, images } = response;
            const obj = {
                Title: meta.title,
                Description: meta.description,
                images
            };
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(obj, null, 3));
        }, (err) => {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Address not found" }));
        });
    }
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: 'Route not found' }));
    }
});
server.listen(3001);
