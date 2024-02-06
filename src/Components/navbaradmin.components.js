import React from "react";
import { Link, Outlet } from 'react-router-dom';
import '../Styles/StylesAdmin.css';

function NavbarAdmin() {
    const [buttonPushed, setbuttonPushed] = React.useState(false)

    const handlerNavBar = ()=>{
        const hamburger = document.querySelector('.hamburger2');
        const nav = document.querySelector('.vertical-menu');
        console.log('hamburger', hamburger);

        if(!buttonPushed){
            hamburger.classList.add('change');
            nav.classList.remove('hidden2');
            nav.classList.add('visible2');
        } else {
            hamburger.classList.remove('change');
            nav.classList.remove('visible2');
            nav.classList.add('hidden2');
        }
        setbuttonPushed(!buttonPushed)
    }

    return(
        <>
            <div className='hamburger2' onClick={handlerNavBar}>
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
            </div>
            <nav className="vertical-menu hidden2">
                <ul>
                    <li className="menu-items"><Link to={"/admin/adminblogs"} className="links">Blogs</Link></li>
                    <li className="menu-items"><Link to={"/admin"} className='links'>Projects</Link></li>
                    <li className="menu-items"><Link to={"/admin/adminstacks"} className='links'>Stacks</Link></li>
                    <li className="menu-items"><Link to={'/admin/admincategories'} className='links'>Categories</Link></li>
                </ul>
            </nav>
            <div><Outlet/></div>
        </>
    )
}

export {NavbarAdmin};