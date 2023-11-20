import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function CreateTask({ addTask }) {
	const location = useLocation();
	const category = location.pathname.substring(1); // Obtener la categoría de la URL
	const [newTitle, setNewTitle] = useState('');
	const [newItem, setNewItem] = useState('');

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		const newTask = {
		  title: newTitle,
		  content: newItem,
		  category: category,
		};

		try {
		  const response = await axios.post('/api/tasks', newTask);

		  if (response.status === 201) {
			console.log('Tarea añadida con éxito:', response.data);
			addTask(response.data);
		  } else {
			console.error('Error al añadir la tarea:', response.data);
		  }
		} catch (error) {
		  console.error('Error al comunicarse con el servidor:', error);
		}

		setNewTitle('');
		setNewItem('');
	  };

	const titleMaxLength = 50;
	const contentMaxLength = 150;

	return (
		<div id="boxNote">
			<form id="addList" method="post" className="create-note" onSubmit={handleFormSubmit}>
				<input
					id="boxTitle"
					type="text" name="newTitle"
					placeholder="Título Tarea"
					value={newTitle}
					onChange={(e) => {
						if (e.target.value.length <= titleMaxLength) {
							setNewTitle(e.target.value)
						}
					}}
				/>
				<input
					id="boxTask"
					type="text"
					name="newItem"
					placeholder="Nueva Tarea"
					style={{ width: '70%' }}
					value={newItem}
					onChange={(e) => {
						if (e.target.value.length <= contentMaxLength) {
							setNewItem(e.target.value)
						}
					}}
				/>
				<button type="submit" id="btn_add">
					Añadir
				</button>
			</form>
		</div>
	);
}
