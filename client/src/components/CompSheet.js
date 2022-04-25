import React from 'react'
import * as Fa from "react-icons/fa";
import '../style/cursor.css'

export default function CompSheet(props) {
	const addListCrud = () => {
		props.addListCrud();
	};

	return (
		<div key={props.id} id={props.id} className="sheet">
			<h1>Informations</h1>
			<div className="sheet-img"><img src={props.url} alt={props.title} /></div>
			<div className="card-text">
				<h2>{props.title}</h2>
				<p><mark>Date de sortie</mark> {props.date}</p>
				<p><mark>Description</mark> {props.description}</p>
				<p><mark>Note globale</mark> {props.score}</p>
				<div className="cursor-delete"><Fa.FaEdit onClick={addListCrud} /></div>
			</div>
		</div>
	);
}