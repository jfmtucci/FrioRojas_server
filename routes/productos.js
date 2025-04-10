import { Router } from "express";
import {
  registrarArticulo,
  obtenerArticulos,
  obtenerArticulosCategoria,
  obtenerArticuloPublicacion,
  obtenerArticuloVentas,
  obtenerCategorias,
} from "../helpers/helperProductos.js";

const router = Router();

//get Productos
router.get("/productos", async (req, res) => {
  try {
    //console.log("/productos");
    const articulos = await obtenerArticulos();
    if (!articulos) {
      return res.status(404).json({ message: "No se encuentran Articulos" });
    }
    //console.log(articulos);
    res.json(articulos);
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "Error interno del servidor" });
  }
});

router.get("/producto/:id", async (req, res) => {
  try {
    const { id } = req.params;
    //console.log(id);
    const articulos = await obtenerArticulos(id);
    if (!articulos) {
      return res.status(404).json({ message: "No se encuentran Articulos" });
    }
    //console.log(articulos);
    res.json(articulos);
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "Error interno del servidor" });
  }
});
//articulos categoria
router.get("/productos/:categoria", async (req, res) => {
  try {
    //console.log("hola: /productos/:categoria");
    const { categoria } = req.params;
    //console.log(categoria);
    const articulos = await obtenerArticulosCategoria(categoria);
    if (!articulos) {
      return res
        .status(404)
        .json({ message: "No se encuentran Articulos en esa Categoria" });
    }
    //console.log(articulos);
    res.json(articulos);
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "Error interno del servidor" });
  }
});

router.get("/addProducto", async (req, res) => {
  try {
    //console.log("aqui estoy");
    const categorias = await obtenerCategorias();
    //console.log(categorias);
    res.json(categorias);
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "Error interno del servidor" });
  }
});
//post productos
router.post("/productos", async (req, res) => {
  try {
    //console.log("aqui");
    const { title, description, price, stock, image, categoria } = req.body;
    //console.log(title, description, price, stock, image, categoria);
    await registrarArticulo(title, description, price, stock, image, categoria);
    res.json({
      message: "Producto registrado con exito",
    });
  } catch (error) {
    res.status(error.code || 500).json({ error });
  }
});

export { router };
