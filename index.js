// Colyseus + Express
const colyseus = require("colyseus");
const http = require("http");
const express = require("express");
const path = require("path");
const cors = require("cors");
const monitor = require("@colyseus/monitor");

const port = process.env.port || 3000;

//room partida
const PartidaRoom = require("./rooms/PartidaRoom");

const app = express();
app.use(cors());
app.use(express.json());

const gameServer = new colyseus.Server({
  server: http.createServer(app),
  express: app,
});

// Register PartidaRoom as "partida"
gameServer.define("partida", PartidaRoom);

// rutas
app.use('/', express.static(path.join(__dirname, "static/vista")));

// (optional) attach web monitoring panel
app.use('/colyseus', monitor.monitor(gameServer));

gameServer.onShutdown(function(){
  console.log(`game server is going down.`);
});


gameServer.listen(port);
console.log(`Listening on http://localhost:${ port }`);
