import express from 'express'
import { getPosts, createPost, updateLikes, deletePost } from '../controllers/postController.js'

const router = express.Router()

/* Ruta GET para obtener todos los posts */
router.get('/', getPosts)
/* Ruta POST para crear un nuevo post */
router.post('/', createPost)
/* Ruta PUT para agregar likes a un post */
router.put('/like/:id', updateLikes)
/* Ruta para eliminar un post */
router.delete('/:id', deletePost)

export default router