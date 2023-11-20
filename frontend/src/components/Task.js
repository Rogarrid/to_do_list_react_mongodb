import React, { useState } from "react";

export default function Task(props) {
	const [isPending, setIsPending] = useState(props.completed);


	async function handleClickPending() {
		try {
			const response = await fetch(`/api/tasks/${props.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ completed: false }),
			});

			if (response.ok) {
				setIsPending(true);
			} else {
				console.error('Error al actualizar la tarea en el servidor');
			}
		} catch (error) {
			console.error('Error al realizar la solicitud al servidor:', error);
		}
	}

	async function handleClickCompleted() {
		try {
			const response = await fetch(`/api/tasks/${props.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ completed: true }),
			});

			if (response.ok) {
				setIsPending(false);
			} else {
				console.error('Error al actualizar la tarea en el servidor');
			}
		} catch (error) {
			console.error('Error al realizar la solicitud al servidor:', error);
		}
	}

	const nameClass = isPending === false ? "listPending" : "listCompleted"

	return (
		<form id="delete" >
			<div id="list" className="newList">
				<draggable>
					<transition-group name="slide" mode="out-in">
						<div className={nameClass}>
							<div className="textTask">
								<label id="nolist" style={{ cursor: 'pointer' }}>
									<h4 className="titleTask">{props.title}</h4>
									<p className="taskContent">{props.content}</p>
								</label>
							</div>
							<div className="textTask">
								<h4 className="category">{props.category}</h4>
							</div>
							<div className="status-buttons">
								<button className="buttonTask" onClick={handleClickPending}>
									<svg xmlns="http://www.w3.org/2000/svg" width="1.8rem" height="1.8rem" fill="currentColor" className="bi bi-stopwatch" viewBox="0 0 16 16">
										<path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5V5.6z" />
										<path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3z" />
									</svg>
								</button>
								<button className="buttonTask" onClick={handleClickCompleted}>
									<svg xmlns="http://www.w3.org/2000/svg" width="1.8rem" height="1.8rem" fill="currentColor" className="bi bi-calendar-check" viewBox="0 0 16 16">
										<path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
										<path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
									</svg>
								</button>
								<button className="buttonTask" onClick={() => props.onDelete(props.id)}>
									<svg xmlns="http://www.w3.org/2000/svg" width="1.8rem" height="1.8rem" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
										<path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
									</svg>
								</button>
							</div>
							<input type="hidden" name="listDelete" value="" />
						</div>
					</transition-group>
				</draggable>
			</div>
		</form>
	);
}
