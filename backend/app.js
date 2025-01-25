import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import postsRoutes from './routes/postRoutes.js'

// Cargar las variables de entorno desde el archivo .env
const result = dotenv.config()

if (result.error) {
    console.error('Error cargando las variables de entorno:', result.error.message)
    process.exit(1) // Detener la ejecución si no se cargan las variables
}

const app = express()
const PORT = process.env.PORT || 3000

// Configuración de CORS
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173'
}))

// Middleware para procesar JSON
app.use(express.json())

// Configuración de rutas
app.use('/posts', postsRoutes)

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
