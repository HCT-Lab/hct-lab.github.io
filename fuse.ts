import { fusebox, sparky, pluginRaw } from "fuse-box";

class Context {
  runServer;
  getConfig = () =>
    fusebox({
      target: "browser",
      entry: "src/site.tsx",
      webIndex: {
        template: "src/index.html",
      },
      cache: true,
      devServer: this.runServer,
      link: { resourcePublicRoot: "public" },
      plugins: [
        pluginRaw(/\.yaml/, { useDefault: true }),
        pluginRaw(/\.bib/, { useDefault: true }),
      ],
    });
}
const { task } = sparky<Context>(Context);

task("default", async (ctx) => {
  ctx.runServer = true;
  const fuse = ctx.getConfig();
  await fuse.runDev();
});

task("preview", async (ctx) => {
  ctx.runServer = true;
  const fuse = ctx.getConfig();
  await fuse.runProd({ uglify: false });
});
task("dist", async (ctx) => {
  ctx.runServer = false;
  const fuse = ctx.getConfig();
  await fuse.runProd({ uglify: false });
});
