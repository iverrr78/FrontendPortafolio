import React, { useEffect } from "react";
import axios from 'axios';
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import useMyContext from '../hooks/useAuth.js';
import '../Styles/StylesAdmin.css';

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
            //await axios.post("https://backend-portafolio-605db99b2585.herokuapp.com/category/post", newcategory, config);
            await axios.post("http://localhost:3001/category/post", newcategory, config);
        }
        else if(slug == ':update'){
            const newcategory = [{
                'name': name,
            }]
            
            const queryParams = {
                'id': [Location.state.id]
            }

            console.log(Number.isInteger(queryParams.id[0]));
            //await axios.patch("https://backend-portafolio-605db99b2585.herokuapp.com/category/update", newcategory, config, {params: queryParams});
            await axios.patch("http://localhost:3001/category/update", newcategory, config, {params: queryParams});
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