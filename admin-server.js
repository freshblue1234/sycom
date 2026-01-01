const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  console.log('Request:', req.method, req.url);
  
  if (req.url === '/' || req.url === '/admin' || req.url === '/login') {
    fs.readFile(path.join(__dirname, 'simple-admin.html'), (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end('Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
    });
  } else {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end('<h1>404 - Not Found</h1><p>Try <a href="/">going to the admin login</a></p>');
  }
});

const PORT = 9000;
server.listen(PORT, () => {
  console.log('Admin login server running at http://localhost:' + PORT);
});
