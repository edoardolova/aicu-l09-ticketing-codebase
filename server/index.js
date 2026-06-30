import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { currentOperatorId, operators } from "./data/operators.js";
import { allowedAreas, allowedPriorities, allowedSourceChannels, tickets } from "./data/tickets.js";

const app = express();
const port = Number(process.env.PORT) || 3001;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const distPath = path.join(projectRoot, "dist");
const indexPath = path.join(projectRoot, "index.html");
const sourceStylesPath = path.join(projectRoot, "src", "styles.css");
const runtimeAppPath = path.join(projectRoot, "src", "runtime-app.js");

app.use(express.json());

app.get("/api/me", (req, res) => {
  const operator = operators.find((item) => item.id === currentOperatorId);

  res.json({
    operator
  });
});

app.get("/api/tickets", (req, res) => {
  if (req.query.empty === "true") {
    res.json([]);
    return;
  }

  res.json(tickets.filter((ticket) => ticket.status === "open"));
});

app.get("/api/ticket-options", (req, res) => {
  res.json({
    priorities: allowedPriorities,
    areas: allowedAreas,
    sourceChannels: allowedSourceChannels
  });
});

app.post("/api/tickets", (req, res) => {
  res.status(501).json({
    code: "NOT_IMPLEMENTED",
    message:
      "POST /api/tickets e' volutamente incompleto: in L09 osserviamo gap UI, validazione, campo derivato dal server e persistenza."
  });
});

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

app.get("/styles.css", (req, res) => {
  res.sendFile(sourceStylesPath);
});

app.get("/runtime-app.js", (req, res) => {
  res.type("application/javascript").sendFile(runtimeAppPath);
});

app.get("/", (req, res) => {
  res.sendFile(indexPath);
});

const server = app.listen(port, "127.0.0.1", () => {
  console.log(`API server ready on http://127.0.0.1:${port}`);
});
const keepAlive = setInterval(() => {}, 2147483647);

server.on("error", (error) => {
  clearInterval(keepAlive);
  console.error(`API server failed on http://127.0.0.1:${port}`);
  console.error(error);
  process.exit(1);
});

server.on("close", () => {
  clearInterval(keepAlive);
});
