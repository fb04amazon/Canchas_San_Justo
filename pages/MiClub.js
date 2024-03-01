
import { useState, useEffect, useContext } from "react";

import Navigation from "../components/nav";
import Footer from "../components/footer";
import Options from "../components/options";
import CourtList_container from "../components/CourtList_container";
import { Clubs_Context } from "../context/Provider_clubs";

import Styles from "../styles/miclub/miclub.module.css"


export default function MiClub(){

    const contexto_club = useContext(Clubs_Context);

    const {Ask_for_clubData, Club_data, Ask_for_clubImage, Club_Image, Push_Court, Court_club} = contexto_club

    const [clubData, setClub_data] = useState(Club_data);
    const [Image, setImage] = useState(Club_Image);
    const [clubURL] = useState("http://127.0.0.1:8080/clubDB/");
    const [courtURL] = useState("http://127.0.0.1:8080/CourtsDB/");
    const [Loading, setLoading] = useState(false);
    const [SelectActivity, setSelectActivity] = useState("Noticias");
    const [courts, setcourts] = useState(Court_club);

    useEffect(() => {

        console.log(clubData, Image)

        if(clubData === undefined){

        fetch(clubURL + "/getClub", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + JSON.stringify(localStorage.getItem("JWT"))
            }
        })
        .then(async (res) => {
        
            let response = await res.json();

            Ask_for_clubData(response);
            setClub_data(response);

            //fetch: llamada para traer la imagen de perfil del club
            const image = await fetch(clubURL + "sendFiles/profilesPictures/" + response.profilePicture, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + JSON.stringify(localStorage.getItem("JWT"))
                }
            })

            image.blob()
            .then(blob => {
                setImage(URL.createObjectURL(blob));

                Ask_for_clubImage(URL.createObjectURL(blob));
            })
            .catch(err => {
                console.log(err);
            })

            

            if(response.courts.length !== 0){

                response.courts.forEach(async (element) => {
                    
                    let court = await fetch(courtURL + "court/" + element.court, {
                        method: "GET",
                        headers:{
                            "Authorization": "Bearer " + JSON.stringify(localStorage.getItem("JWT")),
                            "Content-Type": "application/json"
                        }
                    })

                    court.json()
                    .then((res) => {

                        res.media.forEach(async (element) => {

                            let media = await fetch(courtURL + "sendFiles/" + res.title + "/" + element.type + "/" + element.name, {
                                method: "GET",
                                headers:{
                                    "Authorization": "Bearer " + JSON.stringify(localStorage.getItem("JWT")),
                                    "Content-Type": "application/json"
                                }
                            })

                            media.blob()
                            .then((blob) => {

                                element.blob = URL.createObjectURL(blob);

                                console.log(element);

                            })
                            .catch((err) => {

                                console.log(err); 

                            })


                        })

                        console.log(res);
                        Push_Court(res);

                    })
                    .catch((err) => {

                        console.log(err);

                    })

                });

            }

            setcourts(Court_club);

            setTimeout(() => {
                setLoading(true)
            }, 500);

        })
        .catch((err) => {

            console.log(err)

        })
        }else{

            setTimeout(() => {
                setLoading(true)
            }, 500);
        
        }

    }, [])

    const showOptions = (e) => {

        if(e.target.textContent === "Canchas" ||  e.target.textContent === "Torneos"){

            
            setSelectActivity(e.target.textContent)
            
        }
        else{
            
            
            setSelectActivity("Noticias")

        }

    }


    if(Loading === true && SelectActivity === "Noticias"){

        return(

        <>

            <Navigation />

            <section className={Styles.MiClub_container}>

                <article className={Styles.MiClub_header}>
                    
                    <div className={Styles.ProfileImg}>
                        <img src={Image} className={Styles.img}></img>
                    </div>

                    <div className={Styles.nameContainer}>
                        <h1>{clubData.name}</h1>
                    </div>

                    <div className={Styles.headerButtons}>
                        <button>Editar perfil</button>
                    </div>

                </article>

                <article className={Styles.Activity_Section}>

                    <div className={Styles.Activity}>

                        <button onClick={showOptions}>Canchas</button>
                        <button onClick={showOptions}>Noticias</button>
                        <button onClick={showOptions}>Torneos</button>

                    </div>

                    {SelectActivity === "Canchas" || SelectActivity === "Torneos" ? <Options props={SelectActivity}/> : <></>}

                    <div className={Styles.Content_Section}>



                    </div>
                    

                </article>

            </section>

            <Footer />

        </>
    )
    }
    else if(Loading === true && SelectActivity === "Canchas"){

        return(

        <>

            <Navigation />

            <section className={Styles.MiClub_container}>

                <article className={Styles.MiClub_header}>
                    
                    <div className={Styles.ProfileImg}>
                        <img src={Image} className={Styles.img}></img>
                    </div>

                    <div className={Styles.nameContainer}>
                        <h1>{clubData.name}</h1>
                    </div>

                    <div className={Styles.headerButtons}>
                        <button>Editar perfil</button>
                    </div>

                </article>

                <article className={Styles.Activity_Section}>

                    <div className={Styles.Activity}>

                        <button onClick={showOptions}>Canchas</button>
                        <button onClick={showOptions}>Noticias</button>
                        <button onClick={showOptions}>Torneos</button>

                    </div>

                    {SelectActivity === "Canchas" || SelectActivity === "Torneos" ? <Options props={SelectActivity}/> : <></>}

                    <div className={Styles.Content_Section}>

                        <CourtList_container props={courts}/>

                    </div>
                    

                </article>

            </section>

            <Footer />

        </>
    )
    }
    else{

        <>
            <Navigation />
            
            <Footer />
        </>
        

    }

    

}