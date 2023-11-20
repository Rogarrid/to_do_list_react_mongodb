const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/to-do-reactjs');

// Definir el esquema de datos para los elementos de la lista de tareas y crea el modelo 'Item' basado en el esquema definido anteriormente
const itemSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "Inserta un título"],
	},
	content: {
		type: String,
		required: [true, "Inserta una tarea"],
	},
	category: {
		type: String,
		required: [true]
	},
	completed: {
		type: Boolean,
		default: false
	}

});

const Item = mongoose.model('Item', itemSchema);

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static("public"));

// Servir archivos estáticos desde la carpeta "build"
app.use(express.static(path.join(__dirname, '../frontend/build')));


// Ruta para obtener todas las tareas
app.get('/api/tasks', async (req, res) => {
	try {
	  const items = await Item.find();
	  res.json(items);
	} catch (error) {
	  console.error('Error al obtener las tareas:', error);
	  res.status(500).send('Error interno del servidor');
	}
  });

  // Ruta para la página de inicio ("/")
app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// Ruta para agregar una nueva tarea
app.post('/api/tasks', async (req, res) => {
	try {
		const { title, content, category } = req.body;
		const newItem = new Item({
			title,
			content,
			category
		});

		const savedItem = await newItem.save();

		res.status(201).json(savedItem);
	} catch (error) {
		console.error('Error al guardar la tarea:', error);
		res.status(500).send('Error interno del servidor');
	}
});

// Ruta para actualizar el estado 'completed' de una tarea por ID
app.put('/api/tasks/:taskId', async (req, res) => {
	const taskId = req.params.taskId;

	try {
	  const { completed } = req.body;

	  // Buscar y actualizar la tarea por ID
	  const updatedItem = await Item.findByIdAndUpdate(
		taskId,
		{ completed },
		{ new: true } // Devuelve el documento actualizado
	  );

	  if (!updatedItem) {
		return res.status(404).json({ error: 'Tarea no encontrada' });
	  }

	  res.json(updatedItem);
	} catch (error) {
	  console.error('Error al actualizar la tarea:', error);
	  res.status(500).send('Error interno del servidor');
	}
  });


// Ruta para eliminar una tarea por ID
app.delete('/api/tasks/:taskId', async (req, res) => {
	const taskId = req.params.taskId;
	console.log(taskId)

	try {
	  // Buscar y eliminar la tarea por ID
	  const deletedItem = await Item.findByIdAndDelete(taskId);

	  if (!deletedItem) {
		return res.status(404).json({ error: 'Tarea no encontrada' });
	  }

	  res.json({ message: 'Tarea eliminada con éxito', deletedItem });
	} catch (error) {
	  console.error('Error al eliminar la tarea:', error);
	  res.status(500).send('Error interno del servidor');
	}
  });

app.listen(3000, function () {
	console.log("Server started on port 3000");
});

// Verifica la conexión
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', function () {
	console.log('¡Conexión exitosa a MongoDB!');
});
