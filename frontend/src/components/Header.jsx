

import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
	return (
		<header>
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarTogglerDemo01">
					<ul className="navbar-nav mr-auto mt-2 mt-lg-0">
						<li className="nav-item">
							<Link className="nav-link" to="/">Indice</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/Hogar">Hogar</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/Compras">Compras</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/Trabajo">Trabajo</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/Ocio">Ocio</Link>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
}
