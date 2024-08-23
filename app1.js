const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 8080;

// Conectar a MongoDB Atlas usando el enlace proporcionado
mongoose.connect('mongodb+srv://andre2:1234@myatlasclusteredu.zamwt2c.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=myAtlasClusterEDU', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado a MongoDB Atlas');
}).catch(err => {
    console.error('Error al conectar a MongoDB', err);
});

// Definir el esquema y el modelo
const movieSchema = new mongoose.Schema({
    title: String,
    director: String,
    year: Number,
    // Otros campos que pueda tener el documento en la colección
});

const Movie = mongoose.model('Movie', movieSchema, 'movies');

// Ruta principal que realiza la consulta a MongoDB y muestra el resultado
app.get('/', async (req, res) => {
    try {
        // Ejemplo de consulta: encontrar todas las películas dirigidas por un director específico
        const director = req.query.director || 'Steven Spielberg'; // Ejemplo de parámetro de consulta
        const movies = await Movie.find({ director: director });

        if (movies.length > 0) {
            res.send(`Películas dirigidas por ${director}:<br>${movies.map(movie => `- ${movie.title} (${movie.year})`).join('<br>')}`);
        } else {
            res.send(`No se encontraron películas dirigidas por ${director}.`);
        }
    } catch (err) {
        console.error('Error al realizar la consulta', err);
        res.status(500).send('Error interno del servidor');
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor ejecutándose en https://ejemplo-mongo-app-mongodb-demo.apps.8262f.dynamic.redhatworkshops.io/:${port}`);
});
