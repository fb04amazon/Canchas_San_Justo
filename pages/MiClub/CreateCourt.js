
import { useState, useContext } from "react";

import Navigation from "../../components/nav";
import Footer from "../../components/footer";

import Styles from "../../styles/miclub/CreateCourt/CreateCourt.module.css"
import Link from "next/link";
import { useRouter } from "next/router";

import { Clubs_Context } from "../../context/Provider_clubs";

export default function CreateCourt(){

    // router
    const router = useRouter();

    //club context
    const club = useContext(Clubs_Context);
    const {Club_data} = club;

    console.log(Club_data)

    const [CourtURL] = useState("http://127.0.0.1:8080/CourtsDB/");
    const [ClubURL] = useState("http://127.0.0.1:8080/clubDB/")

    // esto maneja los pasos que se manejaran para la creacion del producto
    const [Steps, setSteps] = useState(1);
    // Guarda la disciplina 
    const [Discipline, setDiscipline] = useState();
    // Cantidad de canchas 
    const [CourtQuantity, setCourtQuantity] = useState();
    // titulo de canchas
    const [CourtName, setCourtName] = useState();
    // precio de cancha
    const [CourtPrice, setCourtPrice] = useState();
    // descripcion de cancha opcional
    const [CourtDescription, setCourtDescription] = useState();
    // Array con los objectos de las canchas 
    const [CourtInfo, setCourtInfo] = useState([]);
    // array con toda la media data de imagenes 
    const [CourtMediaImg, setCourtMediaImg] = useState([]);
    // array con toda la media data de video
    const [CourtMediaVideo, setCourtMediaVideo] = useState([]);
    // media data con el documento a guardar
    const [CourtDocument, setCourtDocument] = useState();
    // Step finish, msj que van a aparecer en el loader
    const [loaderMsj, setLoaderMsj] = useState();
   
    // HandleSteps para controlar que paso se reenderiza y la preparacion del siguiente paso

    const HandleSteps = async (e) => {

        let id = e.target.id;

        if(id === "step1"){
            setDiscipline(document.getElementById("discipline").value);
            setCourtQuantity(document.getElementById("quantity").value)
            let CourtQuantity = document.getElementById("quantity").value;

            setTimeout(() => {

                for (let index = 0; index < CourtQuantity; index++) {
                
                let court = {
                    name: "",
                    schedule: [],
                    courtTime: "",
                    surface: "",
                    status: true
                }

                CourtInfo.push(court);
                
                }

                setSteps(2)

            }, 1000);
            
        }
        else if(id === "step2"){
            
            for (let index = 0; index < CourtInfo.length; index++) {
                const court = CourtInfo[index];
                
                let newSchedules = [];
                
                // primer grupo de schedules
                let first_schedules = document.getElementById("first_schedules" + index).children;

                console.log(first_schedules[0])

                    let obj1 = {
                        entry: first_schedules[0].value,
                        exit: first_schedules[1].value
                    }

                    newSchedules.push(obj1);

                // segundo grupo de schedules
                let second_schedules = document.getElementById("second_schedules" + index).children;

                let checked = document.getElementById("second_schedules" + index).previousElementSibling.checked;

                console.log(checked)

                console.log(checked)

                    if(checked){
                        let obj2 = {
                            entry: second_schedules[0].value,
                            exit: second_schedules[1].value
                        }

                        newSchedules.push(obj2);
                    }

                
                court.schedule = newSchedules;

                let surfaceElement = document.getElementById("surface" + index);

                court.surface = surfaceElement.value;

            }

            console.log(CourtInfo)

            setSteps(3)    
                
        }else if(id === "step3"){

            setSteps("finish");

            let mediaData = [];

            setLoaderMsj("Cargando datos de las canchas")

            // el nombre y tipo de imagenes
            for (let index = 0; index < CourtMediaImg.length; index++) {
                const element = CourtMediaImg[index];
                
                mediaData.push({
                    name: element.name,
                    type: element.type
                })
            }
            // el nombre y tipo de videos
            for (let index = 0; index < CourtMediaVideo.length; index++) {
                const element = CourtMediaVideo[index];

                mediaData.push({
                    name: element.name,
                    type: element.type
                }) 
            }

            if(CourtDocument !== undefined){
                mediaData.push({name: CourtDocument.name, type: CourtDocument.type});
            }
            

            let CourtFinalData = {
                "title": CourtName,
                "description": CourtDescription,
                "price": CourtPrice,
                "type": Discipline,
                "courts": CourtInfo,
                "media": mediaData
            }

            console.log( JSON.stringify(localStorage.getItem("JWT")));

            //el primer fetch crea la cancha 

            await fetch(CourtURL + "Post_dbproduct/" + Club_data._id, {
                method: "POST",
                headers:{
                    "Authorization": "Bearer " + localStorage.getItem("JWT"),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(CourtFinalData)

            })

            // el segundo fetch ubica la cancha en el club correspondiente

            // trae la cancha correspondiente
            let courtId;

            await fetch(CourtURL + "Get_dbproduct/" + Club_data._id + "/" + CourtFinalData.title, {
                method: "GET",
                headers:{
                    "Authorization": "Bearer " + JSON.stringify(localStorage.getItem("JWT")),
                    "Content-Type": "application/json"
                }
            })
            .then(async (res) => {
                let response = await res.json();

                courtId = response._id;

            })
            .catch((err) => {
                console.log(err);
            })
           
            
            // metodo para poner la cancha dentro de del club
            await fetch(ClubURL + "updateClub/" + Club_data._id + "/" + courtId, {
                method: "PUT",
                headers:{
                    "Content-Type": "application/json"
                }
            })
            .then(async (res) => {

                let response = await res.json();
                console.log(response);

            })
            .catch((err) => {
                console.log(err)
            })

            setLoaderMsj("recopilando datos de las imagenes");

            //metodo para guardar las imagenes

            let mediaArray = CourtMediaImg.concat(CourtMediaVideo);

            if(CourtDocument !== undefined){
                mediaArray.push(CourtDocument);
            }
            
            console.log(mediaArray);

            mediaArray.forEach(async (element) => {
                
                console.log(element)

                const formData = new FormData();

                formData.set("MyFile", element.file);

                await fetch(CourtURL + "courtsMedia/" + CourtName + "/" + element.type, {
                    method: "POST",
                    headers:{
                        "Authorization": "Bearer " + localStorage.getItem("JWT"),
                    },
                    body: formData
                })
                .then((res) => {
                    console.log(res.json());
                })    
                .catch((err) => {
                    console.log(err)
                })
            })

            setTimeout(() => {
                setLoaderMsj("el proceso esta terminando");
            }, 2000);

            setTimeout(() => {
                router.push("/MiClub")
            }, 5000);
          
        }else if(e.target.className === "back"){
            setSteps(1)
            setCourtInfo([]);
        }
    }

    // step 1

    const HandleDiscipline = (e) => {

        console.log(e.target.value);
        setDiscipline(e.target.value);
    }

    const HandleQuantity = (e) => {

        console.log(e.target.value);
        setCourtQuantity(Number(e.target.value))
    }

    const HandleTitle = (e) => {

        console.log(e.target.value)
        setCourtName(e.target.value);
    }

    const HandlePrice = (e) => {

        console.log(e.target.value);
        setCourtPrice(e.target.value);
    }

    const HandleDescription = (e) => {

        console.log(e.target.value);
        setCourtDescription(e.target.value)
    }

    // step 2

    const HandleCourtsInput = (e) => {

        // id del obj a modificar
        let id = e.target.parentNode.parentNode.id

        // tipo de dato
        let typeOfInput = e.target.id;

        if(typeOfInput === "name"){

            CourtInfo[id].name = e.target.value;

        }
        else if(typeOfInput === "courtTime"){

            CourtInfo[id].courtTime = e.target.value;

            console.log(CourtInfo[id].courtTime)
        }

    }

    // funcion para activar/desactivar el segundo turno
    const Enable_SecondShift = (e) => {


        let checked = e.target.checked;

        let elements = e.target.nextElementSibling.children;
        
        
        if(checked === true){

            for (let index = 0; index < elements.length; index++) {

                const schedule = elements[index];

                schedule.removeAttribute("disabled");
                
            }

        }
        else{

            for (let index = 0; index < elements.length; index++) {

                const schedule = elements[index];

                schedule.setAttribute("disabled", true);
                
            }

        }

    }

    // Funcion necesaria para armar el form del paso 2

    const HandleForm_Step2 = () => {

        let TypeImg = () =>{
                            
                            if(Discipline === "Paddel"){
                                return(
                                    <img className={Styles.CourtImage} src="/images/courtsImg/court_pitch_field_sport_padel_crystal_wall_icon_141863.png"/>
                                )
                            }
                            else if(Discipline === "Tenis"){
                                return(
                                    <img className={Styles.CourtImage} src="/images/courtsImg/pista-de-tenis.png"/>
                                )
                            }
                            else if(Discipline === "Futbol 5" || Discipline === "Futbol 7" || Discipline === "Futbol 11"){
                                return(
                                    <img className={Styles.CourtImage} src="/images/courtsImg/cancha-de-futbol.png"/>
                                )
                            }

        }

        let Surface = ({id}) =>{

            if(Discipline === "Paddel"){
                return(
                    <select className="surface" id={id}>
                        <option>cemento</option>
                        <option>cesped</option>
                        <option>cesped sintetico</option>
                    </select>
                )
            }
            else if(Discipline === "Tenis"){
                return(
                    <select className="surface" id={id}>
                        <option>cemento</option>
                        <option>arcilla</option>
                        <option>cesped</option>
                    </select>
                )
            }
            else if(Discipline === "Futbol 5" || Discipline === "Futbol 7" || Discipline === "Futbol 11"){
                return(
                    <select className="surface" id={id}>
                        <option>cesped</option>
                        <option>cesped sintetico</option>
                        <option>cemento</option>
                    </select>
                )
            }
        }

        let articles = [];
 
        for (let index = 0; index < CourtQuantity; index++) {
            
            articles.push(
                <article className={Styles.Courts}>
                    <div className={Styles.ImgDiv}>
                        <TypeImg />          
                    </div>
                    <div className={Styles.inputsDiv} id={index}>

                        <div>
                            <input type="text" placeholder="Nombre de la cancha" id="name"  onChange={HandleCourtsInput}/>
                        </div>
                        <br />
                        <div className={Styles.schedules}>
                            <label name="schedules"/>horarios de atencion
                                <>
                                <div id={"first_schedules" + index}>
                                    <input type="time" placeholder="hs" className="schedule1" onChange={HandleCourtsInput}/>
                                    <input type="time" placeholder="hs" className="schedule1" onChange={HandleCourtsInput}/>
                                </div> 

                                <input type="checkbox" className="enabledSecondShift" onClick={Enable_SecondShift}/> Habilitar doble turno

                                <div id={"second_schedules" + index}>
                                    <input type="time" placeholder="hs" className="schedule2" onChange={HandleCourtsInput} disabled/>
                                    <input type="time" placeholder="hs" className="schedule2" onChange={HandleCourtsInput} disabled/>
                                </div>
                                </>        
                        </div> 
                        
                        <br />
                            <div>
                                <label />Duracion de turno
                                <input type="time" placeholder="hs" id="courtTime" onChange={HandleCourtsInput}/>
                            </div>
                        <br />
                            <div>
                                <label /> Superficie de terreno
                                <Surface id={"surface" + index}/>
                            </div>

                    </div>
                </article>
            )
            
        }
        
        return <>{articles}</>
                
            
    }

    // step 3

    const Generate_ImgInputs = () => {

        let ImgInputs = [];

        for (let index = 0; index < 4; index++) {
            
            ImgInputs.push(

                <div id={index}>
                    <label>Seleccionar una imagen</label> <br/>
                    <input type="file" accept="image/*" onChange={Handle_ImgInputs}/>
                </div>
            )
            
        }

        return <>{ImgInputs}</>
        

    }

    // manejo de inputs de imagenes, videos y documento

    const Handle_ImgInputs = (e) => {

        let file = e.target.files[0];
        let parent = e.target.parentNode;
        let label = e.target.parentNode.firstChild;
        let UrlImage = document.createElement("img");
        let url = URL.createObjectURL(file);

        let isCreated = CourtMediaImg.some( (element) => element.id === parent.id);

        console.log(file.name);

        if(isCreated === true){
            
            let obj = {
                id: parent.id,
                name: file.name,
                file: file,
                type: "images"
            }

            let index = CourtMediaImg.findIndex(element => element.id === parent.id);

            CourtMediaImg.splice(index, 1, obj)


        }else{

            let obj = {
                id: parent.id,
                name: file.name,
                file: file,
                type: "images"
    
            }
    
            CourtMediaImg.push(obj);

        }
        
        
        //setear el url de la imagen en el doc img
        UrlImage.src = url;
        UrlImage.className = "UrlImage";

        parent.replaceChild(UrlImage, label);

    }

    const Handle_VideoInputs = (e) => {

        let file = e.target.files[0];
        let parent = e.target.parentNode;
        let label = e.target.parentNode.firstChild;
        let UrlVideo = document.createElement("video");
        let url = URL.createObjectURL(file);

        let isCreated = CourtMediaVideo.some( (element) => element.id === parent.id);

        console.log(file.name);

        if(isCreated === true){
            
            let obj = {
                id: parent.id,
                name: file.name,
                file: file,
                type: "videos"
            }

            let index = CourtMediaVideo.findIndex(element => element.id === parent.id);

            CourtMediaVideo.splice(index, 1, obj)


        }else{

            let obj = {
                id: parent.id,
                name: file.name,
                file: file,
                type: "videos"
            }
    
            CourtMediaVideo.push(obj);

        }
        
        
        //setear el url de la imagen en el doc img
        UrlVideo.src = url;
        UrlVideo.controls = true;
        UrlVideo.className = "Urlvideo";

        parent.replaceChild(UrlVideo, label);

    }

    const Handle_DocumentInput = (e) => {

        let file = e.target.files[0];

        setCourtDocument({name: file.name, file: file, type:"documents"})
    }


    if(Steps === 1){
    return(
        <>
        
            <Navigation />

            <section className={Styles.CreateCourt_container}>

                <div className={Styles.CreateCourt} style={{height: "80vh"}}>

                    <div className={Styles.progress}>
                        <button style={{backgroundColor: "chartreuse"}}><li>paso 1</li></button>
                        <img src="/images/flecha-correcta.png"/>
                        <button><li>paso 2</li></button>
                        <img src="/images/flecha-correcta.png"/>
                        <button><li>Paso 3</li></button>
                    </div>

                    <h1>Crear cancha</h1>

                    <form className={Styles.form1}>
                        <input type="text" placeholder="Titulo" onChange={HandleTitle}/>

                        <br />

                        <div>
                        <label name="courts"/> Disciplina: <br />
                        <select onChange={HandleDiscipline} id="discipline">
                            <option value="Paddel">Paddel</option>
                            <option value="Tenis">Tenis</option>
                            <option value="Futbol 5">Futbol 5</option>
                            <option value="Futbol 7">Futbol 7</option>
                            <option value="Futbol 11">Futbol 11</option>
                        </select>
                        </div>

                        <br />

                        <input type="number" placeholder="Precio" onChange={HandlePrice}/>

                        <br />

                        <div>
                        <label name="quantityCourts"/> Cantidad de canchas: <br />
                        <select onChange={HandleQuantity} id="quantity">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>
                        </div>
                        <br />

                        <textarea name="textarea" rows="10" cols="150" placeholder="Crea una pequeña descripcion de tus canchas" onChange={HandleDescription}></textarea>
                    </form>

                    <div className={Styles.btnContainer}>
                        <Link href={"/MiClub"}><button>Cancelar</button></Link>
                        <button id="step1" onClick={HandleSteps}>Siguiente</button>
                    </div>
                        
                </div>

            </section>


            <Footer />

        </>
    )}
    else if(Steps === 2){
        return(
            <>
            
                <Navigation />

                <section className={Styles.CreateCourt_container}>

                <div className={Styles.CreateCourt}>

                    <div className={Styles.progress}>
                        <button><li>paso 1</li></button>
                        <img src="/images/flecha-correcta.png"/>
                        <button style={{backgroundColor: "chartreuse"}}><li>Paso 2</li></button>
                        <img src="/images/flecha-correcta.png"/>
                        <button><li>Paso 3</li></button>
                    </div>

                    <h1>Crear cancha</h1>

                    <form className={Styles.form2}>
                        <HandleForm_Step2 />
                    </form>

                    <div className={Styles.btnContainer2}>
                        <button className="back" onClick={HandleSteps}>Volver</button>
                        <button id="step2" onClick={HandleSteps}>Siguiente</button>
                    </div>
                        
                </div>

            </section>


                <Footer />
            
            </>
        )
    }
    else if(Steps === 3){
        
        return(

            <>
                <Navigation />

                    <section className={Styles.CreateCourt_container}>

                        <div className={Styles.CreateCourt} style={{height: "max-content"}}>

                        <div className={Styles.progress}>
                            <button><li>paso 1</li></button>
                            <img src="/images/flecha-correcta.png"/>
                            <button><li>Paso 2</li></button>
                            <img src="/images/flecha-correcta.png"/>
                            <button style={{backgroundColor: "chartreuse"}}><li>Paso 3</li></button>
                        </div>
                            
                            <div id="Images" className={Styles.MediaData_Divs}>

                                <h3>Imagenes de las canchas</h3>

                                <div className={Styles.mediaInputs_Container}>

                                    <Generate_ImgInputs />

                                </div>

                            </div>

                            <div id="video" className={Styles.MediaData_Divs}>

                                <h3>Video de las canchas</h3>

                                <div className={Styles.mediaInputs_Container}>

                                    <div id="0">
                                        <label>Seleccionar video</label> <br/>
                                        <input type="file" accept="video/*" onChange={Handle_VideoInputs}/>
                                    </div>
                                    <div id="1">
                                        <label>Seleccionar video</label> <br/>
                                        <input type="file" accept="video/*" onChange={Handle_VideoInputs}/>
                                    </div>
                                    
                                </div>

                            </div>

                            <div id= "document" className={Styles.MediaData_Divs}>

                                <h3>Documentos</h3>

                                <div className={Styles.mediaInputs_Container}>

                                    <div>
                                        <label>Seleccionar documento</label> <br/>
                                        <input type="file" accept=".pdf,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={Handle_DocumentInput}/>
                                    </div>
                                   
                                </div>

                            </div>

                        </div>

                        <div className={Styles.btnContainer2}>
                            <button className="back" onClick={HandleSteps}>Volver</button>
                            <button id="step3" onClick={HandleSteps}>Siguiente</button>
                        </div>

                    </section>

                <Footer />
            </>
        )
    }
    else if(Steps === "finish"){

        return(
            
            <>
            
                <Navigation />

                    <section className={Styles.LoaderContainer}>

                        <h2>Espere mientras se completa el pedido</h2>

                        <article className={Styles.LoaderFunction}>

                            <p>{loaderMsj}</p>

                            <div className={Styles.loader}></div>

                        </article>

                    </section>

                <Footer />

            </>
        )
    }


}


