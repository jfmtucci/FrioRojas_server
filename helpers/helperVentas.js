import { pool } from "../config/dbConnection.js";

const obtenerVentas = async (email) => {
  try {
    const consulta = `select * from ventas where id_comprador=(select id_usuario from usuarios where email = $1)`;
    const { rows, rowCount } = await pool.query(consulta, [email]);

    // console.log(rows);
    if (!rowCount) {
      throw { message: "error al cargar informacion", code: 404 };
    }
    return rows;
  } catch (error) {
    throw error;
  }
};

const registrarVenta = async (idComprador, total) => {
  try {
    //console.log(idComprador, total);
    const consulta = `insert into ventas( id_comprador,total_compra ) values($1, $2) returning id_venta`;
    const { rows, rowCount } = await pool.query(consulta, [idComprador, total]);

    if (rowCount === 0) {
      throw new Error("No se pudo insertar la venta.");
    }

    const idVenta = rows[0].id_venta;
    //console.log("Venta registrada con id:", idVenta);

    return idVenta;
  } catch (error) {
    console.log("exploto aqui");
    res.status(error.code || 500).send(error);
  }
};

const registrarDetalleVenta = async (
  id_venta,
  id_producto,
  cantidad,
  precio
) => {
  try {
    //console.log("En consulta", id_producto, idComprador, cantidad, precio);
    const consulta = `insert into detalle_venta( id_venta,id_producto,precio_producto,cantidad ) values($1, $2, $3,$4)`;
    const { rows, rowCount } = await pool.query(consulta, [
      id_venta,
      id_producto,
      precio,
      cantidad,
    ]);
    //console.log(rows);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
};
const precioActual = async (idPublicacion) => {
  try {
    const consulta =
      "select precio from articulos where id_producto = (select id_producto from publicacion where id_publicacion= $1)";
    const { rows, rowCount } = await pool.query(consulta, [idPublicacion]);

    if (rowCount === 0) {
      throw new Error("producto no encontrado");
    }

    return rows[0].precio;
  } catch (error) {
    console.error("Error al obtener producto:", error);
    throw error;
  }
};

export { obtenerVentas, registrarVenta, registrarDetalleVenta, precioActual };
