import React, { useEffect } from "react";
import axios from 'axios';
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import useMyContext from '../hooks/useAuth.js';
import dotenv from 'dotenv';
import '../Styles/StylesAdmin.css';

dotenv.config()

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function AdminCreateCategory(){
    const Location = useLocation();
    const navigate = useNavigate();
    const {auth} = useMyContext();
    const [name, setName] = React.useState(Location.state.name);

    const {slug} = useParams();
    console.log(slug);

    useEffect(()=>{
        if (auth == null){
            navigate('/login');
        }
    }, [])

    const handleChangetext = (e)=>{
        const newname = e.target.value;
        setName(newname);
    }


    const handleSubmit = async (event)=>{
        event.preventDefault();

        const config = {
            headers: {
                'Authorization': `Bearer ${auth}`
            }
        }

        if(slug == 'create'){
            const newcategory = [{
                'name': name,
            }]
            console.log(newcategory);
            await axios.post(`${SERVER_URL}/category/post`, newcategory, config);
        }
        else if(slug == ':update'){
            const newcategory = [{
                'name': name,
            }]
            
            const queryParams = {
                'id': [Location.state.id]
            }

            console.log(Number.isInteger(queryParams.id[0]));
            await axios.patch( `${SERVER_URL}/category/update`, newcategory, config, {params: queryParams});
        }
    }

    return(
        <div class="main2" style={{height: '100vh'}}>
            <form className="adminform" onSubmit={handleSubmit}>
                <label to="name" style={{color: 'var(--second-text-color)', fontWeight: 'bold'}}>Nombre</label>
                <input className="inputname" name='name' type="text" value={name} onChange={handleChangetext}/>

                <input className="boton" type="submit" value="Submit"></input>

            </form>
        </div>
    )
}

export {AdminCreateCategory};