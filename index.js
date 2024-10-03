const {
  leerPosts1,
  escribirPosts1,
  agregarLike,
  borrarPost,
} = require("./funciones");

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

//Capturar los posibles errores en una consulta SQL
//realizada con el paquete pg usando la sentencia try catch.

app.post("/canciones", async (req, res) => {
  try {
    const { titulo, url, descripcion } = req.body;
    await escribirPosts1(titulo, url, descripcion);
    res.send("El post fue agregado con éxito");
  } catch (error) {
    const { code } = error;
    if (code == "23502") {
      res
        .status(400)
        .send(
          "Se ha violado la restricción NOT NULL en uno de los campos de la tabla"
        );
    }
    res.status(500).send(error.message);
  }
});

//Agregar una ruta PUT en una API REST y utilizar para modificar//
//registros en una tabla alojada en PostgreSQL.

app.put("/posts/like/:id", async (req, res) => {
  const id = req.params.id;
  await agregarLike(id);
  res.send("resultado exitoso");
});

//Agregar una ruta DELETE en una API REST y utilizar para eliminar//
//registros en una tabla alojada en PostgreSQL.

app.put("/posts/:id", async (req, res) => {
  const id = req.params.id;
  await borrarPost(id);
  res.send("resultado borrado");
});
