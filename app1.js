const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Conectar a MongoDB Atlas usando el enlace proporcionado
mongoose.connect('mongodb+srv://andre2:1234@myatlasclusteredu.zamwt2c.mongodb.net/?retryWrites=true&w=majority&appName=myAtlasClusterEDU', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado a MongoDB Atlas');
}).catch(err => {
    console.error('Error al conectar a MongoDB', err);
});

app.get('/', (req, res) => {
    res.send('¡Aplicación corriendo chido!');
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
