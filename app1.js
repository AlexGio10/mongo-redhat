const express = require('express');
const mongoose = require('mongoose');
 
const app = express();
const port = process.env.PORT || 3000;
 
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
    // Otros campos que pueda tener el documento en la colección
});
 
const Movie = mongoose.model('Movie', movieSchema, 'movies');
 
// Ruta principal
app.get('/', (req, res) => {
    res.send('¡Aplicación corriendo chido!');
});
 
// Ruta para buscar la película "Jurassic Park"
app.get('/find-jurassic-park', async (req, res) => {
    try {
        const movie = await Movie.findOne({ title: 'Jurassic Park' });
        if (movie) {
            res.json(movie);
        } else {
            res.status(404).send('Película no encontrada');
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
