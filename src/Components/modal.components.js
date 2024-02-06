import React from 'react';
import ReactDOM from 'react-dom';
import '../Styles/StylesModal.css';

const hola = [1,2,3,4,5,6,7,8];

function Modal(props){
    console.log("language1", props.language);
    console.log("blockfi",props.data);
    return ReactDOM.createPortal(
        <div className='modal'>
            <Popup language={props.language} function = {props.function} data = {props.data} categories = {props.categories} stacks = {props.stacks}/>
        </div>,
        document.getElementById('modal')
    );
}

function Popup(props){
    console.log("language", props.language);
    console.log("categorynames", props.data.categoryIds);
    console.log("stacknames", props.data.satckIds);
    //props.categories.map(element=>{console.log(props.data.categoryIds.includes(element.id))});
    const categorynames = props.categories.map(element=>{if(props.data.categoryIds.includes(element.id)){return element.name}});
    console.log(categorynames);
    const stacknames = props.stacks.map(element=>{if(props.data.satckIds.includes(element.id)){return element.name}});
    console.log(stacknames);

    if(props.language){
        return(
            <div className='popup'>
                <div onClick={props.function} className='close-button' style={{position:'absolute', right:'15px', marginTop:'10px', width:'30px',height:'30px', borden:'none'}}></div>
                <div style={{paddingLeft:'30px'}}>
                <p style={{margin:0, fontWeight:'bold'}}>bitcoin</p>                
                <div style={{height:'60px'}}>
                    <p style={{margin:0, fontWeight:'bold'}}>Categories:</p>
                    <div style={{display: 'flex', justifyContent:'space-between', width:'600px'}}>
                        {categorynames.map(element=>(<p>{element}</p>))}
                    </div>
                </div>
                <div style={{height:'60px', overflow:'hidden'}}>
                    <p style={{margin:0, fontWeight:'bold'}}>Stack:</p>
                    <div style={{display: 'flex', justifyContent:'space-between', width:'600px'}}>
                        {stacknames.map(element=>(<p style={{margin:0}}>{element}</p>))}
                    </div>
                </div>
                <div style={{height:'80px', overflow:'hidden'}}>
                    <p style={{margin:0, fontWeight:'bold'}}>description:</p>
                    <p>{props.data.description_english} </p>
                </div>
                <div style={{height: '60px', overflow:'hidden'}}>
                    <p style={{margin:0, fontWeight:'bold'}}>Github:</p>
                    <p>{props.data.github}</p>
                </div>
                <div style={{height:'60px', overflow:'hidden'}}>
                    <p style={{margin:0, fontWeight:'bold'}}>Web:</p>
                    <p>{props.data.link}</p>
                </div>
                </div>
            </div>
        )
    }
    else {
        return(
            <div className='popup'>
                <div onClick={props.function} className='close-button' style={{position:'absolute', right:'15px', marginTop:'10px', width:'30px',height:'30px', borden:'none'}}></div>
                <div style={{paddingLeft:'30px', paddingTop:'50px', paddingBottom: '50px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
                <div style={{height:'60px'}}>
                    <p style={{margin:0, fontWeight:'bold'}}>Categorias:</p>
                    <div style={{display: 'flex', justifyContent:'space-between', width:'600px'}}>
                        {categorynames.map(element=>(<p>{element}</p>))}
                    </div>
                </div>
                <div style={{height:'60px', overflow:'hidden'}}>
                    <p style={{margin:0, fontWeight:'bold'}}>Stack:</p>
                    <div style={{display: 'flex', justifyContent:'space-between', width:'600px'}}>
                        {stacknames.map(element=>(<p style={{margin:0}}>{element}</p>))}
                    </div>
                </div>
                <div style={{height:'80px', overflow:'hidden'}}>
                    <p style={{margin:0, fontWeight:'bold'}}>descripcion:</p>
                    <p>{props.data.description_spanish} </p>
                </div>
                <div style={{height: '60px', overflow:'hidden'}}>
                    <p style={{margin:0, fontWeight:'bold'}}>Github:</p>
                    <p>{props.data.github}</p>
                </div>
                <div style={{height:'60px', overflow:'hidden'}}>
                    <p style={{margin:0, fontWeight:'bold'}}>Web:</p>
                    <p>{props.data.link}</p>
                </div>
                </div>
            </div>
        )
    }
}
export {Modal};