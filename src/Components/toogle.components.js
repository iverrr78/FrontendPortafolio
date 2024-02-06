import React from "react";

function Toogle(props){
    let variable;

    if(props.selected){
        variable = "tooglet";
    }
    else{
        variable = "tooglef";
    }

    return(
        <div onClick={props.function} className={variable} value={props.text}>{props.text}</div>
    )
}

export {Toogle};