import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router";
import useMyContext from '../hooks/useAuth.js';
//import dotenv from 'dotenv';
import '../Styles/StylesAdmin.css';

//dotenv.config()

//const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const SERVER_URL = "https://backend-portafolio-605db99b2585.herokuapp.com"

function AdminProjects(){
    const navigate = useNavigate();
    const {auth} = useMyContext()
    const [projects, setProjects] = React.useState([]);
    
    React.useEffect(() => {
        if (auth == null){
            navigate('/login')
        }
        const funcion = async () =>{
            try{
            const projects1 = await axios.get(`${SERVER_URL}/project/getAll`);
            console.log("projects:", projects1);
            setProjects(projects1.data);
            }
            catch(err){
                console.log(err);
            }
            }
        funcion();
      }, []);

      const handleDelete = async (element, index)=>{
        console.log("hola que tal");
        console.log("id:",element.id);
        console.log("auth:", auth);
        
        const project = element;
        console.log("image", project.imagename);

        const config = {
            headers: {
                'Authorization': `Bearer ${auth}`
            },
            params: {
                id: project.id,
                previousimagename: project.imagename
            }
        };

        try{
             await axios.delete(`${SERVER_URL}/project/delete`, config)
        }catch(err){
            console.log(err);
        }

        const newprojects = projects.map((element1)=>(element1.id != index));
        setProjects(newprojects);
      }

      console.log('projects', projects);
      if(projects.length != 0){
        return(
            <div className="main2" style={{minHeight: '100vh'}}>
                <h1>Projects:</h1>
                <div>
                    <ul className="adminblogcontainer">
                        {projects.map((element, index)=>(<li key={index} className="admincard"><p>{element.name_spanish}</p><div><button style={{border:'none'}} onClick={()=>handleDelete(element, index)}><img id = {element.id} src='https://img.icons8.com/ios-glyphs/30/trash--v1.png'/></button><Link to="/admin/admincreateproject/:update" state={element}><button style={{border:'none'}}><img src='https://img.icons8.com/ios-glyphs/30/edit--v1.png'/></button></Link></div></li>))}
                    </ul>
                </div>
                <Link to='/admin/admincreateproject/create' className="boton" style={{textDecoration: 'none', color:'black', paddingLeft:'10px', marginLeft:'650px'}} state={{english_name:'',english_text:'', spanish_name: '', spanish_descritpion: '', categoryIds:[], stackIds:[]}}>Crear nuevo proyecto</Link>
            </div>
            )
      }else{
        return(
            <div className="main2">
                    <div style={{display:'flex', height: '100vh', justifyContent:'center', alignItems:'center' }}>
                    <h1>No hay ningun proyecto</h1>
                    </div>
                    <Link to='/admin/admincreateproject/create' className="boton" style={{textDecoration: 'none', color:'black', paddingLeft:'10px', marginLeft:'650px'}} state={{english_name:'',english_text:'', spanish_name: '', spanish_descritpion: '', categoryIds:[], stackIds:[]}}>Crear nuevo proyecto</Link>
            </div>
        )
      }
    
}

export {AdminProjects};