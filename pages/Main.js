
import { useState, useEffect, useContext } from "react";
import { Products_Context } from "../context/Provider_products.js";
import { User_Context } from "../context/Provider_user.js";

import Navigation from "../components/nav.js";
import CourtList_container from "../components/CourtList_container.js";

import Styles from "../styles/main/Main.module.css"


export default function Main (){

    const contexto_Products = useContext(Products_Context);
    const contexto_user = useContext(User_Context);

    const {User, Ask_For_Logging_user} = contexto_user
    const {Courts, Ask_For_Logging_products} = contexto_Products

    const [loading, setLoading] = useState(false);
    
    useEffect(() => {

        Ask_For_Logging_products(true);
        Ask_For_Logging_user(true);
  
        setTimeout(() => {
            setLoading(true);
        }, 500);    
            
    }, [])

    if(loading){

        return(
        <>
            <Navigation is_owner={User.typeUser}/>

            <article className={Styles.navOptions}>
                <button>
                    Canchas
                </button>
                <button>
                    Anuncios
                </button>
                <button>
                    Clubes
                </button>
            </article>

            <section className={Styles.MainContainer}>
                
                <CourtList_container props={Courts} />

            </section>
        
        </>
        )
    }
    else{
        return(
            <></>
        )
    }
    

}