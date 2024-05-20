const MIME_TYPES = {
  default: "application/octet-stream",
  html: "text/html; charset=UTF-8",
  js: "application/javascript",
  css: "text/css",
  png: "image/png",
  jpg: "image/jpg",
  gif: "image/gif",
  ico: "image/x-icon",
  svg: "image/svg+xml",
};

class StaticServer {
    constructor(fs, path) {
        this.fs = fs;
        this.path = path;
    }

    async prepareFile(url) {
        const STATIC_PATH = this.path.join(process.cwd(), url)
        const paths = [STATIC_PATH];
        if (url.endsWith("/")) paths.push("index.html");
        const filePath = this.path.join(...paths);

        const pathTraversal = !filePath.startsWith(STATIC_PATH);
        const exists = await this.fs.promises.access(filePath).then(() => true, () => false);
        const found = !pathTraversal && exists;
        console.log(filePath, pathTraversal, exists, found)
        const streamPath = found ? filePath : STATIC_PATH + "/404.html";
        const ext = this.path.extname(streamPath).substring(1).toLowerCase();
        const stream = this.fs.createReadStream(streamPath);
        return { found, ext, stream };
    };

    async serve(req, res) {
        const file = await this.prepareFile(req.url);
        const statusCode = file.found ? 200 : 404;
        const mimeType = MIME_TYPES[file.ext] || MIME_TYPES.default;
        res.writeHead(statusCode, { "Content-Type": mimeType });
        file.stream.pipe(res);
    }
}

module.exports = StaticServer;