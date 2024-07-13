import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";
import url from "url";
import router from './router/router'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

async function main() {
  const PORT = 8100;
  const serverApp = express();
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });
  serverApp.listen(PORT, () => {
    console.log("项目已成功启动");
    console.log(`访问地址：http://localhost:${PORT}/app/`);
    console.log(`Api地址：http://localhost:${PORT}/api/`);
  });
  serverApp.use(vite.middlewares);
  serverApp.use("/app*", async (req, res, next) => {
    try {
      let template = fs.readFileSync(
        path.resolve(__dirname, "../index.html"),
        "utf-8"
      );
      res.status(200).set({ "Content-Type": "text/html" }).end(template);
    } catch (error) {
      res.status(400).set({ "Content-Type": "text/html" }).end(error);
    }
  });
  serverApp.use("/api",router );
  return serverApp;
}
main();
