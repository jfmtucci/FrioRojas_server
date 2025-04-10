import { Router } from "express";
import {
  obtenerFavoritos,
  registrarFavorito,
  eliminarFavorito,
} from "../helpers/helperFavoritos.js";

const router = Router();

//get favoritos
router.get("/favoritos", async (req, res) => {
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
    //console.log(email);

    const favoritos = await obtenerFavoritos(email);
    if (!favoritos) {
      return res
        .status(404)
        .json({ message: "No se encuentran favoritos registrados" });
    }
    /*const datosPublicaciones = await Promise.all(
      favoritos.map(async (publicacion) => {
        //const idPublicacion = publicacion.id_publicacion;

        const vendedor = await obtenerUsuarioId(publicacion.id_usuario);
        const producto = await obtenerArticuloPublicacion(
          publicacion.id_publicacion
        );
        //console.log(vendedor, producto, "publicacion: ", publicacion);
        return {
          ...publicacion,
          vendedor,
          producto,
        };
      })
    );*/

    res.json(favoritos);

    /* res.json({
      publicaciones: [
        {
          idProducto: "12345678",
          idVendedor: "1234",
          idPublicacion: "4321",
        },
      ],
    });*/
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "Error interno del servidor" });
  }
});

router.post("/favoritos", async (req, res) => {
  try {
    const { idProducto, estado } = req.body;

    const autorization = req.header("Authorization");
    //console.log(idPublicacion);
    if (!autorization) {
      return res.status(401).json({ message: "No se proporcionó un token" });
    }
    const token = autorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token no válido" });
    }

    const verify = jwt.verify(token, "desafioLatam");

    const { email } = verify;
    //console.log(estado);
    const idComprador = await usuarioActual(email);
    if (!estado) {
      await eliminarFavorito(idComprador, idProducto);
      res.json({
        message: "Favorito eliminado",
      });
    } else {
      await registrarFavorito(idComprador, idProducto);
      res.json({
        message: "Favorito Guardado",
      });
    }
  } catch (error) {
    res.status(error.code || 500).json({ error });
  }
});

export { router };
