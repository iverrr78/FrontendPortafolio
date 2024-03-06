import React, { useEffect } from "react";
import axios from 'axios';
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import useMyContext from '../hooks/useAuth.js';
import dotenv from 'dotenv';
import '../Styles/StylesAdmin.css';

dotenv.config()

const SERVER_URL = process.env.SERVER_URL;

function AdminCreateProjects(){
    const Location = useLocation();
    const navigate = useNavigate();
    const {auth} = useMyContext();
    const [categories, setCategories] = React.useState([]);
    const [stacks, setStacks] = React.useState([])
    const [namespanish, setNameSpanish] = React.useState(Location.state.name_spanish || "");
    const [nameenglish, setNameEnglish] = React.useState(Location.state.name_english || "");
    const [descriptionspanish, setDescriptionSpanish] = React.useState(Location.state.description_spanish || "");
    const [descriptionenglish, setDescriptionEnglish] = React.useState(Location.state.description_english || "");
    const [github, setGithub] = React.useState(Location.state.github);
    const [link, setLink] = React.useState(Location.state.link);
    const [categorieschecked, setCategorieschecked] = React.useState([]);
    const [Stackschecked, setStackschecked] = React.useState([]);
    const [selectedFile, setSelectedFile] = React.useState(null);

    const {slug} = useParams();

    console.log('previousimage',Location.state.image);
    useEffect(()=>{
        if (auth == null){
            navigate('/login');
        }
        const funcioncategories = async () =>{
            try{
            const newcategories = await axios.get(`${SERVER_URL}/category/getAll`);
            setCategories(newcategories.data);
            setCategories(newcategories.data);
            const newstacks = await axios.get(`${SERVER_URL}/stack/getAll`, {headers:{api: 123}});
            setStacks(newstacks.data);
            }
            catch(err){
                console.log(err);
            }
        }
        const newcategorieschecked = Location.state.categoryIds;
        setCategorieschecked(newcategorieschecked);
        const newstackschecked = Location.state.satckIds || Location.state.stackIds;
        setStackschecked(newstackschecked);
        funcioncategories();
    }, []);

    

    const handleChangetext = (e)=>{
        //console.log(name);
        //console.log(description);
        const name2 = e.target.name;
        if(name2 == 'namespanish'){
            const newname = e.target.value;
            //console.log(newname);
            setNameSpanish(newname);
        }
        if(name2 == 'nameenglish'){
            const newname = e.target.value;
            setNameEnglish(newname);
        }
        if(name2 == 'descriptionspanish'){
            const newdescription = e.target.value;
            //console.log(newdescription);
            setDescriptionSpanish(newdescription);
        }
        if(name2 == 'descriptionenglish'){
            const newdescription = e.target.value;
            //console.log(newdescription);
            setDescriptionEnglish(newdescription);
        }
        if(name2 == 'link'){
            const newlink = e.target.value;
            setLink(newlink);
        }
        if(name2 == 'github'){
            const newgithub = e.target.value;
            setGithub(newgithub);
        }
        
    }

    const handleChangeCategories = (event)=>{
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

    }

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
      };

    const handleChangeStacks = (event)=>{
        const {id} = event.target;
        const checked = Stackschecked.includes(parseInt(id));

        if(!checked){
            const newarray = [...Stackschecked, parseInt(id)];
            setStackschecked(newarray);
        }
        else{
            const newarray = Stackschecked.filter(value => value !== parseInt(id));
            setStackschecked(newarray);
        }

    }

    const handleSubmit = async (event)=>{
        event.preventDefault();

        const formData = new FormData();
        formData.append('image', selectedFile);

        if(slug == 'create'){
            const newproject = {
                'name_spanish': namespanish,
                'name_english': nameenglish,
                'description_spanish': descriptionspanish,
                'description_english': descriptionenglish,
                'github': github,
                'link': link,
                'id_category': categorieschecked,
                'id_stack': Stackschecked
            }

            const config = {
                headers: {
                    'Authorization': `Bearer ${auth}`
                }
            }

            formData.append('body', JSON.stringify(newproject));
            await axios.post(`${SERVER_URL}/project/post`, formData, config);
        }
        else if(slug == ':update'){
            const newproject = {
                'name_spanish': namespanish,
                'name_english': nameenglish,
                'description_spanish': descriptionspanish,
                'description_english': descriptionenglish,
                'github': github,
                'link': link,
                'id_category': categorieschecked,
                'id_stack': Stackschecked,
            }

            const config = {
                headers: {
                    'Authorization': `Bearer ${auth}`
                },
                params: {
                    id: Location.state.id
                }
            }

            formData.append('body', JSON.stringify(newproject));

            await axios.patch(`${SERVER_URL}/project/update`, formData, config);
        }
        }
    

    return(
        <div className="main2">
            <form className="adminform" onSubmit={handleSubmit}>
                <label to="namespanish" style={{color: 'var(--second-text-color)', fontWeight: 'bold'}}>Titulo en español</label>
                <input className="inputname" name='namespanish' type="description" value={namespanish} onChange={handleChangetext}/>
                <label to="nameenglish" style={{color: 'var(--second-text-color)', fontWeight: 'bold'}}>Titulo en ingles</label>
                <input className="inputname" name='nameenglish' type="description" value={nameenglish} onChange={handleChangetext}/>
                <fieldset>
                    <legend style={{color: 'var(--second-text-color)', fontWeight: 'bold'}}>Categorias:</legend>
                    { categories.map((element)=>(
                        <div>
                        <input type="checkbox" id={element.id} name="scales" onChange={handleChangeCategories} checked={categorieschecked.includes(element.id)}/>
                        <label for="scales" style={{color: 'var(--second-text-color)', fontWeight: 'bold'}}>{element.name}</label>
                        </div>
                    ))
                    
                    }

                </fieldset>
                <fieldset>
                    <legend style={{color: 'var(--second-text-color)', fontWeight: 'bold'}}>Stacks:</legend>
                    { stacks.map((element)=>(
                        <div>
                        <input type="checkbox" id={element.id} name="scales" onChange={handleChangeStacks} checked={Stackschecked.includes(element.id)}/>
                        <label for="scales" style={{color: 'var(--second-text-color)', fontWeight: 'bold'}}>{element.name}</label>
                        </div>
                    ))
                    
                    }

                </fieldset>

                <label to="description" style={{color: 'var(--second-text-color)', fontWeight: 'bold'}}>Spanish description</label>
                <textarea className="inputtext" name="descriptionspanish" value={descriptionspanish} onChange={handleChangetext}/>

                <label to="description" style={{color: 'var(--second-text-color)', fontWeight: 'bold'}}>English description</label>
                <textarea className="inputtext" name="descriptionenglish" value={descriptionenglish} onChange={handleChangetext}/>

                <label to="github" style={{color: 'var(--second-text-color)', fontWeight: 'bold'}}>Github</label>
                <input className="inputname" name='github' type="description" value={github} onChange={handleChangetext}/>

                <label to="link" style={{color: 'var(--second-text-color)', fontWeight: 'bold'}}>Link</label>
                <input className="inputname" name='link' type="description" value={link} onChange={handleChangetext}/>

                <label to="image" style={{color: 'var(--second-text-color)', fontWeight: 'bold'}}>Image</label>
                <input type="file" name="image" accept="image/*" onChange={handleFileChange}/>

                <input type="submit" value="Submit" className="boton" style={{marginLeft:'250px'}}></input>

            </form>
        </div>
    )
}

export {AdminCreateProjects};