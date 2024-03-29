import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import useMyContext from '../hooks/useAuth.js';
//import dotenv from 'dotenv';

//dotenv.config()

//const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const SERVER_URL = "https://backend-portafolio-605db99b2585.herokuapp.com";

function AdminCategories(){
    const navigate = useNavigate();
    const {auth} = useMyContext();
    const [categories, setCategories] = React.useState([]);

    React.useEffect(() => {
        if (auth == null){
            navigate('/login')
        }
        const funcion = async () =>{
            try{
            const response = await axios.get(`${SERVER_URL}/category/getAll`);
            setCategories(response.data);
            }
            catch(err){
                console.log(err);
            }
            }
        funcion();
      }, []);

      const handleDelete = async (event)=>{

        const config = {
            headers: {
                'Authorization': `Bearer ${auth}`
            },
            params: {
                id: event.target.id
            }
        };

        try{
             await axios.delete(`${SERVER_URL}/blog/deleteById`, config)
        }catch(err){
            console.log(err);
        }

        const newcategories = categories.map((element)=>(element.id != event.target.key));
        setCategories(newcategories);
      }

      if(categories.length != 0){
        return(
            <div className="main2" style={{minHeight:'100vh'}}>
                <h1>categories:</h1>
                <div>
                    <ul className="adminblogcontainer">
                        {categories.map((element, index)=>(<li key={index} className="admincard"><p>{element.name}</p><div><button onClick={handleDelete} style={{border:'none'}}><img id={element.id} src='https://img.icons8.com/ios-glyphs/30/trash--v1.png' width="30" height="30"/></button><Link to="/admin/admincategory/:update" state={element} style={{textDecoration:'none', color:'black'}}><button style={{border:'none'}}><img src='https://img.icons8.com/ios-glyphs/30/edit--v1.png'/></button></Link></div></li>))}
                    </ul>
                </div>
                <Link to='/admin/admincreatecategory/create' className="boton" style={{textDecoration: 'none', color:'black', paddingLeft:'10px', marginLeft:'650px'}} state={{name:'',text:''}}>Crear nuevo blog</Link>
            </div>
            )
      }else{
        return(
            <div className="main2">
                <div style={{display:'flex', height: '100vh', justifyContent:'center', alignItems:'center' }}>
                <h1>No hay ninguna categoria</h1>
                </div>
                <Link to='/admin/admincreatecategory/create' className="boton" style={{textDecoration: 'none', color:'black', paddingLeft:'10px', marginLeft:'650px'}} state={{name:'',text:''}}>Crear nuevo blog</Link>
            </div>
        )
      }
}

export {AdminCategories};