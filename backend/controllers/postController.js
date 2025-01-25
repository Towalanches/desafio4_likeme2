import pool from '../models/database.js'

/* Obtener todos los posts */
export const getPosts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM posts')
        res.json(result.rows)
    } catch (error) {
        console.error('Error al obtener los posts:', error.message)
        res.status(500).json({ error: 'Error al obtener los posts' })
    }
}

/* Crear un nuevo post */
export const createPost = async (req, res) => {
    const { titulo, img, descripcion, likes = 0 } = req.body
    /* Validar los campos obligatorios */
    if (!titulo || !img || !descripcion) {
        return res.status(400).json({ error: 'Los campos titulo, img y descripción son obligatorios' })
    }

    try {
        /* Insertar el post en la base de datos */
        const result = await pool.query(
            'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *',
            [titulo, img, descripcion, likes]
        )
        res.status(201).json(result.rows[0])
    } catch (error) {
        console.error('Error al crear el post:', error.message)
        res.status(500).json({ error: 'Error al crear el post' })
    }
}

/* Actualizar likes de un post */
export const updateLikes = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *',
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Post no encontrado' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al actualizar likes:', error.message);
        res.status(500).json({ error: 'Error al actualizar likes' });
    }
}

/* Eliminar un post */
export const deletePost = async (req, res) => {
    const { id } = req.params

    try {
        const result = await pool.query(
            'DELETE FROM posts WHERE id = $1 RETURNING *',
            [id]
        )

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Post no encontrado' })
        }

        res.json({ message: 'Post eliminado correctamente', post: result.rows[0] })
    } catch (error) {
        console.error('Error al eliminar post:', error.message)
        res.status(500).json({ error: 'Error al eliminar el post' })
    }
}