import React from 'react'

export default function CompSheet(props) {
  console.log(props.genres);

  return (
    <div key={props.id} id={props.id} className="sheet">
        <img src={props.url} alt={props.title}/>
        <div className="card-text">
        <h2>{props.title}</h2>
        <p>{props.date}</p>
        <p>{props.description}</p>
        <p>{props.score}</p>
        </div>
    </div>
  );
}