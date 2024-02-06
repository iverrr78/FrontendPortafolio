import React from "react";
import '../Styles/StylesProjects.css';
import '../Styles/StylesBlog.css';
import {Toogle} from '../Components/toogle.components.js';
import { CardContainer } from "../Components/cardcontainer.components.js";
import { Modal } from "../Components/modal.components.js";
import useMyContext from "../hooks/useAuth";
import axios from 'axios';

//const hola = [1,2,3,4,5,6,7,8];
function Projects(){
    const {language} = useMyContext();
    const [modal, setModal] = React.useState(false);
    const [projects, setProjects] = React.useState(null);
    const [newprojects, setNewProjects] = React.useState(null);
    const [categories1, setCategories] = React.useState(null);
    const [stacks1, setStacks] = React.useState(null);
    const [currentproject, setCurrentProject] = React.useState([]);
    const [hola, setHola] = React.useState(false);

    React.useEffect(() => {
        setTimeout(async () => {
            const projects1 = await axios.get("https://backend-portafolio-605db99b2585.herokuapp.com/project/GetAll");

            setProjects(projects1.data)
            setNewProjects(projects1.data);
            const newcategories = await axios.get("https://backend-portafolio-605db99b2585.herokuapp.com/category/getAll");
            const categories2 = newcategories.data.map((element)=>({
                id: element.id,
                name: element.name,
                status: false,
            }));

            setCategories(categories2);
            const newstacks = await axios.get("https://backend-portafolio-605db99b2585.herokuapp.com/stack/getAll", {headers:{api:123}});
            const stacks2 = newstacks.data.map((element)=>({
                id: element.id,
                name: element.name,
                status: false
            }));

            setStacks(stacks2);
        }, 4000);
        
      }, []);
    
    React.useEffect(()=>{
        if (categories1 != null && stacks1 != null && projects != null){
            const checkedCategories = categories1.filter(element=>(element.status == true));
            const checkedStacks = stacks1.filter(element => (element.status == true));

            console.log("checkedcategories", checkedCategories);
            console.log("checkedstacks", checkedStacks);

            let newprojects2 = [];

            if(!(checkedCategories.length == 0 && checkedStacks.length == 0)){  
                checkedCategories.forEach(element1 => {
                    projects.forEach(element2=> { if (element2.categoryIds.includes(element1.id) && (!newprojects2.includes(element2))){
                        newprojects2.push(element2);
                    }
                })
                })

                checkedStacks.forEach(element1 => {
                    projects.forEach(element2=> { if (element2.satckIds.includes(element1.id) && (!newprojects2.includes(element2))){
                        newprojects2.push(element2);
                    }
                })
                })

                setNewProjects(newprojects2);
            }else{
                setNewProjects(projects);
            }
        } 
     }, [hola])


    const handleCategories = (event)=>{
        let newcategories = categories1;
        let index = newcategories.findIndex((element)=>(element.name == event.target.getAttribute("value")));
        newcategories[index].status = !newcategories[index].status;
        setCategories(newcategories);
        setHola(!hola);
    }

    const handleStack = (event)=>{
         let newstack = stacks1;
        let index = newstack.findIndex((element)=>(element.name == event.target.getAttribute("value")));
        newstack[index].status = !newstack[index].status;
        setStacks(newstack);
        setHola(!hola);
    }

    const handleModal = (element)=>{
        setCurrentProject(element);
        setModal(true);
    }

    if (projects != null && projects.length == 0){
        if(language){
            return(
                <div className="main4">
                    <h1>There are not any project pusblished</h1>
                </div>
            )
        }else{
            return(
                <div className="main4">
                    <h1>No hay ningun proyecto publicado</h1>
                </div>
            )
        }
        
    }else{
        if(language){
            return(
                <div>
                    <div className="main2">
                    {projects != null ? (<h1>Projects:</h1>) : (<div className="image-skeleton-card" style={{width:'100px', height:'40px'}}></div>)}
                        <div className="main3">
                            <div>
                            {(categories1 != null && newprojects != null && stacks1 != null) ? (
                                <div>
                                <h3>Categories:</h3>
                                <div className="grid-container-1 hola">
                                    {categories1.map(element=>(<Toogle function={handleCategories} text={element.name} selected={element.status}/>))}
                                </div>
                                </div>
                            ) : (
                                <div>
                                    <div style={{width:'100px', height:'40px'}} className="image-skeleton-card"></div>
                                    <div style={{width:'300px', height:'40px'}} className="image-skeleton-card"></div>
                                </div>
                            )}
                            </div>
                            <div>
                            {(stacks1 != null && newprojects != null && categories1 != null) ? (
                                <div>
                                <h3>Stack:</h3>
                                <div className="grid-container-1 hola">
                                    {stacks1.map(element=>(<Toogle function={handleStack} text={element.name} selected={element.status}/>))}
                                </div>
                                </div>
                            ) : (
                                <div>
                                    <div style={{width:'100px', height:'40px'}} className="image-skeleton-card"></div>
                                    <div style={{width:'300px', height:'40px'}} className="image-skeleton-card"></div>
                                </div>
                            )}
                                
                            </div>
                        </div>
                        {(newprojects != null && stacks1 != null && categories1 != null) ? (<CardContainer function={handleModal} type='project' data={newprojects} language={language}/>) : <div className="grid-container-1"> {Array.from({ length: 10 }, (_, index) => (
                            <div class="image-skeleton-card"></div>
                            ))}</div>}
                    </div>
                    {modal && (<Modal lenguage={language} function={()=>{setModal(false)}} data={currentproject}/>)}
                </div>
            )

        }else{
            return(
                <div>
                    <div className="main2">
                        {projects != null ? (<h1>Proyectos:</h1>) : (<div className="image-skeleton-card" style={{width:'100px', height:'40px'}}></div>)}
                        <div className="main3">
                            <div>
                            {(categories1 != null && newprojects != null && stacks1 != null) ? (
                                <div>
                                <h3>Categorias:</h3>
                                <div className="grid-container-1 hola">
                                    {categories1.map(element=>(<Toogle function={handleCategories} text={element.name} selected={element.status}/>))}
                                </div>
                                </div>
                            ) : (
                                <div>
                                    <div style={{width:'100px', height:'40px'}} className="image-skeleton-card"></div>
                                    <div style={{width:'300px', height:'40px'}} className="image-skeleton-card"></div>
                                </div>
                            )}
                            </div>
                            <div>
                            {(stacks1 != null && newprojects != null && categories1 != null) ? (
                                <div>
                                <h3>Stack:</h3>
                                <div className="grid-container-1 hola">
                                    {stacks1.map(element=>(<Toogle function={handleStack} text={element.name}/>))}
                                </div>
                                </div>
                            ) : (
                                <div>
                                    <div style={{width:'100px', height:'40px'}} className="image-skeleton-card"></div>
                                    <div style={{width:'300px', height:'40px'}} className="image-skeleton-card"></div>
                                </div>
                            )}
                                
                            </div>
                        </div>
                        {(newprojects != null && stacks1 != null && categories1 != null) ? (<CardContainer function={handleModal} type='project' data={newprojects} language={language}/>) : <div className="grid-container-1"> {Array.from({ length: 10 }, (_, index) => (
                            <div class="image-skeleton-card"></div>
                            ))}</div>}
                    </div>
                    {modal && (<Modal language={language} function={()=>{setModal(false)}} data={currentproject} categories={categories1} stacks={stacks1}/>)}
                </div>
            )
        }
        
    }
}


export {Projects};