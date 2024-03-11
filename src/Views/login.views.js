import React, { useContext } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import '../Styles/StylesLogIn.css'
import { useNavigate } from "react-router";
import dotenv from "dotenv";

dotenv.config()

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function LogIn(){
    const {setAuth, auth} = useAuth();
    const [password, setPassword] = React.useState();
    const navigate = useNavigate();

    const handleChange = (event)=>{
        let value = event.target.value;
        setPassword(value);
    }

    const hanldeSubmit = async (event)=>{
        event.preventDefault();
        try{
            const request = {
                username: "hola",
                password: password
            }
            const response = await axios.post(`${SERVER_URL}/auth/`, request);

            const accestoken = response.data.token;
            setAuth(accestoken);
            navigate('/admin/')
        }catch(err){
            console.log("error");
        }
    }

    return(
        <div className="main-container">
            <p style={{fontWeight:'bold', color:'#F4D03F', fontSize:'40px'}}>LogIn</p>
            <form onSubmit={hanldeSubmit}>
                <input className="password" value={password} placeholder="password" onChange={handleChange}></input>
                <button type="submit" className="enter">enter</button>
            </form>
        </div>
    )
}

export {LogIn};