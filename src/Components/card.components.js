import React, {useEffect} from "react";
import { Link, Outlet } from 'react-router-dom';

function Card(props){
    console.log("language", props.language);
    return(
        <div className="card2" onClick={props.function} data={props.data}>
            <img src={props.data.image} alt="image"/>
            <h4>{props.language ? (props.data.englis_name || props.data.name_english) : (props.data.name_spanish || props.data.spanish_name)}</h4>
        </div>
    )
}

function Card2(props){
    console.log(props);
    return(
        <div className="card2">
        <Link to={"/singleblog"} state={{name:props.data.name, text:props.data.text}} className='links'>
            <h4>{props.data.name}</h4>
            <p>{props.data.text}</p>
        </Link>
        </div>
    )
}

export {Card, Card2};