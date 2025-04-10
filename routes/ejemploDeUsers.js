import { Router } from "express";
import { getUser } from "../helpers/userHelpers.js";
import { getUserController, postUserController } from "../controllers/";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { request } from "../schemas/postUsersSchema.js";

const router = Router();

router.get("/users", getUserController);

router.post("/users", [schemaValidator(request.payload)], postUserController);

export { router };
