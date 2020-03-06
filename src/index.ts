import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { mkdir } from './utils/promisified';
import createServer from './server';

dotenv.config();
const uploadPath = path.join(__dirname, process.env.UPLOAD_DIR);
const outputPath = path.join(__dirname, process.env.OUTPUT_DIR);

if (!fs.existsSync(uploadPath)) {
  mkdir(uploadPath);
}

if (!fs.existsSync(outputPath)) {
  mkdir(outputPath);
}

createServer({
  logSeverity: 'info',
});
