declare module "app" {
  interface IncomingMessage {
    body: any; // Actually should be something like `multer.Body`
    files: any; // Actually should be something like `multer.Files`
  }
}
