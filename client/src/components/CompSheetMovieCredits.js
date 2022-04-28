import React, { useState } from 'react';

import { IconContext } from 'react-icons/lib';
import * as Gi from "react-icons/gi";

/*
    Les acteurs qui ont participé au film
*/
export default function CompSheetMovieCredits(props) {
    return (
        <IconContext.Provider value={{ className: 'icon-star' }}>
            <div className="sheet-credits">
                <h1><Gi.GiPolarStar /> Casting</h1>
                {
                    props.cast.slice(0, 9).map((val, key) => {
                        return (
                            <div className="credits" key={key} id={val.key}>
                                <div className="sheet-credits-img"><img src={"https://image.tmdb.org/t/p/w185" + val.profile_path} alt={val.name} /></div>
                                <p>{val.name}</p>
                            </div>
                        )
                    })
                }
            </div>
        </IconContext.Provider>
    );
}