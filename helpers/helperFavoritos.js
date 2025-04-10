import { pool } from "../config/dbConnection.js";

const obtenerFavoritos = async (email) => {
  try {
    const consulta = `SELECT p.* FROM articulos p JOIN favoritos f ON f.id_producto = p.id_producto JOIN usuarios u ON f.id_usuario = u.id_usuario WHERE u.email = $1`;
    const { rows, rowCount } = await pool.query(consulta, [email]);

    if (!rowCount) {
      console.log("No se encuentran favoritos registrados");
      throw { message: "No se encuentran favoritos registrados", code: 404 };
    }
    return rows;
  } catch (error) {
    throw error;
  }
};

const registrarFavorito = async (idComprador, idProducto) => {
  try {
    const consulta =
      "insert into favoritos(id_usuario, id_producto)values($1, $2)";
    const { rows, rowCount } = await pool.query(consulta, [
      idComprador,
      idProducto,
    ]);
  } catch (error) {
    console.error("Error al Registrar Favoritos:", error);
    throw error;
  }
};

const eliminarFavorito = async (idComprador, idProducto) => {
  try {
    const consulta =
      "delete from favoritos where id_usuario=$1 and id_producto = $2";

    const { rows, rowCount } = await pool.query(consulta, [
      idComprador,
      idProducto,
    ]);
  } catch (error) {
    console.error("Error al Registrar Favoritos:", error);
    throw error;
  }
};

export { obtenerFavoritos, registrarFavorito, eliminarFavorito };
