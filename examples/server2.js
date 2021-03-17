const fs = require("fs");
const path = require("path");
const Vue = require("vue");
const server = require("express")();
const renderer = require("vue-server-renderer").createRenderer();

server.get("*", (req, res) => {
  const template = fs.readFileSync(
    path.join(__dirname, "./index.template2.html"),
    "utf-8"
  );
  const app = new Vue({ data: { url: req.url }, template });

  renderer.renderToString(app, (err, html) => {
    if (err) {
      res.status(500).end("Internal Server Error");
      return;
    }
    res.end(html);
  });
});

server.listen(3000);
