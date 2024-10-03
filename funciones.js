const { Pool } = require("pg");
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "likeme_tutoria",
  allowExitOnIdle: true,
});
const leerPosts1 = async () => {
  const { rows } = await pool.query("SELECT * FROM posts1;");
  return rows;
};
const escribirPosts1 = async (titulo, url, descripcion) => {
  const consulta = "INSERT INTO posts1 values {DEFAULT, $1,$2,$3,0}";
  const values = [titulo, url, descripcion];
  await pool.query(consulta, values);
  console.log("Post agregado");
};
const agregarLike = async (id) => {
  const consulta = "UPDATE posts SET likes = (likes +1) WHERE id =$1";
  const values = [id];
  await pool.query(consulta, values);
};
const borrarPost = async (id) => {
  const consulta = "DELETE * FROM posts WHERE id = $1";
  const values = [id];
  await pool.query(consulta, values);
};
module.exports = { leerPosts1, escribirPosts1, agregarLike, borrarPost };
