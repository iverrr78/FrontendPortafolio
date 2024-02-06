import React from "react";
import { useLocation, useParams } from "react-router-dom";
import useMyContext from "../hooks/useAuth";

function SingleBlog(){
    const {language} = useMyContext();
    const Location = useLocation();
    console.log(Location.state);
    return(
        <div className="main2">
            <div className="PreBlog">
            <div className='BlogMainContainer'>
                <h1>{language ? Location.state.englis_name : Location.state.spanish_name}</h1>
                <p className="text">{language ? Location.state.english_text : Location.state.spanish_text}</p>
            </div>
            </div>
        </div>
    )
}

export {SingleBlog};