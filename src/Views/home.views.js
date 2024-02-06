import React, { useEffect, useRef, useState } from "react";
import '../Styles/StylesHome.css';
import useMyContext from "../hooks/useAuth";
import { Banner } from "../Components/banner.components.js";
import fotoprofesional from "../Assets/fotoprofesional.jpeg";


function Home(){
    const {language} = useMyContext();
    const myref1 = useRef();
    const myref2 = useRef();
    const myref3 = useRef();
    const logoref1 = useRef();
    const logoref2= useRef();
    const logoref3 = useRef();
    const logoref4 = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];

            if(entry.isIntersecting){
                entry.target.classList.add('show');
            }
            else{
                entry.target.classList.remove('show');
            }
        })

        const observer2 = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  entry.target.classList.add("show");
                  observer.unobserve(entry.target); // Stop observing after it's revealed
                } else {
                    entry.target.classList.remove("show")
                }
              });
        })
        observer.observe(myref1.current);
        observer.observe(myref2.current);
        observer.observe(myref3.current);
        observer2.observe(logoref1.current);
        observer2.observe(logoref2.current);
        observer2.observe(logoref3.current);
        observer2.observe(logoref4.current);
    }, [])

    if(language){
        return(
            <>
                <Banner/>
                <div className="main">
                    <img className={`foto`} src={fotoprofesional}/>
                    <div id ={1} ref={myref1} className={'parrafo1 hidden1'}>
                        <h2>About me</h2>
                        <p>
                        I'm Ivan Lopez, a 24-year-old aspiring Programming Engineer hailing from the vibrant 
                        country of El Salvador. My educational journey has been centered around the world of 
                        technology and programming. I'm currently studying to become a Programming Engineer, 
                        and my relentless curiosity drives me to explore and master new technologies.
                        <br /><br />
                        I take great pride in my dedication to staying updated with the latest trends and 
                        innovations in the tech industry. I firmly believe that the key to success in this 
                        field is continuous learning. I am committed to expanding my skill set, embracing new challenges, 
                        and contributing my best to any project I undertake.
                        </p>
                    </div>
                    <p id={2} ref={myref2} className={`parrafo2 hidden2`}>
                    I embarked on my educational journey at Liceo Salvadoreño, a prestigious institution in El Salvador, 
                    where I laid the foundation for my academic pursuits. My passion for computers ignited at an early age, 
                    and by the tender age of 12, I had already delved into the captivating world of programming.

                    As I turned 18, I took a significant step forward by enrolling in the renowned Central American University 
                    "Jose Simeon Canas" in El Salvador, where I pursued a degree in Programming Engineering. This esteemed 
                    institution has played a pivotal role in shaping my expertise and knowledge in the field.

                    In my relentless pursuit of excellence, I've complemented my formal education with self-guided learning 
                    through platforms like Platzi and various online courses. These experiences have broadened my horizons and 
                    honed my skills in a diverse range of areas, including Distributed Systems, Data-Intensive Applications, 
                    Backend Development, Cryptography, and even Artificial Intelligence.

                    My educational journey reflects my unwavering commitment to continuous learning and my insatiable curiosity 
                    about the ever-evolving landscape of technology. I'm excited to leverage my diverse skills and knowledge to 
                    contribute meaningfully to the dynamic world of programming and engineering.
                    </p>
                    <div className="logoscontainer">
                    <h2> knowles about the following technologies: </h2>
                    <div className="logos">
                        <div ref={logoref1} className='hidden2' style={{transitionDelay:'100ms'}}>
                            <img className='logo' src='https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg'/>
                        </div>
                        <div ref={logoref2} className='hidden2' style={{transitionDelay:'200ms'}}>
                            <img className='logo' src='https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg'/>
                        </div>
                        <div ref={logoref3} className='hidden2' style={{transitionDelay: '400ms'}}>
                            <img className='logo' src='https://upload.wikimedia.org/wikipedia/commons/0/05/Go_Logo_Blue.svg'/>
                        </div>
                        <div ref={logoref4} className='hidden2' style={{transitionDelay: '600ms'}}>
                            <img className='logo' src='https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg'/>
                        </div>
                    </div>
                    </div>
                    <div id={3} ref={myref3} className={`parrafo3 hidden1`}>
                        <h2>Aptitudes</h2>
                        <p>
                        I possess a strong sense of discipline, which has been instrumental in achieving my goals and maintaining a 
                        structured approach to my work. My unwavering perseverance drives me to tackle challenges head-on, ensuring 
                        that I overcome obstacles and accomplish tasks efficiently. Curiosity fuels my continuous learning, propelling me 
                        to explore new technologies and stay ahead in the ever-evolving world of programming. I pride myself on fostering 
                        positive and collaborative relationships with coworkers, as I believe that teamwork and effective communication are 
                        key to achieving collective success. With a natural knack for adaptability, I readily embrace new opportunities and 
                        thrive in dynamic environments, making me a valuable asset to any team or project.
                        </p>
                    </div>
                </div>
            </>
        )
    }else{
        return(
            <>
                <Banner/>
                <div className="main">
                    <img className={`foto `} src={fotoprofesional}/>
                    <div id ={1} ref={myref1} className={'parrafo1 hidden1'}>
                        <h2>Acerca de mi</h2>
                        <p>
                        Soy Iván López, un aspirante a Ingeniero en Programación de 24 años, 
                        originario del vibrante país de El Salvador. Mi trayectoria educativa 
                        se centra en el mundo de la tecnología y la programación. Actualmente, 
                        me encuentro estudiando para convertirme en un Ingeniero en Programación, 
                        y mi incansable curiosidad me impulsa a explorar y dominar nuevas tecnologías.
                        <br/><br/>
                        Me enorgullezco de mi dedicación para mantenerme actualizado con las 
                        últimas tendencias e innovaciones en la industria tecnológica. Creo firmemente 
                        que la clave del éxito en este campo es el aprendizaje continuo. Estoy comprometido 
                        en expandir mis habilidades, abrazar nuevos desafíos y contribuir al 
                        máximo en cualquier proyecto que emprenda.
                        </p>
                    </div>
                    <p id={2} ref={myref2} className={`parrafo2 hidden2`}>
                    Mi viaje educativo comenzó en el Liceo Salvadoreño, una institución prestigiosa 
                    en El Salvador, donde establecí las bases para mis logros académicos. Mi pasión 
                    por las computadoras se encendió a temprana edad y, a la tierna edad de 12 años, 
                    ya me había sumergido en el cautivador mundo de la programación.Al cumplir 18 años, 
                    di un paso importante al inscribirme en la renombrada Universidad Centroamericana 
                    "José Simeón Cañas" en El Salvador, donde obtuve una licenciatura en Ingeniería en 
                    Programación. Esta distinguida institución desempeñó un papel fundamental en la 
                    formación de mi experiencia y conocimiento en el campo.En mi búsqueda incesante de 
                    la excelencia, complementé mi educación formal con aprendizaje autodidacta a través 
                    de plataformas como Platzi y varios cursos en línea. Estas experiencias ampliaron mis 
                    horizontes y perfeccionaron mis habilidades en una amplia gama de áreas, incluidos 
                    Sistemas Distribuidos, Aplicaciones de Alta Carga de Datos, Desarrollo Backend, 
                    Criptografía e incluso Inteligencia Artificial.Mi trayectoria educativa refleja mi 
                    compromiso inquebrantable con el aprendizaje continuo y mi insaciable curiosidad 
                    sobre el siempre cambiante panorama de la tecnología. Estoy emocionado por aprovechar 
                    mis diversas habilidades y conocimientos para contribuir de manera significativa al 
                    dinámico mundo de la programación e ingeniería.
                    </p>
                    <div className="logoscontainer">
                    <h2> conocimieno en las siguientes tecnologias </h2>
                    <div className="logos">
                        <div ref={logoref1} className='hidden2' style={{transitionDelay:'0ms'}}>
                            <img className='logo' src='https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg'/>
                        </div>
                        <div ref={logoref2} className='hidden2' style={{transitionDelay:'200ms'}}>
                            <img className='logo' src='https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg'/>
                        </div>
                        <div ref={logoref3} className='hidden2' style={{transitionDelay:'400ms'}}>
                            <img className='logo' src='https://upload.wikimedia.org/wikipedia/commons/0/05/Go_Logo_Blue.svg'/>
                        </div>
                        <div ref={logoref4} className='hidden2' style={{transitionDelay:'600ms'}}>
                            <img className='logo' src='https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg'/>
                        </div>
                    </div>
                    </div>
                    <div id={3} ref={myref3} className={`parrafo3 hidden1`}>
                        <h2>Aptitudes</h2>
                        <p>
                        Poseo un sólido sentido de la disciplina, que ha sido fundamental para alcanzar mis metas y mantener un enfoque 
                        estructurado en mi trabajo. Mi perseverancia inquebrantable me impulsa a enfrentar desafíos de manera decidida, 
                        asegurando que supere obstáculos y complete tareas de manera eficiente. La curiosidad alimenta mi aprendizaje continuo, 
                        impulsándome a explorar nuevas tecnologías y mantenerme al día en el siempre cambiante mundo de la programación. 
                        Me enorgullece fomentar relaciones positivas y colaborativas con mis compañeros de trabajo, ya que creo que el trabajo 
                        en equipo y la comunicación efectiva son clave para lograr el éxito colectivo. Con una habilidad natural para la adaptabilidad, 
                        abrazo con entusiasmo nuevas oportunidades y prospero en entornos dinámicos, lo que me convierte en un activo valioso 
                        para cualquier equipo o proyecto.
                        </p>
                    </div>
                </div>
            </>
        )
    }
}

export {Home};