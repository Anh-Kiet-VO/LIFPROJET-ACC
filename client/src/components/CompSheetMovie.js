import React from 'react';

import { IconContext } from 'react-icons/lib';
import * as Gi from "react-icons/gi";

/*
	Détail d'un film tel que le synopsis, la date de sortie...
*/
export default function CompSheet(props) {
	const addListCrud = () => {
		props.addListCrud();
	};

	return (
		<IconContext.Provider value={{ className: 'icon-star' }}>
			<div key={props.id} id={props.id} className="sheet">
				<h1><Gi.GiPolarStar /> Informations</h1>
				<div className="sheet-img"><img src={props.url} alt={props.title} /></div>
				<div className="card-text">
					<h2>{props.title}</h2>
					<p><mark>Date de sortie</mark> {props.date}</p>
					<p><mark>Description</mark> {props.description}</p>
					<p><mark>Durée</mark> {props.runtime} min</p>
					<p><mark>Note globale</mark> {props.score}</p>
				</div>
			</div>
		</IconContext.Provider>
	);
}