
import { useState, useEffect} from "react";

import Navigation from "../components/nav.js";
import Footer from "../components/footer.js"
import CourtList_container from "../components/CourtList_container.js";

import Styles from "../styles/main/Main.module.css"


export default function Main (){

    const [loading, setLoading] = useState(false);
   
    useEffect(() => {

      setTimeout(() => {
        setLoading(true)
      }, 2000);
            
    }, [loading]);


    if(loading){

        return(
        <section className={Styles.MainContainer}>
            
            <article className={Styles.Main_title}>
                
                <Navigation/>

                <h1>Encontra la cancha que estas buscando</h1>
                
                <button id={Styles.searchBtn}>Buscar canchas</button>
                
            </article>

            <article className={Styles.Banner}>

            </article>

            <section className={Styles.Main_CourtsDiv}>      

                    <article className={Styles.paragraph_court}>

                        <h2>Estas son algunas de las canchas que estan disponibles</h2>

                        <p>Cada cancha puede ser reservada para cualquier dia de la semana</p>
                        

                    </article>

                    <CourtList_container host={"main"}/>

            </section>

            <Footer/>
        
        </section>
        )
    }
    else{
        return(
            <></>
        )
    }
    

}