
import { useState } from "react";

import Navigation from "../../components/nav";

import Styles from "../../styles/createClub/data.module.css"
import Image from "next/image";
import { useRouter } from "next/router";

import {Ask_user} from "../../context/Provider_user.js";

export default function Profile(){

    const router = useRouter()

    const [dataURL] = useState("http://127.0.0.1:8080/clubDB/")
    const [profileSrc, setprofileSrc] = useState("/images/Nav_icon/acceso.png");

    // esta funcion pone la foto de perfil elegida
    const handleInputFile = (e) => {
        
        e.preventDefault();

        let file = document.getElementById("inputProfile").files[0];

        console.log(file);

        setprofileSrc(URL.createObjectURL(file));

        const formData = new FormData();

        formData.set("MyFile", file);

        for (const pair of formData.entries()) {
            console.log(`${pair[0]}, ${pair[1]}`);
          }

    }

    const handleProfileData = async (e) => {

        e.preventDefault();

        let status;
        let user;

        let data = {
            name: document.getElementById("inputName").value,
            profilePicture: "",
            news: [],
            courts: [],
            profile: {
                phone: document.getElementById("inputPhone").value,
                city: document.getElementById("inputCity").value,
                adress: document.getElementById("inputAdress").value
            }
        };

        console.log(data)

        await fetch(dataURL + "postClubs", {
            method: "POST",
            headers:{
                "Authorization": "Bearer " + JSON.stringify(localStorage.getItem("JWT")),
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then( async (res) => {

            user = await res.json();
            console.log(user.id);
            status = res.status;

        })
        .catch((err) => {
            console.log(err);
        })

        if(status === 200){

            let profilePicture = document.getElementById("inputProfile").files[0];

            const formData = new FormData();

            formData.set("MyFile", profilePicture);

            await fetch(dataURL + "profilePictures/" + user.id, {
                method: "POST",
                body: formData
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })


            await fetch("http://127.0.0.1:8080/userDB/cookies/set_cookies", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + JSON.stringify(localStorage.getItem("JWT")),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username: user.username})
            })
            .then(async (res) => {
                console.log(res);
                let token = await res.json();

                localStorage.setItem("JWT", token);

            })
            .catch((err) => {
                console.log(err);
            })

            await fetch( "http://127.0.0.1:8080/userDB" + "/current", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + JSON.stringify(localStorage.getItem("JWT"))
                }
            })
            .then( async (res) => {
                await res.json().then( (user) => {
                    console.log(user);

                    localStorage.setItem("TypeUser", user.typeUser)

                    Ask_user(user);
                })
            })
            .catch( (err) => {
                console.log(err);
            })

            router.push("/MiClub");
        }
    }

    return(
        <>
            <Navigation />

            <section >

                <h1 className={Styles.title}>Informacion general del club</h1>

                <form className={Styles.formContainer}>
                    <div>
                        <label id="name"/> Nombre <br />
                        <input type="text" id="inputName"/>
                    </div>
                    <div className={Styles.profileDiv}>
                        <Image 
                        id="profileDiv"
                        src= {profileSrc}
                        width={220}
                        height={220}
                        alt="perfil"
                        /> <br />
                        <input type="file" id="inputProfile" onChange={handleInputFile}/>
                    </div>
                    <div>
                        <label id="phone"/> Telefono <br />
                        <input type="number" id="inputPhone"/>
                    </div>
                    <div className={Styles.cityDiv}>
                        <label id="city"/> Ciudad <br />
                        <input type="text" id="inputCity"/>
                    </div>
                    <div>
                        <label id="adress"/> Direccion <br />
                        <input type="text" id="inputAdress"/>
                    </div>

                </form>

                    <div className={Styles.btnContainer}>
                        <button onClick={handleProfileData}>Siguiente</button>
                    </div>
                        
            </section>
        </>
    )

}