import { Router } from "express";
import jwt from "jsonwebtoken";
import {
  obtenerUsuario,
  obtenerUsuarioId,
  todosUsuarios,
  registrarUsuario,
  usuarioExiste,
  verificarUsuario,
  usuarioActual,
} from "../helpers/helperUsuarios.js";

const router = Router();

//get usuario
router.get("/usuario", async (req, res) => {
  try {
    const autorization = req.header("Authorization");
    if (!autorization) {
      return res.status(401).json({ message: "No se proporcionó un token" });
    }
    const token = autorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token no válido" });
    }
    //console.log("Token Actual", autorization);

    const verify = jwt.verify(token, "desafioLatam");

    const { email } = verify;

    const usuario = await obtenerUsuario(email);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.send(usuario);
    /*res.json({
      usuario: {
        nombre: "blabla",
        correo: "blablabla.com",
        rol: "algo",
      },
    });*/
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "Error interno del servidor" });
  }
});

router.get("/usuarios", async (req, res) => {
  try {
    /*let usuarios;
    const autorization = req.header("Authorization");
    if (!autorization) {
      return res.status(401).json({ message: "No se proporcionó un token" });
    }
    const token = autorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token no válido" });
    }
    //console.log("Token Actual", autorization);

    const verify = jwt.verify(token, "desafioLatam");

    const { email } = verify;
    const datos = await verificarUsuario();
    console.log(datos);
    if (datos.rol === "admin") {*/
    const usuarios = await todosUsuarios();

    if (!usuarios) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(usuarios);
    /*res.json({
      usuario: {
        nombre: "blabla",
        correo: "blablabla.com",
        rol: "algo",
      },
    });*/
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "Error interno del servidor" });
  }
});

//post login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //console.log(email, password);

    if (!email || !password) {
      return res.status(400).json({ error: "Credenciales faltantes" });
    }
    const usuario = await verificarUsuario(email, password);
    //console.log(usuario);
    const token = jwt.sign({ email: usuario.email }, "desafioLatam", {
      expiresIn: "10m",
    });
    const { id_usuario, nombre, email: correo, rol } = usuario;
    //console.log("Usuario autenticado:", token);
    res.json({ token, usuario: { id_usuario, nombre, correo, rol } });
    /*res.json({
      token: "blablablablabla",
      email: "uncorreo",
    });*/
  } catch (error) {
    console.log("plop", error);
    res.status(error.code || 500).json({ error: error.message });
  }
});

//post register
router.post("/register", async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    if (await usuarioExiste(email)) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const usuario = await registrarUsuario(nombre, email, password);

    const token = jwt.sign({ email: usuario.email }, "desafioLatam", {
      expiresIn: "10m",
    });
    //console.log("Usuario autenticado:", token);
    res.json({ token, usuario });

    /*res.json({
        token: "blablablablabla",
        email: "uncorreo",
      });*/
  } catch (error) {
    res.status(error.code || 500).json({ error });
  }
});

export { router };
