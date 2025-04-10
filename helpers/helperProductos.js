import { pool } from "../config/dbConnection.js";

const registrarArticulo = async (
  title,
  description,
  price,
  stock,
  image,
  categoria
) => {
  try {
    //console.log(nombre, descripcion, precio, stock, url);
    const consulta = `insert into articulos(nombre_articulo, descripcion, precio, stock, url,categoria) values ($1, $2, $3, $4, $5, $6)`;
    const { rows, rowCount } = await pool.query(consulta, [
      title,
      description,
      price,
      stock,
      image,
      categoria,
    ]);
    // console.log(rows, rowCount);
  } catch (error) {
    console.error("Login error:", error);
    res.status(error.code || 500).json({ error: error.message });
  }
};

const obtenerArticulos = async (id) => {
  try {
    let consulta, valores;
    if (!id) {
      consulta = "select * from articulos";
      valores = [];
    } else {
      consulta = "select * from articulos where id_producto=$1";
      valores = [id];
    }
    const { rows, rowCount } = await pool.query(consulta, valores);
    return rows;
  } catch (error) {
    console.error("Error al obtener producto:", error);
    throw error;
  }
};

const obtenerArticulosCategoria = async (categoria) => {
  try {
    const consulta = `select * from articulos where categoria = $1`;
    const { rows, rowCount } = await pool.query(consulta, [categoria]);
    //console.log(rows, pool);
    return rows;
  } catch (error) {
    console.error("Error al obtener producto:", error);
    throw error;
  }
};

const obtenerArticuloPublicacion = async (id) => {
  try {
    //console.log(id);
    const consulta = `select * from articulos where id_producto = (select id_producto from publicacion where id_publicacion= $1)`;
    //console.log(consulta, id);

    const { rows, rowCount } = await pool.query(consulta, [id]);
    //console.log(rows);
    return rows[0];
  } catch (error) {
    console.error("Error al obtener producto:", error);
    throw error;
  }
};
const obtenerArticuloVentas = async (id) => {
  try {
    //console.log(id);
    const consulta = `select * from articulos where id_producto = (select id_producto from publicacion where id_publicacion= $1)`;

    const { rows, rowCount } = await pool.query(consulta, [id]);

    return rows[0];
  } catch (error) {
    console.error("Error al obtener producto:", error);
    throw error;
  }
};

const obtenerCategorias = async () => {
  try {
    const { rows, rowCount } = await pool.query(
      "SELECT categoria, MIN(id_producto) AS id_producto FROM articulos GROUP BY categoria;"
    );

    return rows;
  } catch (error) {
    console.error("Error al obtener categorias", error);
    throw error;
  }
};

export {
  registrarArticulo,
  obtenerArticulos,
  obtenerArticulosCategoria,
  obtenerArticuloPublicacion,
  obtenerArticuloVentas,
  obtenerCategorias,
};
