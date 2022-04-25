import React, { useState } from 'react'

export default function CompSheetMovieCredits(props) {
    return (
        <div className="sheet-credits">
            <h1>Casting</h1>
            {
                props.cast.map((val, key) => {
                    return (
                        <div className="credits" key={key} id={val.key}>
                            <div className="sheet-credits-img"><img src={"https://image.tmdb.org/t/p/w185" + val.profile_path} alt={val.name} /></div>
                            {val.name}
                        </div>
                    )
                })
            }
        </div>
    );
}