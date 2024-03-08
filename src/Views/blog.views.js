import React from "react";
import '../Styles/StylesProjects.css';
import {Toogle} from '../Components/toogle.components.js';
import { CardContainer } from "../Components/cardcontainer.components.js";
import {useNavigate} from 'react-router-dom';
import { categories, data } from "../Data/Data";
import useMyContext from "../hooks/useAuth";
import dotenv from "dotenv";
import axios from 'axios';

dotenv.config()

const SERVER_URL = process.env.SERVER_URL;

function Blog(){
    const {language} = useMyContext();
    const [categories, setCategories] = React.useState(null);
    const [blogs, setBlogs] = React.useState(null);
    const [newblogs, setNewBlogs] = React.useState(null);
    const [hola, setHola] = React.useState(false);

    const navigate = useNavigate();

    React.useEffect(() => {
        setTimeout(async () => {
            const blogs1 = await axios.get(`${SERVER_URL}/blog/getAll`);
            setBlogs(blogs1.data);
            setNewBlogs(blogs1.data);
            const newcategories = await axios.get(`${SERVER_URL}/category/getAll`);
            const categories2 = newcategories.data.map((element)=>({
                id: element.id,
                name: element.name,
                status: false
            }));
            setCategories(categories2);
        }, 4000);  
      }, []);

    React.useEffect(()=>{
        const checkedCategories = categories != null ? categories.filter(element=>(element.status == true)) : [];
        let newblogs2 = [];
        if(checkedCategories.length != 0){
            checkedCategories.forEach(element1 => {
                blogs.forEach(element2=>{ if (element2.categoryIds.includes(element1.id) && !newblogs2.includes(element2)){newblogs2.push(element2)}});
            });;
            
            setNewBlogs(newblogs2);
            
        }else{
            setNewBlogs(blogs);
        }
    }, [hola])

    const handleCategories = (event)=>{
        let newcategories = categories;
        let index = newcategories.findIndex((element)=>(element.name == event.target.getAttribute("value")));
        newcategories[index].status = !newcategories[index].status;
        setCategories(newcategories);
        setHola(!hola);
    }

    const navigateSingleBlog = (element)=>{
         navigate("/singleblog", {state:element});
    }

    if(blogs != null && blogs.length == 0){
        if(language){
            return(
                <div className="main4">
                    <h1>There is not any blog published</h1>
                </div>
            ) 
        }else{
            return(
                <div className="main4">
                    <h1>No hay ningun blog publicado</h1>
                </div>
            )
        }
    }else{
        if(language){
            return(
                <div>
                    <h1>blogs:</h1>
                    <div className="main2">
                        <div className="mainblog">
                        {(categories != null && newblogs != null) ? (
                                    <div>
                                    <h3>Categories:</h3>
                                    <div className="grid-container-1 hola">
                                        {categories.map(element=>(<Toogle function={handleCategories} text={element.name} selected={element.status}/>))}
                                    </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div style={{width:'100px', height:'40px'}} className="image-skeleton-card"></div>
                                        <div style={{width:'300px', height:'40px'}} className="image-skeleton-card"></div>
                                    </div>
                                )}
                        </div>
                        {(newblogs != null && categories != null) ? <CardContainer type='blog' language={language} function={navigateSingleBlog} data={newblogs}/> : <div className="grid-container-1"> {Array.from({ length: 10 }, (_, index) => (
                                <div class="image-skeleton-card"></div>
                                ))}</div>}
                    </div>
                </div>
                
            )
        } else {
            return(
                <div>
                    <div className="main2">
                        {blogs != null ? (<h1>blogs:</h1>) : (<div style={{width:'100px', height:'40px'}} className="image-skeleton-card"></div>)}
                        <div className="mainblog">
                        {(categories != null && newblogs != null) ? (
                                    <div>
                                    <h3>Categorias:</h3>
                                    <div className="grid-container-1 hola">
                                        {categories.map(element=>(<Toogle function={handleCategories} text={element.name} selected={element.status}/>))}
                                    </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div style={{width:'100px', height:'40px'}} className="image-skeleton-card"></div>
                                        <div style={{width:'300px', height:'40px'}} className="image-skeleton-card"></div>
                                    </div>
                                )}
                        </div>
                        {(newblogs != null && categories != null) ? <CardContainer type='blog' function={navigateSingleBlog} data={newblogs} language={language}/> : <div className="grid-container-1"> {Array.from({ length: 10 }, (_, index) => (
                                <div class="image-skeleton-card"></div>
                                ))}</div>}
                    </div>
                </div>
                
            )
        }
        
    }   
}

export {Blog};