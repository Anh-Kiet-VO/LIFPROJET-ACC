import React from 'react'

/*
    Les acteurs qui ont participé à la série
*/
export default function CompSheetTvCredits(props) {
    return (
        <div key={props.id} id={props.id} className="sheet">
            <div className="card-text">
                {
                    props.cast.map((val, key) => {
                        return (
                            <div className='credits' key={key} id={val.key}>
                                <div className="sheet-img"><img src={"https://image.tmdb.org/t/p/w185" + val.profile_path} alt={val.name} /></div>
                                {val.name}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}