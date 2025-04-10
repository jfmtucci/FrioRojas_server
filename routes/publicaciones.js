import { Router } from "express";
import {
  obtenerPublicaciones,
  registarPublicacion,
} from "../helpers/helperPublicaciones.js";

const router = Router();

// get publicaciones
router.get("/publicaciones", async (req, res) => {
  try {
    const publicaciones = await obtenerPublicaciones();
    //console.log(publicaciones);
    if (!publicaciones) {
      return res
        .status(404)
        .json({ message: "No se encuentran Publicaciones" });
    }

    const datosPublicaciones = await Promise.all(
      publicaciones.map(async (publicacion) => {
        //const idPublicacion = publicacion.id_publicacion;
        const vendedor = await obtenerUsuarioId(publicacion.id_vendedor);
        const producto = await obtenerArticuloPublicacion(
          publicacion.id_publicacion
        );
        //console.log(publicacion.id_producto);
        return {
          ...publicacion,
          vendedor,
          producto,
        };
      })
    );

    res.json(datosPublicaciones);

    //res.json(publicacion, vendedor, producto);
    /*res.json({publicaciones: [],});*/
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "Error interno del servidor" });
  }
});

// get publicaciones:id
router.get("/publicaciones/:id", async (req, res) => {
  const { id } = req.params;
  const publicaciones = await obtenerPublicaciones(id);

  if (!publicaciones) {
    return res.status(404).json({ message: "No se encuentran Publicaciones" });
  }
  //console.log("datos en get", datosUsuario);
  res.json(publicaciones);
  /*res.json({
    publicaciones: [
      {
        idProducto: "12345678",
        idVendedor: "1234",
        idPublicacion: "4321",
      },
    ],
  });*/
});

//post publicacion
router.post("/publicacion", async (req, res) => {
  try {
    const { idProducto } = req.body;

    const autorization = req.header("Authorization");

    if (!autorization) {
      return res.status(401).json({ message: "No se proporcionó un token" });
    }
    const token = autorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token no válido" });
    }

    const verify = jwt.verify(token, "desafioLatam");

    const { email } = verify;
    const idVendedor = await usuarioActual(email);
    //    console.log(idVendedor);
    await registarPublicacion(idProducto, idVendedor);
    res.json({
      message: "Publicacion registrada con exito",
    });
    /*res.json({
      id_producto: 1234,
      id_vendedor: 1234,
      id_publicacion: 4321,
    });*/
  } catch (error) {
    res.status(error.code || 500).json({ error: error.message });
  }
});

export { router };
