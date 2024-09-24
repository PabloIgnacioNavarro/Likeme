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
module.exports = { leerPosts1, escribirPosts1 };
