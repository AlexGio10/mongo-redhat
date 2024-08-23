const { MongoClient } = require('mongodb');

// URL de conexión de MongoDB
const uri = "mongodb+srv://andre2:1234@myatlasclusteredu.zamwt2c.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=myAtlasClusterEDU";

// Crear una nueva instancia de MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function conectarYConsultar() {
  try {
    // Conectar al cliente
    await client.connect();

    console.log("Conectado a MongoDB");

    const db = client.db('nombreBaseDatos');
    const collection = db.collection('nombreColeccion');

    // Realizar una consulta
    const resultado = await collection.find({}).toArray();
    console.log(resultado);
  } catch (err) {
    console.error(err);
  } finally {
    // Cerrar la conexión
    await client.close();
  }
}

conectarYConsultar();
