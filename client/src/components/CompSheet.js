import React from 'react'

export default function CompSheet(props) {
  console.log(props.genres);

  return (
    <div key={props.id} id={props.id} className="sheet">
        <div className="sheet-img"><img src={props.url} alt={props.title}/></div>
        <div className="card-text">
        <h2>{props.title}</h2>
        <p>{props.date}</p>
        <p>{props.description}</p>
        <p>{props.score}</p>
        </div>
    </div>
  );
}