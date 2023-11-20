import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Welcome from './Welcome';

function App() {

	return (
		<div className="App">
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<Welcome section="Indice" />} />
					<Route path="/Hogar" element={<Welcome section="Hogar" />} />
					<Route path="/Compras" element={<Welcome section="Compras" />} />
					<Route path="/Trabajo" element={<Welcome section="Trabajo" />} />
					<Route path="/Ocio" element={<Welcome section="Ocio" />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
