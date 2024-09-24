const { leerPosts1, escribirPosts1 } = require("./funciones");

const cors = require("cors");

const express = require("express"); //Importamos express

const app = express(); //Instanciamos express

const port = 3000; //Definimos el puerto

app.listen(port, () => console.log("Servidor escuchado en puerto 3000"));

app.use(express.json()); //Argumento middleware.

app.use(cors());

app.get("/posts", async (req, res) => {
  const obtenerPosts = await leerPosts1();
  res.json(obtenerPosts);
});

app.post("/canciones", async (req, res) => {
  const { titulo, url, descripcion } = req.body;
  await escribirPosts1(titulo, url, descripcion);
  res.send("El post fue agregado con éxito");
});
