import React from 'react'

/*
    Détail d'une série tel que le synopsis, la date de sortie...
*/
export default function CompSheetTv(props) {
    console.log(props.genres);

    return (
        <div key={props.id} id={props.id} className="sheet">
            <img src={props.url} alt={props.title} />
            <div className="card-text">
                <h2>{props.title}</h2>
                <p>{props.date}</p>
                <p>{props.description}</p>
                <p>{props.score}</p>
            </div>
        </div>
    );
}