import React, { useEffect } from "react";
import axios from 'axios';
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import useMyContext from '../hooks/useAuth.js';
import dotenv from 'dotenv';
import '../Styles/StylesAdmin.css';

function AdminCreateBlog(){
    const Location = useLocation();
    const navigate = useNavigate();
    const {auth} = useMyContext();
    const [categories, setCategories] = React.useState([]);
    const [namespanish, setNameSpanish] = React.useState(Location.state.spanish_name || "");
    const [nameenglish, setNameEnglish] = React.useState(Location.state.english_name || "");
    const [textspanish, setTextSpanish] = React.useState(Location.state.spanish_text || "");
    const [textenglish, setTextEnglish] = React.useState(Location.state.english_text || "");
    const [categorieschecked, setCategorieschecked] = React.useState([]);
    const [selectedFile, setSelectedFile] = React.useState(null);

    dotenv.config()

    const SERVER_URL = process.env.SERVER_URL;

    const {slug} = useParams();

    useEffect(()=>{
        if (auth == null){
            navigate('/login')
        }
        const funcioncategories = async () =>{
            try{
            const newcategories = await axios.get(`${SERVER_URL}/category/getAll`);
            setCategories(newcategories.data);
            }
            catch(err){
                console.log(err);
            }
        }
        const newcategorieschecked =  Location.state.categoryIds;
        setCategorieschecked(newcategorieschecked);
        funcioncategories();
    }, []);

    

    const handleChangetext = (e)=>{

        const name2 = e.target.name;
        if(name2 == 'namespanish'){
            const newname = e.target.value;
            setNameSpanish(newname);
        }
        if(name2 == 'nameenglish'){
            const newname = e.target.value;
            setNameEnglish(newname);
        }
        if(name2 == 'textspanish'){
            const newtext = e.target.value;
            setTextSpanish(newtext)
        }
        else{
            const newtext = e.target.value;
            setTextEnglish(newtext);
        }
        
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
      };

    const handleChangeCheckbox = (event)=>{
        const {id} = event.target;
        const checked = categorieschecked.includes(parseInt(id));

        if(!checked){
            const newarray = [...categorieschecked, parseInt(id)];
            setCategorieschecked(newarray);
        }
        else{
            const newarray = categorieschecked.filter(value => value !== parseInt(id));
            setCategorieschecked(newarray);
        }

    };

    const handleSubmit = async (event)=>{
        event.preventDefault();

        const formData = new FormData();
        formData.append('image', selectedFile);
        
        if(slug == 'create'){
            const newblog = {
                'name_spanish': namespanish,
                'name_english': nameenglish,
                'text_spanish': textspanish,
                'text_english': textenglish,
                'id_category': categorieschecked,
            }

            const config = {
                headers: {
                    'Authorization': `Bearer ${auth}`
                }
            }

            formData.append('body', JSON.stringify(newblog));
            await axios.post(`${SERVER_URL}/blog/post`, formData, config);
        }
        else if(slug == ':update'){
            const newblog = {
                'name_spanish': namespanish,
                'name_english': nameenglish,
                'text_spanish': textspanish,
                'text_english': textenglish,
                'id_category': categorieschecked,
            }

            const config = {
                headers: {
                    'Authorization': `Bearer ${auth}`
                },
                params: {
                    id: Location.state.id
                }
            }

            formData.append('body', JSON.stringify(newblog));
            await axios.patch(`${SERVER_URL}/blog/update`, formData, config);
        }
    }

    return(
        <div className="main2" style={{minHeigth:'100%'}}>
            <form className="adminform" onSubmit={handleSubmit}>
                <label to="namespanish" style={{color: 'var(--second-text-color)', fontWeight: 'bold'}}>Titulo en español</label>
                <input className="inputname" name='namespanish' type="text" value={namespanish} onChange={handleChangetext}/>
                <label to="name" style={{color: 'var(--second-text-color)', fontWeight: 'bold'}}>Titulo en english</label>
                <input className="inputname" name='nameenglish' type="text" value={nameenglish} onChange={handleChangetext}/>
                <fieldset>
                    <legend style={{color: 'var(--second-text-color)', fontWeight: 'bold'}}>Categorias:</legend>
                    { categories.map((element)=>(
                        <div>
                        <input type="checkbox" id={element.id} name="scales" onChange={handleChangeCheckbox} checked={categorieschecked.includes(element.id)}/>
                        <label for="scales" style={{color: 'var(--second-text-color)', fontWeight: 'bold'}}>{element.name}</label>
                        </div>
                    ))
                    
                    }

                </fieldset>

                <label to="textspanish" style={{color: 'var(--second-text-color)', fontWeight: 'bold'}}>Texto en español</label>
                <textarea className="inputtext" name="textspanish" value={textspanish} onChange={handleChangetext}/>

                <label to="textenglish" style={{color: 'var(--second-text-color)', fontWeight: 'bold'}}>Texto en ingles</label>
                <textarea className="inputtext" name="textenglish" value={textenglish} onChange={handleChangetext}/>

                <label to="image" style={{color: 'var(--second-text-color)', fontWeight: 'bold'}}>Image</label>
                <input type="file" name="image" accept="image/*" onChange={handleFileChange}/>

                <input type="submit" value="Submit" className="boton" style={{marginLeft: '250px'}}></input>

            </form>
        </div>
    )
}

export {AdminCreateBlog};