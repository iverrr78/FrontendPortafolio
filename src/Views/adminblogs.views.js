import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router";
import useMyContext from '../hooks/useAuth.js';
import dotenv from 'dotenv';
import '../Styles/StylesAdmin.css';

dotenv.config()

const SERVER_URL = process.env.SERVER_URL;

function AdminBlog(){
    const navigate = useNavigate();
    const {auth} = useMyContext();
    const [blogs, setBlogs] = React.useState([]);

    if (auth == null){
        navigate('/login')
    }

    React.useEffect(() => {
        const funcion = async () =>{
            try{
            const response = await axios.get(`${SERVER_URL}/blog/getAll`);
            setBlogs(response.data);
            }
            catch(err){
                console.log(err);
            }
            }
        funcion();
      }, []);

      const handleDelete = async (element, index)=>{

        const blog = element;

        const config = {
            headers: {
                'Authorization': `Bearer ${auth}`
            },
            params: {
                id: blog.id,
                previousimagename: blog.imagename
            }
        };

        try{
             await axios.delete(`${SERVER_URL}/blog/deleteById`, config)
        }catch(err){
            console.log(err);
        }

        const newblogs = blogs.map((element1)=>(element1.id != index));
        setBlogs(newblogs);
      }

      console.log('blogs', blogs);

      if(blogs.length != 0){
        return(
            <div className="main2" style={{minHeight:'100vh'}}>
                <h1>Blogs:</h1>
                <div>
                    <ul className="adminblogcontainer">
                        {blogs.map((element,index)=>(<li key={index} className="admincard"><p>{element.spanish_name}</p><div><button onClick={()=>handleDelete(element, index)} style={{border:'none'}}><img id={element.id} src='https://img.icons8.com/ios-glyphs/30/trash--v1.png' width="30" height="30"/></button><Link to="/admin/admincreateblog/:update" state={element} style={{textDecoration:'none', color:'black'}}><button style={{border:'none'}}><img src='https://img.icons8.com/ios-glyphs/30/edit--v1.png'/></button></Link></div></li>))}
                    </ul>
                </div>
                <Link to='/admin/admincreateblog/create' className="boton" style={{textDecoration: 'none', color:'black', paddingLeft:'10px', marginLeft:'650px'}} state={{english_name:'',english_text:'', spanish_name: '', spanish_descritpion: '', categoryIds:[]}}>Crear nuevo blog</Link>
            </div>
            )
      }else{
        return(
            <div className="main2">
                <div style={{display:'flex', height: '100vh', justifyContent:'center', alignItems:'center' }}>
                <h1>No hay ningun blog</h1>
                </div>
                <Link to='/admin/admincreateblog/create' className="boton" style={{textDecoration: 'none', color:'black', paddingLeft:'10px', marginLeft:'650px'}} state={{english_name:'',english_text:'', spanish_name: '', spanish_descritpion: '', categoryIds:[]}}>Crear nuevo blog</Link>
            </div>
        )
      }
    
}

export {AdminBlog};