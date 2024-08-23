const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://andre2:1234@myatlasclusteredu.zamwt2c.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=myAtlasClusterEDU';

// Conectar a MongoDB Atlas usando el enlace proporcionado
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado a MongoDB Atlas');
}).catch(err => {
    console.error('Error al conectar a MongoDB', err);
    process.exit(1);
});

// Definir el esquema y el modelo
const movieSchema = new mongoose.Schema({
    title: String,
    // Otros campos que pueda tener el documento en la colección
});

const Movie = mongoose.model('Movie', movieSchema, 'movies');

// Ruta principal que realiza la consulta y muestra el resultado
app.get('/', async (req, res) => {
    try {
        const movie = await Movie.findOne({ title: 'Jurassic Park' });
        if (movie) {
            res.send(`¡Aplicación corriendo chido!<br><br>Película encontrada: ${movie.title}<br>Detalles: ${movie}`);
        } else {
            res.send('¡Aplicación corriendo chido!<br><br>Película "Jurassic Park" no encontrada.');
        }
    } catch (err) {
        console.error('Error al realizar la consulta', err);
        res.status(500).send('Error interno del servidor');
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
