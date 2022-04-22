import React from 'react'
import * as Fa from "react-icons/fa";
import '../style/cursor.css'

export default function CompSheet(props) {
	const addListCrud = () => {
		props.addListCrud();
	};

	return (
		<div key={props.id} id={props.id} className="sheet">
			<div className="sheet-img"><img src={props.url} alt={props.title} /></div>
			<div className="card-text">
				<h2>{props.title}</h2>
				<p>{props.date}</p>
				<p>{props.description}</p>
				<p>{props.score}</p>
				<div className='cursor-delete'><Fa.FaEdit onClick={addListCrud} /></div>
			</div>
		</div>
	);
}