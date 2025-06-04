import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import cors from "cors";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();
  app.use(cors());
  app.use(express.static(path.join(__dirname, "public")));
  app.get("/data/*", (req, res) => {
    const filePath = path.join(__dirname, "data", req.params[0]);

    if (!filePath.endsWith(".json")) {
      res.status(400).send("Invalid file type");
      return;
    }

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        if (err.code === "ENOENT") {
          res.status(404).send("File not found");
        } else {
          res.status(500).send("Error reading file");
        }
        return;
      }
      res.header("Content-Type", "application/json");
      res.send(data);
    });
  });

  // Start http server
  app.listen(3001, () => {
    console.log(`Server started at http://localhost:3001`);
  });
}

createServer();

process.on("SIGINT", async () => {
  console.log("Database connection closed");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("Database connection closed");
  process.exit(0);
});
