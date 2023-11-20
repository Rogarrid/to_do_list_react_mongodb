import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CreateTask from './CreateTask';
import { date } from '../script/Date'
import Task from './Task';
import axios from 'axios';

export default function Welcome({ section }) {
	const location = useLocation();
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get('/api/tasks');
				setTasks(response.data);
			} catch (error) {
				console.error('Error fetching tasks: ', error);
			}
		};

		fetchData();
	}, []);

	const addTask = (newTask) => {
		setTasks((prevTasks) => [...prevTasks, newTask]);
	};

	// Hacer una solicitud al servidor para eliminar la tarea.
	const handleDelete = (taskId) => {
		console.log(taskId)
		axios.delete(`/api/tasks/${taskId}`)
			.then(() => {
				// Actualizar el estado local eliminando la tarea.
				setTasks(tasks.filter(task => task._id !== taskId));
			})
			.catch((error) => {
				console.error('Error al eliminar la tarea: ', error);
			});
	};

	const filteredTasks = tasks.filter((task) => task.category === section);

	const messageWelcome = () => {
		if (location.pathname.substring(1) === "" && tasks.length === 0) {
			return (
				<>
					<h2 name="task" id="activityInitial">¿Por dónde vas a empezar hoy?</h2>
					<h3 id="titleHome">{date()}</h3>
					<div id="nolist">
						<h5>😎 Ninguna tarea pendiente 😎</h5>
						<h6>Elige una categoria en el menu y añade nuevas tareas</h6>
					</div>
				</>
			)
		} else if (location.pathname.substring(1) === "" && tasks.length > 0) {
			return (
				<>
					<h2 name="task" id="activityInitial">¿Por dónde vas a empezar hoy?</h2>
					<h3 id="titleHome">{date()}</h3>
					{tasks.map((task, index) => (
						<Task
							key={index}
							id={task._id}
							title={task.title}
							content={task.content}
							category={task.category}
							onDelete={() => handleDelete(task._id)}
							completed={task.completed}
						/>
					))}
				</>
			)
		} else {
			return (
				<>
					<h1 name="task" id="activity">{location.pathname.substring(1)}</h1>
					<h3 id="title">¿Qué vas hacer hoy {date()}</h3>
					<CreateTask addTask={addTask} />
					{filteredTasks.map((task, index) => (
						<Task
							key={index}
							id={task._id}
							title={task.title}
							content={task.content}
							onDelete={() => handleDelete(task._id)}
							completed={task.completed}
						/>
					))}
				</>
			);
		}
	}

	return (
		<div className="welcome">
			{messageWelcome()}
		</div>
	);
}
