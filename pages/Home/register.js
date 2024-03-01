
import Navigation from "../../components/nav.js";
import Styles from "../../styles/home/Register.module.css"
import Link from "next/link.js";

import { useState } from "react";

export default function register(){

    const [RegisterURL] = useState("http://localhost:8080/");

    //
    const fetchRegister = async (e) => {

        e.preventDefault();

        let userName = document.getElementById("username").value;
        let passWord = document.getElementById("password").value;
        let email = document.getElementById("email").value;

        let UserData = {
            username: userName,
            password: passWord,
            email: email
        }

        console.log(UserData)

        await fetch(RegisterURL + "userDB/Post_dbusers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(UserData)
        })
        .then( async (res) => {
            
            let Res = await res.json();

            console.log(Res);

        })
        .catch( (err) => {
            console.log(err);
        })

    }

    return(
        <>
        <Navigation />

        <section className={Styles.registerContainer}>

            <article className={Styles.register}>
                
                <h1>Tu Club</h1>
 
                <form className={Styles.registerForm}>
                    <div>                        
                        <input type="text" name="username" id="username" placeholder="nombre de usuario"/>
                    </div>
                    <br />
                    <div>
                        <input type="password" name="password" id="password" placeholder="contraseña"/>
                    </div>
                    <br />
                    <div>
                        <input type="email" name="email" id="email" placeholder="email"/>
                    </div>
                    <br />

                    <button onClick={fetchRegister}>Registrarme</button>
                    <Link href="/Home/login"><button>Volver a iniciar sesion</button></Link>

                </form>

            </article>

        </section>

        </>
    )

}