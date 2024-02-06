import React, { useEffect } from "react";
import { Card, Card2 } from "./card.components.js";


function CardContainer(props){
    const [page, setPage] = React.useState(0);
    const [number, setNumber] = React.useState(0);
    const [elements, setElements] = React.useState([])

    useEffect(()=>{
        const newnumber = Math.ceil(props.data.length / 10);
        let newelements= [];
        
        if (props.data.length <= 10) {
            newelements.push(props.data);
        } else {
            for (let i = 0; i < newnumber; i++) {
                const chunk = props.data.slice(i * 10, (i + 1) * 10);
                newelements.push(chunk);
            }
        }

        setNumber(newnumber);
        setElements(newelements);
        setPage(0);    
    },[props]);

    const handlePageButtons = (direction)=>{
        if (direction == 'next'){
            if (page < number - 1){
                setPage(page + 1);
            }
        }else{
            if (page != 0){
                setPage( page - 1);
            }
        }
    }

    if(props.type == 'project'){
    return(
        <>
        <div className="projects">
            <div className="grid-container-1">
                {elements.length != 0 ? elements[page].map(element=>(<Card data={element} language={props.language} function={()=>{props.function(element)}}/>)) : Array.from({ length: 10 }, (_, index) => (
                        <div class="image-skeleton"></div>
                        ))}
            </div>
        </div>
        <div className="buttons">
                <button className="boton" onClick={()=>{handlePageButtons('back')}}>{props.language ? 'Past' : 'Anterior'}</button>
                    <ul>
                        {Array.from({ length: number }, (_, index) => (
                            <li key={index}>
                            <button className="boton2" onClick={()=>{setPage(index + 1)}}>{index + 1}</button>
                            </li>
                        ))}
                    </ul>
                <button className="boton" onClick={()=>{handlePageButtons('next')}}>{props.language ? 'Next' : 'Siguiente' }</button>
            </div>
        </>
    )
    }
    else{
        return(
            <>
            <div className="projects">
                <div className="grid-container-1">
                    {elements.length != 0 ? elements[page].map(element=>(<Card data={element} language={props.language} function={()=>{props.function(element)}}/>)) : Array.from({ length: 10 }, (_, index) => (
                        <div class="image-skeleton"></div>
                        ))}
                </div>
            </div>
            <div className="buttons">
                    <button className="boton" onClick={()=>{handlePageButtons('back')}}>{props.language ? 'Past' : 'Anterior'}</button>
                    {Array.from({ length: number }, (_, index) => (
                            <li key={index}>
                            <button className="boton2" onClick={()=>{setPage(index)}}>{index + 1}</button>
                            </li>
                        ))}
                    <button className="boton" onClick={()=>{handlePageButtons('next')}}>{props.language ? 'Next' : 'Siguiente'}</button>
                </div>
            </>
        )
    }
}

export {CardContainer};