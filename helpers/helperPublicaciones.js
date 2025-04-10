import { pool } from "../config/dbConnection.js";

const obtenerPublicaciones = async (id) => {
  try {
    let consulta, valores;

    if (!id) {
      consulta = "select * from publicacion";
      valores = [];
    } else {
      consulta = `select * from publicacion where id_publicacion = $1`;
      valores = [id];
    }
    const { rows, rowCount } = await pool.query(consulta, valores);
    if (!rowCount) {
      throw { message: "error al cargar informacion", code: 404 };
    }
    return rows;
  } catch (error) {
    console.error("Error al obtener publicaciones:", error);
    throw error;
  }
};

const registarPublicacion = async (idProducto, idVendedor) => {
  try {
    //console.log(idProducto, idVendedor);
    const consulta = `insert into publicacion (id_producto, id_vendedor) values($1, $2)`;
    const { rows, rowCount } = await pool.query(consulta, [
      idProducto,
      idVendedor,
    ]);

    if (rowCount === 0) {
      const error = new Error("No se pudo registrar la publicación");
      error.code = 400;
      throw error;
    }
  } catch (error) {
    console.error("Error al registrar publicación:", error);
    throw error;
  }
};

export { obtenerPublicaciones, registarPublicacion };
