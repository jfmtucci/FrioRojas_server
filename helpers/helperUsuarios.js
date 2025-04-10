import { pool } from "../config/dbConnection.js";
import bcrypt from "bcryptjs";

const obtenerUsuario = async (email) => {
  try {
    const consulta = `select nombre,email,rol from usuarios where email = $1`;
    const { rows, rowCount } = await pool.query(consulta, [email]);

    if (!rowCount) {
      throw { message: "error al cargar informacion", code: 404 };
    }
    return rows;
  } catch (error) {
    throw error;
  }
};

const obtenerUsuarioId = async (id) => {
  try {
    const consulta = `select nombre,email from usuarios where id_usuario = $1`;
    //console.log(consulta, id);
    const { rows, rowCount } = await pool.query(consulta, [id]);
    //console.log(rowCount, rows);
    if (!rowCount) {
      throw { message: "error al cargar informacion", code: 404 };
    }
    //console.log(rows);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

const todosUsuarios = async () => {
  try {
    const consulta = `select id_usuario,nombre,email,rol from usuarios`;
    //console.log(consulta, id);
    const { rows, rowCount } = await pool.query(consulta);
    //console.log(rowCount, rows);
    if (!rowCount) {
      throw { message: "error al cargar informacion", code: 404 };
    }
    return rows;
  } catch (error) {
    throw error;
  }
};

const registrarUsuario = async (nombre, email, password) => {
  try {
    const passwordEncriptada = bcrypt.hashSync(password, 10);
    password = passwordEncriptada;
    const consulta = `insert into usuarios (nombre,email,rol,password) values($1,$2,$3,$4 ) returning id_usuario,nombre,email`;

    const { rows, rowCount } = await pool.query(consulta, [
      nombre,
      email,
      "usuario",
      password,
    ]);

    return rows[0];
  } catch (error) {
    throw error;
  }
};
const usuarioExiste = async (email) => {
  try {
    const consulta = "select * from usuarios where email = $1";

    const { rowCount } = await pool.query(consulta, [email]);

    return rowCount > 0;
  } catch (error) {
    //    console.error("aqui", error);
    throw new Error(error);
  }
};
const verificarUsuario = async (email, password) => {
  try {
    const consulta = `select * from usuarios where email = $1`;

    const { rows, rowCount } = await pool.query(consulta, [email]);
    if (rowCount === 0) {
      const error = new Error("Usuario no Existe");
      error.code = 401;
      throw error;
    }
    //console.log(rows);
    const usuario = rows[0];

    const { password: passwordEncriptada } = usuario;

    const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada);

    if (!passwordEsCorrecta) {
      const error = new Error("Contraseña incorrecta");
      error.code = 401;
      throw error;
    }

    return usuario;
  } catch (error) {
    console.error("Error verificando usuario:", error);
    if (error.code && error.message) {
      throw error;
    } else {
      throw { code: 500, message: "Error interno del servidor" };
    }
  }
};

const usuarioActual = async (email) => {
  try {
    const consulta = "select id_usuario from usuarios where email = $1";
    const { rows, rowCount } = await pool.query(consulta, [email]);

    if (rowCount === 0) {
      throw new Error("Usuario no encontrado");
    }

    return rows[0].id_usuario;
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    throw error;
  }
};
export {
  obtenerUsuario,
  obtenerUsuarioId,
  todosUsuarios,
  registrarUsuario,
  usuarioExiste,
  verificarUsuario,
  usuarioActual,
};
