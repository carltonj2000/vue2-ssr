const fs = require("fs");
const path = require("path");
const Vue = require("vue");
const server = require("express")();
const vue_s_renderer = require("vue-server-renderer");

server.get("*", (req, res) => {
  const template = fs.readFileSync(
    path.join(__dirname, "./index.template3.html"),
    "utf-8"
  );
  const renderer = vue_s_renderer.createRenderer({ template });
  const app = new Vue({
    data: { url: req.url },
    template: `<div>{{ url }}</div>`,
  });

  const context = {
    title: "hello",
    metas: `<meta name="keyword" content="vue,ssr" />
    <meta name="description" content="vue ssr demo" />`,
  };
  renderer.renderToString(app, context, (err, html) => {
    if (err) {
      res.status(500).end("Internal Server Error");
      console.log(err);
      return;
    }
    res.end(html);
  });
});

server.listen(3000);
