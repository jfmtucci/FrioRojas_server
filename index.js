import express from "express";
import cors from "cors";
import { router as userRouter } from "./routes/usuarios.js";
import { router as favRouter } from "./routes/favoritos.js";
import { router as prodRouter } from "./routes/productos.js";
import { router as pubRouter } from "./routes/publicaciones.js";
import { router as ventasRouter } from "./routes/ventas.js";

const app = express();

const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/api", userRouter);
app.use("/api", favRouter);
app.use("/api", prodRouter);
app.use("/api", pubRouter);
app.use("/api", ventasRouter);

const server = app.listen(port, () =>
  console.log(`Servido Corriendo en puerto ${port}`)
);

export { server };
