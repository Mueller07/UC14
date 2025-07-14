import { LivroController } from "../controllers/LivroController";
import { Router } from "express";

const controller = new LivroController();
const router = Router();

router.post('/livro', controller.createLivro);
router.get('/livro', controller.getLivros);
router.get('/livro/:id', controller.getLivroById);
router.put('/livro/:id', controller.updateLivro);
router.delete('/livro/:id', controller.deleteLivro); 

export default router;
