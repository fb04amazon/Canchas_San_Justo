
import Styles from "../styles/components/Courts_Display/CourtList_container.module.css"


import { Products_Context } from "../context/Provider_products.js"
import { Clubs_Context } from "../context/Provider_clubs.js";

import { useEffect, useState, useContext } from "react"


export default function CourtList_container({host}){

    const Producto_contexto = useContext(Products_Context);
    const clubs_contexto = useContext(Clubs_Context);

    const {Courts} = Producto_contexto;
    const {Club_data} = clubs_contexto;

    const [ClubImages] = useState([])

    useEffect( () => {

        console.log(Courts);
        console.log(Club_data);

    }, [Courts])

    
    if(host === undefined){

        return(
            <>
            
            </>
        )
    }
    else if(host === "main"){

        return(
            <>
            <article className={Styles.CourtContainer_main}>
            {Courts.map((Element, idx) => {

                let clubs = Club_data.filter((data) => data.owner === Element.club_owner)
                
                console.log(clubs)

                return(
                    <article className={Styles.CourtContainer}>

                        <img src={Element.media[0].blob} className={Styles.images}/>

                        <div className={Styles.CourtInfo}>
                            
                            <h3>{Element.title}</h3>

                            <p>{Element.description}</p>

                            <p>Ciudad : {clubs[0].profile.city} Direccion: {clubs[0].profile.adress}</p>


                            <p>Precio: {Element.price}</p>

                        </div>

                    </article>
                )    
            })}
            </article>
            </>
        ) 
    }
   
}