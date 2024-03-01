
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import Navigation from "../../components/nav.js";

import { useState } from "react";
import { useRouter } from 'next/navigation';


//Styles for home

import Styles from "../../styles/home/Login.module.css"

export default function Login() {

    const [LoginURL] = useState("http://127.0.0.1:8080/");
    const router = useRouter();

    // INICIO DE SESION
    const fetchLogin = async (event) => {

        event.preventDefault();

        let userName = document.getElementById("username").value;
        let passWord = document.getElementById("password").value;

        let Data = {
            username : userName,
            password: passWord
        }

        await fetch(LoginURL + "userDB/LoginUser" , {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Data)
        })
        .then( async (res) => {

            if(res.status === 401){

                alert("usuario o contraseña incorrecto");
            }
            else if(res.status === 200){

                console.log(userName)

                await fetch(LoginURL + "userDB/cookies/set_cookies", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: userName
                    })
                })
                .then(async (res) => {

                    let token = await res.json();

                    localStorage.setItem("JWT", token);

                    setTimeout(() => {
                        router.push("/Main")
                    }, 2000); 

                })
                .catch((err) => {

                    console.log(err)
                })
                
            }

        }).catch((err) => {
            console.log(err);
        });

    }

    return(
        <>
        <Head>
            <title>Login</title>
        </Head>

        <Navigation />

        <section className={Styles.LoginContainer}>
            <article className={Styles.Login}>
                <div>
                    <h1>Tu club</h1>
                    <form>
                        <input type="text" placeholder="Username" id="username"/> <br/>
                        <input type="password" placeholder="Password" id="password"/> <br/>
                        <Link href="/Home/register"><button>Registrarse</button></Link>
                        <button onClick={fetchLogin}>Loguearse</button>
                    </form>
                </div>
            </article>
        </section>
        </>
    )
}