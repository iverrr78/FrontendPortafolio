import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import useMyContext from "../hooks/useAuth";
import githubimage from "../Assets/icons8-github-50.png"
import emailimage from "../Assets/icons8-email-50.png"

function Navbar(){
    const {setLanguage, language} = useMyContext();
    console.log("function", setLanguage);
    const [buttonPushed, setbuttonPushed] = React.useState(false)

    const handlerNavBar = ()=>{
        const hamburger = document.querySelector('.hamburger');
        const nav = document.querySelector('.navbar1');

        if(!buttonPushed){
            hamburger.classList.add('change');
            nav.classList.remove('hidden');
            nav.classList.add('visible');
        } else {
            hamburger.classList.remove('change');
            nav.classList.remove('visible');
            nav.classList.add('hidden');
        }
        setbuttonPushed(!buttonPushed)
    }

    return(
        <>
            <div class="hamburger" onClick={handlerNavBar}>
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
            </div>
            <nav className='navbar1 hidden'>
                <ul className='navbar2 link'>
                    <li><Link to={"/"} className='links'>{!language ? "Inicio" : "Home"}</Link></li>
                    <li><Link to={"/proyectos"} className='links'>{!language ? "Proyectos" : "Projects"}</Link></li>
                    <li><Link to={"/blog"} className='links'>Blog</Link></li>
                    <li><Link to={'/contacto'} className='links'>{!language ? "Contacto" : "Contect"}</Link></li>
                </ul>
                <ul className='navbar2' style={{paddingRight:'30px'}}>
                    <li><button onClick={()=>{setLanguage(false)}} style={{backgroundColor:'transparent', border:'none', boxShadow:'none', color:'#f4d03f', fontWeight:'bold'}}>ES</button></li>
                    <li><button onClick={()=>{setLanguage(true)}} style={{backgroundColor:'transparent', border:'none', boxShadow:'none', color:'#f4d03f', fontWeight:'bold'}}>EN</button></li>
                </ul>
            </nav>
            <div><Outlet/></div>
            <footer className='footer'>
                <div style={{display:'flex', flexDirection:'row', gap:'30px', marginRight:'40px', marginTop:'10px'}}>
                    <a href="mailto:ivandres6d@gmail.com"><img src={emailimage}/></a>
                    <a href="https://github.com/iverrr78?tab=repositories" target="_blank" rel="noopener noreferrer"><img src={githubimage}/></a>
                </div>
            </footer>
        </>
    )
}

export {Navbar};