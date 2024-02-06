import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import useMyContext from '../hooks/useAuth.js';

function AdminStacks(){
    const navigate = useNavigate();
    const {auth} = useMyContext();
    const [stacks, setStacks] = React.useState([]);

    React.useEffect(() => {
        if (auth == null){
            navigate('/login')
        }
        const funcion = async () =>{
            try{
            const response = await axios.get("https://backend-portafolio-605db99b2585.herokuapp.com/stack/getAll");
            setStacks(response.data);
            }
            catch(err){
                console.log(err);
            }
            }
        funcion();
      }, []);

      const handleDelete = async (event)=>{
        console.log(event.target.id);
        
        const config = {
            headers: {
                'Authorization': `Bearer ${auth}`
            },
            params: {
                id: event.target.id
            }
        };

        try{
             await axios.delete("https://backend-portafolio-605db99b2585.herokuapp.com/stack/deleteById", config)
        }catch(err){
            console.log(err);
        }

        const newstacks = stacks.filter((element)=>(element.id != event.target.id));
        console.log(newstacks);
        setStacks(newstacks);
      }

      if(stacks.length != 0 ){
        return(
            <div className="main2" style={{minHeight:'100vh'}}>
                <h1>stacks:</h1>
                <div>
                    <ul className="adminblogcontainer">
                        {stacks.map((element, index)=>(<li key={index} className="admincard"><p>{element.name}</p><div><button onClick={handleDelete} style={{border:'none'}}><img id={element.id} src='https://img.icons8.com/ios-glyphs/30/trash--v1.png' width="30" height="30"/></button><Link to="/admin/admincreatestack/:update" state={element} style={{textDecoration:'none', color:'black'}}><button style={{border:'none'}}><img src='https://img.icons8.com/ios-glyphs/30/edit--v1.png'/></button></Link></div></li>))}
                    </ul>
                </div>
                <Link to='/admin/admincreatestack/create' className="boton" style={{textDecoration: 'none', color:'black', paddingLeft:'10px', marginLeft:'650px'}} state={{name:'',text:''}}>Crear nuevo stack</Link>
            </div>
            )
      }else{
        return(
            <div className="main2">
                <div style={{display:'flex', height: '100vh', justifyContent:'center', alignItems:'center' }}>
                <h1>No hay ningun stack</h1>
                </div>
                <Link to='/admin/admincreatestack/create' className="boton" style={{textDecoration: 'none', color:'black', paddingLeft:'10px', marginLeft:'650px'}} state={{name:'',text:''}}>Crear nuevo stack</Link>
            </div>
        )
      }
    
}

export {AdminStacks};