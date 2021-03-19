import http from 'http'; 
import fs from 'fs'; 

const server = http.createServer(function (req, res) { 
  if (req.url == "/page") {
      fileResponse('./index.htm', res);
  }
  else if (req.url == "/getData") {
      fileResponse('db.json', res);
  }
  else if (req.url == "/saveData") {
      saveToDb('db.json', req);
      res.end();
  }
  else if (req.url == "/index.js") {
      fileResponse('./index.js', res);
  }
  else if (req.url == "/table.js") {
      fileResponse('./table.js', res);
  }
  else if (req.url == "/style.css") {
      fileResponse('style.css', res);
  }
  else
      fileResponse('./home.htm', res);
});


function fileResponse(file: string, res: http.ServerResponse) {
  fs.readFile(file, function (err, fileContent) {
      if(err) 
      {
          res.writeHead(404);
          res.write('File not found');
          res.end();
          return;
      }

      res.writeHead(200);
      res.write(fileContent);  
      res.end();  
  });
}

function saveToDb(file: string, req: http.IncomingMessage) {
  let data: string = "";
  req.on('data', chunk => {
      data += chunk;
  });
  req.on('end', () => {
      fs.writeFile(file, data, (err) => {
          if (err) {
              throw err;
          }
      });
      console.log("New data received.");
  })
}

server.listen(80);
console.log('Server version 0.11 (TS server)')
console.log('Running on port 80')

