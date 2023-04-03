// run `node index.js` in the terminal
const http = require('http');
const fs = require('fs');
const path = require('path');

http
  .createServer((req, res) => {
    if (req.url === '/') {
      res.setHeader('Content-Type', 'text/html');
      res.writeHead(200);
      res.end(fs.readFileSync('./index.html'));
    } else {
      try {
        const content = fs.readFileSync(path.join(__dirname, req.url));
        if (req.url.endsWith('.js')) {
          res.setHeader('Content-Type', 'application/javascript');
        } else if (req.url.endsWith('.html')) {
          res.setHeader('Content-Type', 'text/html');
        } else {
          res.setHeader('Content-Type', 'text/css');
        }
        res.writeHead(200);
        res.end(content);
      } catch (error) {
        res.setHeader('Content-Type', 'text/html');
        res.writeHead(400);
        res.end(
          '<!doctype html><html><head></head><body><h1>Not found</h1></body></html>'
        );
      }
    }
  })
  .listen(3000);
