import { Router } from "express";
import {
  obtenerVentas,
  registrarVenta,
  registrarDetalleVenta,
  precioActual,
} from "../helpers/helperVentas.js";

const router = Router();

//get Ventas
router.get("/ventas", async (req, res) => {
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

    const ventas = await obtenerVentas(email);

    if (!ventas) {
      return res
        .status(404)
        .json({ message: "No se encuentran Compras registradas" });
    }

    const datosVentas = await Promise.all(
      ventas.map(async (venta) => {
        const comprador = await obtenerUsuarioId(venta.id_comprador);
        const producto = await obtenerArticuloVentas(venta.id_publicacion);

        return {
          ...venta,
          comprador,
          producto,
        };
      })
    );

    res.json(datosVentas);

    /*res.json({
      ventas: [
        {
          idComprador: "1234",
          idPublicacion: "4321",
          precioProducto: "1000",
        },
      ],
    });*/
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "Error interno del servidor" });
  }
});

//post ventas
router.post("/ventas", async (req, res) => {
  try {
    const { productos, total } = req.body;

    const autorization = req.header("Authorization");
    if (!autorization) {
      return res.status(401).json({ message: "No se proporcionó un token" });
    }

    const token = autorization.split(" ")[1];
    //console.log(token);

    if (!token) {
      return res.status(401).json({ message: "Token no válido" });
    }
    const verify = jwt.verify(token, "desafioLatam");

    const { email } = verify;
    const idComprador = await usuarioActual(email);

    if (!productos || !Array.isArray(productos)) {
      return res.status(400).json({ message: "Datos inválidos." });
    }
    const id_venta = await registrarVenta(idComprador, total);
    //console.log("id_venta", id_venta);

    for (const producto of productos) {
      producto.precio = parseFloat(producto.precio);
      producto.cantidad = parseInt(producto.cantidad, 10);

      //console.log(`Producto: ${producto.id_producto}, Cantidad: ${producto.cantidad}, Precio: ${producto.precio}, usuario:${idComprador}`);

      await registrarDetalleVenta(
        id_venta,
        producto.id_producto,
        producto.cantidad,
        producto.precio
      );
    }

    /*productos.forEach((producto) => {
      
      producto.precio = parseFloat(producto.precio);
      producto.cantidad = parseInt(producto.cantidad, 10); 

      await registrarVenta(id_producto, idComprador, cantidad, precio);
      
      console.log(
        `Producto: ${producto.nombre_articulo}, Cantidad: ${producto.cantidad}, Precio: ${producto.precio}`
      );
    });*/
    //const precio = await precioActual(idPublicacion);
    //console.log("En index", id_producto, idComprador, cantidad, precio);
    res.json({
      message: "Venta registrado con exito",
    });
  } catch (error) {
    res.status(error.code || 500).json({ error });
  }
});

export { router };
