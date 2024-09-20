import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import "dotenv/config";
const __dirname = import.meta.dirname;
const pathToFile = path.join(__dirname, "index.html");

const mimeTypes = {
  ".css": "text/css",
  ".js": "text/javascript",
  ".png": "image/png",
  ".jpeg": "image/jpeg",
  ".html": "text/html",
};

const getStaticFile = (res, filePath, ext) => {
  res.setHeader("Content-Type", mimeTypes[ext]);
  fs.readFile(path.join(".", "public", filePath), (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.end();
    } else {
      res.end(data);
    }
  });
};

const server = http.createServer((req, res) => {

  const url = req.url;
  
  switch (url) {
    case "/":
      let body = "";
      req.on("data", (buf) => {
        body += buf;
        console.log(body);
      });

      req.on("end", () => {
        const pathToFile = path.resolve(__dirname, "public", "info.txt");
        const writeStream = fs.createWriteStream(pathToFile);

        writeStream.write(body, (err) => {
          if (err) {
            res.statusCode = 500;
            res.end("Internal Server Error");
            return;
          }
          res.writeHead(201, { "Content-Type": "text/plain" });
          res.end("Data received and written to file");
        });
      });

      break;
    case "/about":
      const aboutPage = fs.readFileSync(path.join(__dirname, "about.html"));
      res.write(aboutPage);
      res.end();
      break;
    default:
      const extname = path.extname(url).toLocaleLowerCase();
      if (extname in mimeTypes) {
        getStaticFile(res, url, extname);
      } else {
        res.statusCode = 404;
        res.end();
      }
  }
});

server.listen(process.env.PORT, () => {
  console.log(`Server is running: http://localhost:${process.env.PORT}`);
});