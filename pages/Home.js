
import Navigation from "../components/nav.js"
import Styles from "../styles/home/Home.module.css"
import Image from "next/image.js"

export default function Home(){

    return(
        <>
            <Navigation is_owner={false}/>
            
            <section id="home_firstSection" className={Styles.firstSection}>

                <div className={Styles.title_paragraph_search}>
                    <h1 className={Styles.title_paragraph_search_child}>El mejor lugar para reservar una cancha o servicio de tu club mas cercano</h1>

                    <br />

                    <h3 className={Styles.title_paragraph_search_child}>una herramienta que busca eliminar las llamadas por telefono con el fin de lograr una manera mas facil de reservar o publicitar una cancha</h3>

                    <br />

                    <button className={Styles.title_paragraph_search_button}>Buscar</button>
                    <input type="text" className={Styles.title_paragraph_search_input}/>
                </div>

                <Image
                    src="/images/istockphoto-1368286980-170667a.webp"
                    width={500}
                    height={300}
                    alt="car"
                />

            </section>

        </>
    )
}