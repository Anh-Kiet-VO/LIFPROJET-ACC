import React from 'react';

import { IconContext } from 'react-icons/lib';
import * as Fa from "react-icons/fa";
import * as Gi from "react-icons/gi";

import '../style/cursor.css';

/*
    Détail d'une série tel que le synopsis, la date de sortie...
*/
export default function CompSheetTv(props) {
    console.log(props.genres);
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
					<p><mark>Genres</mark> {props.genres}</p>
					<p><mark>Durée</mark> {props.runtime} min</p>
					<p><mark>Note globale</mark> {props.score}</p>
					<div className="cursor-delete"><Fa.FaEdit onClick={addListCrud} /></div>
				</div>
			</div>
		</IconContext.Provider>
    );
}