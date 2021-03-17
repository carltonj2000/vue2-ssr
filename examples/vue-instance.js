const Vue = require("vue");
const app = new Vue({ template: `<div>Hello World</div>` });
const renderer = require("vue-server-renderer").createRenderer();

renderer.renderToString(app, (err, html) => {
  if (err) throw err;
  console.log(html);
  // => <div data-server-rendered="true">Hello World</div>
});

renderer
  .renderToString(app)
  .then((html) => {
    console.log(html);
  })
  .catch((err) => {
    console.error(err);
  });
