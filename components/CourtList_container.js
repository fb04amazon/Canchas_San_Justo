
import Styles from "../styles/components/Courts_Display/CourtList_container.module.css"


import { Products_Context } from "../context/Provider_products.js"

import { useEffect, useState, useContext } from "react"


export default function CourtList_container({props}){

    const Producto_contexto = useContext(Products_Context);

    const [loading, setLoading] = useState(true)
    const [ClubImages] = useState([])

    useEffect(() => {

        if(props !== undefined){

        props.map(async (element) => {

            const image = await fetch("http://127.0.0.1:8080/clubDB/sendFiles/profilesPictures/" + element.club_owner.profilePicture, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + JSON.stringify(localStorage.getItem("JWT"))
            }
        })

        image.blob()

        .then(blob => {

            let clubImg = {
                owner: element.club_owner._id,
                blob: URL.createObjectURL(blob)
            }

            ClubImages.push(clubImg)
            
        })
        .catch(err => {
            console.log(err);
        })

        })
    }

        console.log(ClubImages)

        setTimeout(() => {
            setLoading(false);
        }, 500);
           
                
    }, [ClubImages])
    
    if(loading === true){

        return(
            <>
        
            </>
        )
        
    }
    else if(props === undefined){

        return(
            <>
            
            </>
        )
    }
    else{

        return(
            <>
            {props.map((Element, idx) => {

                let clubImg = ClubImages.filter(element => element.owner === Element.club_owner._id)

                return(
                    <article className={Styles.CourtContainer}>

                        <img src={Element.media[0].blob} className={Styles.images}/>

                        <div className={Styles.CourtInfo}>
                            
                            <h3>{Element.title}</h3>
                            
                            <div>
                                <img src={clubImg[0].blob} className={Styles.clubImg}/>
                                <p>{Element.club_owner.name}</p>
                            </div>
                            

                            <p>Precio: {Element.price}</p>

                        </div>
                    
                        

                    </article>
                )
                
            })}
            </>
        ) 
    }
   
}