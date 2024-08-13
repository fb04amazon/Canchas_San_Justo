
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

import Navigation from "../../components/nav";
import Footer from "../../components/footer";

import { Clubs_Context } from "../../context/Provider_clubs";

import Styles from "../../styles/miclub/CreateTournament/CreateTournament.module.css"

export default function CreateTournament(){

    const router = useRouter();

    const contexto_club = useContext(Clubs_Context);

    const {Club_data} = contexto_club

    console.log(Club_data)

    //Server-URL
    const [TournamentURL] = useState("http://127.0.0.1:8080/TournamentDB/")

    // LoadingPage
    const [Loading, setLoading] = useState(true);

    // seteo de step
    const [Step, setStep] = useState(1);

    // Data del torneo primer step
    const [Tournament_Step_1] = useState({
        TournamentType: "",
        TournamentName: "",
        TournamentDiscipline: "",
        TournamentDescription: "",
        TournamentStartDate: "",
        TournamentRegistrationClosing: ""
    })

    const [TournamentType, setTournamentType] = useState();
    
    // Data del torneo segundo step
    const [Tournament_Step_2] = useState({
        TournamentGender: "",
        TournamentCategory: "",
        TournamentAge1: "",
        TournamentAge2: "",
        number_of_participants: "",
        roundtrip_phase: {
            Round_Trip_phase1: "",
            Round_Trip_phase2: "",
            quantity_of_teams_in_groupStage: "",
            they_advance: "",
            third_advance: "",
            consolation: "",
            third_and_four_place: "",
            stats_pairings: ""
        },
        league: {
            round_trip: "",
            tiebreaker_match: ""
        },
        playoffs: {
            round_trip: "",
            consolation: "",
            third_and_four_place: "",
            winner_and_loser_secondRound: ""
        },
        Discipline_Tenis_or_paddel: {
            team_modality: "",
            type_of_inscription: "",
            match_duration: "",
            point_of_gold: ""
        },
        Discipline_Futbol: {
            match_duration: ""
        }
    })

    const [TournamentPassword, setTournamentPasssword] = useState(false); 

    // dato del torneo tercer step
    const [Tournament_Step_3] = useState({
        organizational_Club: [],
        tournament_Regulations: "",
        tournament_Picture: "",
        tournament_Regulations_Document: "",
        tournament_Contacts: {
            person_of_contact: "",
            tel_of_contact: "",
            email_of_contact: ""
        },
        public_Tournament: "",
        private_Tournament: "",
        Tournament_password: ""
    })

    const [password, setpassword] = useState();
    const [PictureTournament, setPictureTournament] = useState()

    const [OrganizationClubs, setOrganizationClubs] = useState();
    const [OrganizationDiv, setOrganizationDiv] = useState(false);

    // dato del torneo cuarto step
    const [methodPayment, setmethodPayment] = useState();

    const [TournamentPayment] = useState({
        InscriptionType: "",
        Price: "",
        cash: "",
        cbu: "",
        alias: ""
    });

    const [Tournament_Step_4] = useState({
        form_in_inscription:{
            club_Badge:{
                SelectRequirements: "",
                PrivacyRequirements: "",
                ModifiyRequirements: ""
            },
            Picture_of_participants:{
                SelectRequirements: "",
                PrivacyRequirements: "",
                ModifiyRequirements: ""
            },
            Email_of_team:{
                SelectRequirements: "",
                PrivacyRequirements: "",
                ModifiyRequirements: ""
            },
            Tel_of_team:{
                SelectRequirements: "",
                PrivacyRequirements: "",
                ModifiyRequirements: ""
            },
            Id_of_participants:{
                SelectRequirements: "",
                PrivacyRequirements: "",
                ModifiyRequirements: ""
            },
            Age_of_participants:{
                SelectRequirements: "",
                PrivacyRequirements: "",
                ModifiyRequirements: ""
            },
            Birthdate_of_participants:{
                SelectRequirements: "",
                PrivacyRequirements: "",
                ModifiyRequirements: ""
            },
            Dorsal_of_participants:{
                SelectRequirements: "",
                PrivacyRequirements: "",
                ModifiyRequirements: ""
            },
            Team_role:{
                SelectRequirements: "",
                PrivacyRequirements: "",
                ModifiyRequirements: ""
            },
            position_of_participants:{
                SelectRequirements: "",
                PrivacyRequirements: "",
                ModifiyRequirements: ""
            }
        },
        message_in_description: ""
    })

    const [Tournament_Step_4_customFields, setTournament_Step_4_customFields] = useState();

    //Mensaje del loader
    const [loaderMsj, setLoaderMsj] = useState("Validando datos del torneo");

    // Manejo de pasos

    const Handle_Steps = async (e) => {

        if(e.target.id === "step1"){
            setStep(2);
        }
        else if(e.target.id === "step2"){
            setStep(3);
        }
        else if(e.target.id === "step3"){
            setStep(4);
        }
        else if(e.target.id === "finish"){

            setStep(5);

            let type_name_discipline_description_date = {
                ...Tournament_Step_1
            }
            let configuration_of_tournament = {
                ...Tournament_Step_2
            }
            let organizationalClub_regulations_contacts_image_privacy_password = {
                ...Tournament_Step_3
            }
            let payments_fieldOfInscription_message_of_inscription = {
                ...Tournament_Step_4,
                ...TournamentPayment
            }

            let tournament_data = {
                type_name_discipline_description_date,
                configuration_of_tournament,
                organizationalClub_regulations_contacts_image_privacy_password,
                payments_fieldOfInscription_message_of_inscription
            }

            console.log(tournament_data);

            setTimeout(() => {
                setLoaderMsj("Enviando la informacion")   
            }, 2000);

            await fetch(TournamentURL + Club_data._id + "/CreateTournament", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + JSON.stringify(localStorage.getItem("JWT")),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(tournament_data)
            })
            .then(async (res) => {
                console.log(await res.json())

                setLoaderMsj("Finalizando");

                setTimeout(() => {
                    router.push("/MiClub");
                }, 2000);
                
            })
            .catch( err => console.log(err))

        }
    }

    //Handle inputs step 1

    const Handle_tournament_type = (e) => {

        console.log(e.target.id)
        Tournament_Step_1.TournamentType = e.target.id;
        setTournamentType(e.target.id);

    }

    const Handle_tournament_name = (e) => {

        Tournament_Step_1.TournamentName = e.target.value;
    }

    const Handle_tournament_discipline = (e) => {

        Tournament_Step_1.TournamentDiscipline = e.target.value;
    }

    const Handle_tournament_description = (e) => {

        Tournament_Step_1.TournamentDescription = e.target.value;
    }

    const Handle_tournament_startDate = (e) => {

        Tournament_Step_1.TournamentStartDate = e.target.value;
    }

    const Handle_tournament_RegistrationClosing = (e) => {

        Tournament_Step_1.TournamentRegistrationClosing = e.target.value;
    }

    //Handle inputs step 2

    const Handle_select_and_inputs = (e) => {

        let key = JSON.stringify(e.target.id);
        let value = e.target.value;
        let obj_key = e.target.className;

        console.log(obj_key)

        if(obj_key !== ""){
        
            switch (obj_key) {

                case "Discipline_Tenis_or_paddel":

                    Tournament_Step_2.Discipline_Tenis_or_paddel[JSON.parse(key)] = value
                
                    break
                case "Discipline_Futbol":
                    
                    Tournament_Step_2.Discipline_Futbol[JSON.parse(key)] = value

                    break
                case "League":

                    Tournament_Step_2.league[JSON.parse(key)] = value

                    break
                case "roundtrip_phase":

                    Tournament_Step_2.roundtrip_phase[JSON.parse(key)] = value

                    break
                case "playoffs":

                    Tournament_Step_2.playoffs[JSON.parse(key)] = value

                    break
            }
        }
        else if(key === "TournamentAge1" || key === "TournamentAge2"){

            Tournament_Step_2[JSON.parse(key)] = value;
        }
        else{
            
            Tournament_Step_2[JSON.parse(key)] = value;
        }

        console.log(Tournament_Step_2);

    }

    const HandleTournamentPassword = (e) => {

        if(e.target.value === "no"){
            setTournamentPasssword(false);
        }else if(e.target.value === "si"){
            setTournamentPasssword(true);
        }
    }

    const HandleTournamentPictures = (e) => {

        let file = e.target.files[0];
        console.log(file);

        setPictureTournament(URL.createObjectURL(file));
        Tournament_Step_3.tournament_Picture = file.name;

        console.log(Tournament_Step_3);
    }

    //Handle inputs step 3

    const Handle_select_and_inputs_step3 = (e) => {
        let key = JSON.stringify(e.target.id);
        let value = e.target.value;
        let obj_key = e.target.className;

        if(obj_key === "tournament_Contacts"){

            Tournament_Step_3.tournament_Contacts[JSON.parse(key)] = value;

        }
        else if(e.target.id === "password"){

            setpassword(value);

        }
        else if(e.target.id === "confirmPassword"){

            console.log(obj_key)

            if(password === value){

                Tournament_Step_3.Tournament_password = value;

            }

        }
        else if(e.target.id === "organizational_Club"){
            
            if(OrganizationDiv === false){

                setOrganizationDiv(true);

            }else{

                setOrganizationDiv(false);

            }
        }
        else if(e.target.id === "Org_Clubs"){
            
            setOrganizationDiv(false);

            let tagName = e.target.tagName;

            if(tagName === "IMG"){

                let club = Tournament_Step_3.organizational_Club.filter((names) => names === e.target.nextSibling.nextSibling.textContent);

                if(club.length === 0){
                    Tournament_Step_3.organizational_Club.push(e.target.nextSibling.nextSibling.textContent);
                }
                else{
                    Tournament_Step_3.organizational_Club.map((element, index) => {
                    
                        if(element === e.target.nextSibling.nextSibling.textContent){
                            Tournament_Step_3.organizational_Club.splice(index, 1);
                        }
                        
                    });
                } 
                
                
            }
            else if(tagName === "LABEL"){

                let club = Tournament_Step_3.organizational_Club.filter((names) => names === e.target.textContent);

                if(club.length === 0){
                    Tournament_Step_3.organizational_Club.push(e.target.textContent);
                }
                else{
                    Tournament_Step_3.organizational_Club.map((element, index) => {
                    
                        if(element === e.target.textContent){
                            Tournament_Step_3.organizational_Club.splice(index, 1);
                        }
                        
                    });
                }

                
            }
            else{

                let club = Tournament_Step_3.organizational_Club.filter((names) => names === e.target.lastChild.textContent);

                if(club.length === 0){
                    Tournament_Step_3.organizational_Club.push(e.target.lastChild.textContent);
                }
                else{
                    Tournament_Step_3.organizational_Club.map((element, index) => {
                    
                        if(element === e.target.lastChild.textContent){
                            Tournament_Step_3.organizational_Club.splice(index, 1);
                        }
                        
                    });
                }   

                
            }

            setTimeout(() => {
                setOrganizationDiv(true);
            }, 10);
        }
        else{

            Tournament_Step_3[JSON.parse(key)] = value;

        }
       
        console.log(Tournament_Step_3)
        
    }

    //Handle inputs step 4
    const Handle_methodPayment = (e) => {

        setmethodPayment(e.target.value);
    }

    const Handle_select_and_inputs_step4 = (e) => {
        let key = JSON.stringify(e.target.id);
        let value = e.target.value;
        let obj_key = e.target.className;

        if(obj_key !== "" && obj_key !== "TournamentPayment"){

            switch(obj_key) {

                case "club_Badge":

                    Tournament_Step_4.form_in_inscription.club_Badge[JSON.parse(key)] = value;

                break;
                case "Picture_of_participants":

                    Tournament_Step_4.form_in_inscription.Picture_of_participants[JSON.parse(key)] = value;

                break;
                case "Email_of_team":

                    Tournament_Step_4.form_in_inscription.Email_of_team[JSON.parse(key)] = value;

                break;
                case "Tel_of_team":

                    Tournament_Step_4.form_in_inscription.Tel_of_team[JSON.parse(key)] = value;

                break;
                case "Id_of_participants":
                    
                    Tournament_Step_4.form_in_inscription.Id_of_participants[JSON.parse(key)] = value;

                break;
                case "Age_of_participants":
                    
                    Tournament_Step_4.form_in_inscription.Age_of_participants[JSON.parse(key)] = value;

                break;
                case "Birthdate_of_participants":
                    
                    Tournament_Step_4.form_in_inscription.Birthdate_of_participants[JSON.parse(key)] = value;
                
                break;
                case "Dorsal_of_participants":
                    
                    Tournament_Step_4.form_in_inscription.Dorsal_of_participants[JSON.parse(key)] = value;

                break;
                case "Team_role":
                    
                    Tournament_Step_4.form_in_inscription.Team_role[JSON.parse(key)] = value;

                break;
                case "position_of_participants":
                    
                    Tournament_Step_4.form_in_inscription.position_of_participants[JSON.parse(key)] = value;

                break;    
            }
            
        }else if(obj_key === "TournamentPayment"){

                TournamentPayment[JSON.parse(key)] = value;

                console.log(TournamentPayment);
        
        }else if(e.target.id === "message_in_description"){

                Tournament_Step_4.message_in_description = value;
        
        }else if(obj_key === "customFields"){

                
        }

        console.log(Tournament_Step_4);
    }

    // tipo de torneo

    const Return_TornamentType = () => {

        if(Tournament_Step_1.TournamentType === "liga"){

            return(
                <>
                    <img src="/images/TournamentType/clasificacion.png" id="liga"/>

                    <h3 id="liga">Liga</h3>
                </>
            )

        }
        else if(Tournament_Step_1.TournamentType === "fase de grupos"){

            return(
                <>
                    <img src="/images/TournamentType/juego.png" id="fase de grupos"/>

                    <h3 id="fase de grupos">Fase de grupo y eliminatorias</h3>
                </>
            )
        }
        else if(Tournament_Step_1.TournamentType === "eliminatorias"){

            return(
                <>
                    <img src="/images/TournamentType/torneo.png" id="eliminatorias"/>

                    <h3 id="eliminatorias">Eliminatorias</h3>
                </>
            )
        }

    }

    // selects para las tablas del paso 4

    const SelectRequirements = ({props}) => {

        return(

            <td><select className={props} id="SelectRequirements" onChange={Handle_select_and_inputs_step4}>
                <option value="">--Elegir tipo de Requerimientos--</option>
                <option>Obligatorio</option>
                <option>Opcional</option>
                <option>no requerida</option>    
            </select></td>

        )
    }

    const PrivacyRequirements = ({props}) => {

        return(

            <td><select className={props} id="PrivacyRequirements" onChange={Handle_select_and_inputs_step4}>
                <option value="">--Elegir tipo de privacidad--</option>
                <option>Todos (los que participan en torneo)</option>
                <option>Capitanes de equipos y Adminsitrador de torneo</option>
                <option>Solo adminsitrador de torneo</option>
                <option>Nadie</option>    
            </select></td>
        )
    }

    const ModifiyRequirements = ({props}) => {

        return(

            <td><select className={props} id="ModifiyRequirements" onChange={Handle_select_and_inputs_step4}>
                <option value="">--Elegir quien puede modificar el apartado--</option>
                <option>Administrador, jugadores y capitanes de equipo</option>
                <option>Administrador y capitanes de equipo</option>
                <option>Administrador</option>
                <option>Nadie</option>    
            </select></td>
        )
    }

    //useEffect: trae los clubes de la pagina para elegir cuales son los organizadores

    const Clubs = async() => {

        let club = await fetch("http://127.0.0.1:8080/clubDB/getClubs", {
            method: "GET",
            headers:{
                "Content-Type": "application/json"
            }
        });

        let Result = club.json().then( async (res) => {

            return await res;

        });
        
        return Result;

    }

    useEffect(() => {

        let OrganizationClubs = [];

        Clubs().then(res => {

            res.map( async (element, index) => {

                let image = await fetch("http://127.0.0.1:8080/clubDB/sendFiles/" + element.owner + "/profilesPictures/" + element.profilePicture, {
                    method: "GET",
                    headers:{
                        "Authorization": "Bearer " + JSON.stringify(localStorage.getItem("JWT")),
                        "Content-Type": "application/json"
                    }
                });

                image.blob()
                .then((blob) => {
                    let url = URL.createObjectURL(blob);
                    OrganizationClubs.push({"res": res[index], "image": url});
                })
            })
        });

        setOrganizationClubs(OrganizationClubs);
        console.log(OrganizationClubs);

        setLoading(false);

    }, [Loading === false]);

    const Handle_organizational_Club = ({props}) => {

        let divs = props.map((element) => {

            let is_organizational = Tournament_Step_3.organizational_Club.filter((names) => names === element.res.name);

            if(is_organizational.length === 0){

                return(
                    <div className={Styles.Org_Clubs} id="Org_Clubs" key={element.res.name} onClick={Handle_select_and_inputs_step3}>
                        <img src={element.image} id="Org_Clubs"/>
                        <br />
                        <label id="Org_Clubs">{element.res.name}</label>
                    </div>
                    )
            }else{

                return(
                    <div className={Styles.Org_Clubs} id="Org_Clubs" key={element.res.name} onClick={Handle_select_and_inputs_step3} style={{boxShadow: "rgb(31, 193, 27) 0px 0px 0px 3px, rgb(31, 193, 27) 0px 0px 0px 6px"}}>
                        <img src={element.image} id="Org_Clubs"/>
                        <br />
                        <label id="Org_Clubs">{element.res.name}</label>
                    </div>
            )}
        });

        return divs
    }
    if(Loading === true){

        return(
            <>
                <Navigation />

                <Footer />
            </>
    )}
    else if(Step === 1 && Loading === false){
    return(

        <>
        
            <Navigation />

                <section className={Styles.CreateTournament_container}>

                    <article className={Styles.title_and_step}>

                        <h1>Crear torneo</h1>

                        <div className={Styles.step}>

                        <button style={{backgroundColor: "chartreuse"}}><li>paso 1</li></button>
                        <img src="/images/flecha-correcta.png"/>
                        <button><li>paso 2</li></button>
                        <img src="/images/flecha-correcta.png"/>
                        <button><li>paso 3</li></button>
                        <img src="/images/flecha-correcta.png"/>
                        <button><li>paso 4</li></button>
                        </div>

                    </article>
                    

                    <article className={Styles.type_of_tournament_container}>

                        {TournamentType === "liga" ? 
                        <div className={Styles.tournament} id="liga" onClick={Handle_tournament_type} style={{boxShadow: "rgb(31, 193, 27) 0px 0px 0px 3px, rgb(31, 193, 27) 0px 0px 0px 6px"}}>

                            <img src="/images/TournamentType/clasificacion.png" id="liga"/>

                            <h3 id="liga">Liga</h3>

                        </div>
                        :
                        <div className={Styles.tournament} id="liga" onClick={Handle_tournament_type}>

                            <img src="/images/TournamentType/clasificacion.png" id="liga"/>

                            <h3 id="liga">Liga</h3>

                        </div>
                        }

                        {TournamentType === "fase de grupos" ?
                        <div className={Styles.tournament} id="fase de grupos" onClick={Handle_tournament_type} style={{boxShadow: "rgb(31, 193, 27) 0px 0px 0px 3px, rgb(31, 193, 27) 0px 0px 0px 6px"}}>

                            <img src="/images/TournamentType/juego.png" id="fase de grupos"/>

                            <h3 id="fase de grupos">Fase de grupo y eliminatorias</h3>

                        </div>
                        :
                        <div className={Styles.tournament} id="fase de grupos" onClick={Handle_tournament_type}>

                            <img src="/images/TournamentType/juego.png" id="fase de grupos"/>

                            <h3 id="fase de grupos">Fase de grupo y eliminatorias</h3>

                        </div>
                        }

                        {TournamentType === "eliminatorias" ? 
                        <div className={Styles.tournament} id="eliminatorias" onClick={Handle_tournament_type} style={{boxShadow: "rgb(31, 193, 27) 0px 0px 0px 3px, rgb(31, 193, 27) 0px 0px 0px 6px"}}>

                            <img src="/images/TournamentType/torneo.png" id="eliminatorias"/>

                            <h3 id="eliminatorias">Eliminatorias</h3>

                        </div>
                        :
                        <div className={Styles.tournament} id="eliminatorias" onClick={Handle_tournament_type}>

                            <img src="/images/TournamentType/torneo.png" id="eliminatorias"/>

                            <h3 id="eliminatorias">Eliminatorias</h3>

                        </div>
                        }

                    </article>

                    <article className={Styles.tournament_data}>
                        
                        <div>
                            <input type="text" placeholder="Nombre del torneo" onChange={Handle_tournament_name}/>
                        
                        
                            <label> Disciplina </label> <br />
                            <select onChange={Handle_tournament_discipline}>
                                <option>Futbol 5</option>
                                <option>Futbol 7</option>
                                <option>Futbol 11</option>
                                <option>Tenis</option>
                                <option>Paddel</option>
                            </select>
                        

                        </div>

                        <br />

                        <div>   
                            <textarea name="textarea" rows="10" cols="150" placeholder="Crea una pequeña descripcion de tu torneo" onChange={Handle_tournament_description}></textarea>
                        </div>

                        <br />

                        <div className={Styles.dateInput}>
                            <label>Fecha de inicio del torneo</label>
                            <input type="date" onChange={Handle_tournament_startDate}/>

                            <label>Fecha de finalizacion de inscripcion</label>
                            <input type="date" onChange={Handle_tournament_RegistrationClosing}/>
                        </div>

                    </article>

                    <article className={Styles.Step_Btn}>
                        <button>Cancelar</button>
                        <button id="step1" onClick={Handle_Steps}>Siguiente</button>
                    </article>
                    

                </section>

            <Footer />
        
        </>

    )}
    else if(Step === 2 && Loading === false){

        return(

            <>
                <Navigation />

                    <section className={Styles.CreateTournament_container}>

                        <article className={Styles.title_and_step}>

                            <h1>Crear torneo</h1>

                            <div className={Styles.step}>

                                <button><li>paso 1</li></button>
                                <img src="/images/flecha-correcta.png"/>
                                <button style={{backgroundColor: "chartreuse"}}><li>paso 2</li></button>
                                <img src="/images/flecha-correcta.png"/>
                                <button><li>paso 3</li></button>
                                <img src="/images/flecha-correcta.png"/>
                                <button><li>paso 4</li></button>
                                </div>

                        </article>

                        <article className={Styles.Tournament_Specific_Data}>

                            <div className={Styles.tournament} style={{boxShadow: "rgb(31, 193, 27) 0px 0px 0px 3px, rgb(31, 193, 27) 0px 0px 0px 6px"}}>

                                <Return_TornamentType />

                            </div>

                            <div className={Styles.infoData}>

                                <div className={Styles.Data}>
                                    <label>Tipo de torneo: segun genero</label> <br />
                                    <select id="TournamentGender" onChange={Handle_select_and_inputs}>
                                        <option value="">--Seleccionar genero--</option>
                                        <option>Masculino</option>
                                        <option>Femenino</option>
                                        <option>Mixto</option>
                                    </select>
                                </div>

                                <div className={Styles.Data}>
                                    <label>Nivel de categoria del torneo</label> <br />
                                    <select id="TournamentCategory" onChange={Handle_select_and_inputs}>
                                        <option value="">--Seleccionar categoria--</option>
                                        <option>No hay categorias</option>
                                        <option>8ª Octava</option>
                                        <option>7ª Septima</option>
                                        <option>6ª Sexta</option>
                                        <option>5ª Quinta</option>
                                        <option>4ª Cuarta</option>
                                        <option>3ª Tercera</option>
                                        <option>2ª Segunda</option>
                                        <option>1ª Primera</option>
                                    </select>
                                </div>

                                <div className={Styles.Data}>

                                    <label>Numero de participantes</label>
                                    <br />
                                    <select id="number_of_participants" onChange={Handle_select_and_inputs}>
                                        <option value="">--Selecciona cantidad limite de participantes--</option>
                                        <option>Libre inscripcion</option>
                                        <option>4 participantes</option>
                                        <option>8 participantes</option>
                                        <option>12 participantes</option>
                                        <option>16 participantes</option>
                                        <option>18 participantes</option>
                                        <option>24 participantes</option>
                                        <option>32 participantes</option>
                                    </select>

                                </div>

                                <div className={Styles.Data}>
                                    
                                    <h3>Edad de inscripcion de <input type="number" id="TournamentAge1"  onChange={Handle_select_and_inputs}/> a <input type="number" id="TournamentAge2"  onChange={Handle_select_and_inputs}/></h3>
                                    
                                </div>

                                
                                {(Tournament_Step_1.TournamentDiscipline === "Paddel") || (Tournament_Step_1.TournamentDiscipline === "Tenis") ?

                                <>
                                    <div className={Styles.Data}>
                                        <label>Tipo de torneo</label> <br />
                                         <select id="team_modality" className="Discipline_Tenis_or_paddel"  onChange={Handle_select_and_inputs}>
                                            <option value="">--Seleccionar modalidad de torneo--</option>
                                            <option>Singles</option>
                                            <option>Dobles</option>
                                        </select>
                                    </div>

                                    <div className={Styles.Data}>
                                        <label>Tipo de inscripcion</label> <br />
                                        <select id="type_of_inscription" className="Discipline_Tenis_or_paddel" onChange={Handle_select_and_inputs}>
                                            <option value="">--Seleccionar tipo de inscripcion--</option>
                                            <option>Singles</option>
                                            <option>Dobles</option>
                                        </select>
                                    </div>

                                    <div className={Styles.Data}>
                                        <label>Duracion de partido</label> <br />
                                        <select id="match_duration" className="Discipline_Tenis_or_paddel" onChange={Handle_select_and_inputs}>
                                            <option value="">--Seleccionar duracion de partido--</option>
                                            <option>Mejor de 1 set</option>
                                            <option>Mejor de 3 set</option>
                                            <option>Mejor de 5 set</option>
                                        </select>
                                    </div>

                                    <div className={Styles.Data}>
                                        <input type="checkbox" id="point_of_gold" className="Discipline_Tenis_or_paddel" onChange={Handle_select_and_inputs}/> <label>Punto de oro (sin ventajas)</label>
                                    </div>
                                    
                                </>

                                    :
                                    
                                <></>
                                }

                                {(Tournament_Step_1.TournamentDiscipline === "Futbol 5") || (Tournament_Step_1.TournamentDiscipline === "Futbol 7") || (Tournament_Step_1.TournamentDiscipline === "Futbol 11") ?
                                
                                <>
                                     <div className={Styles.Data}>
                                        <label>Duracion de partido</label> <br />
                                         <select id="match_duration" className=" Discipline_Futbol" onChange={Handle_select_and_inputs}>
                                            <option value="">--Seleccionar Duración de partido--</option>
                                            <option>30 minutos</option>
                                            <option>60 minutos</option>
                                            <option>90 minutos</option>
                                        </select>
                                    </div>
                                </> 

                                    :
                                 
                                <></>    
                                }
                                
                                {Tournament_Step_1.TournamentType === "fase de grupos" ?

                                <>
                                    <div className={Styles.Data}>
                                        <label>Ida y vuelta en fase de grupos</label> <br />
                                        <select className="roundtrip_phase" id="Round_Trip_phase1" onChange={Handle_select_and_inputs}>
                                            <option value="">--Seleccionar si hay ida o vuelta en la fase de grupos--</option>
                                            <option>Si</option>
                                            <option>No</option>
                                        </select>
                                    </div>

                                    <div className={Styles.Data}>
                                        <label>Ida y vuelta en fase eliminatoria</label> <br />
                                        <select className="roundtrip_phase" id="Round_Trip_phase2" onChange={Handle_select_and_inputs}>
                                            <option value="">--Seleccionar si hay ida o vuelta en la eliminatoria--</option>
                                            <option>Si</option>
                                            <option>No</option>
                                        </select>
                                    </div>

                                    <div className={Styles.Data}>
                                        <label>Cantidad de grupos</label> <br />
                                        <select className="roundtrip_phase" id="quantity_of_teams_in_groupStage" onChange={Handle_select_and_inputs}>
                                            <option value="">--Seleccionar cuantos equipos va a haber en fase de grupos--</option>
                                            <option>1 grupo</option>
                                            <option>2 grupos</option>
                                            <option>grupos de 4 equipos</option>
                                            <option>cantidad de grupos segun equipos</option>
                                        </select>
                                    </div>

                                    <div className={Styles.Data}>
                                        <h3>Pasan al cuadro eliminatorio <input type="number" className="roundtrip_phase" id="they_advance" onChange={Handle_select_and_inputs}/> de cada grupo</h3>
                                        
                                        <br />

                                        <h3>Ademas pasar a los <input type="number" className="roundtrip_phase" id="third_advance" onChange={Handle_select_and_inputs}/> mejores "Terceros"</h3>

                                    </div>

                                    <div className={Styles.Data}>

                                        <input type="checkbox" className="roundtrip_phase" id="consolation" onChange={Handle_select_and_inputs}/> <label>Crear cuadro de consolacion</label> <br />
                                        <input type="checkbox" className="roundtrip_phase" id="third_and_four_place" onChange={Handle_select_and_inputs}/> <label>Crear partidos de tercer y cuarto puesto</label> <br />
                                        <input type="checkbox" className="roundtrip_phase" id="stats_pairings" onChange={Handle_select_and_inputs}/> <label>Los equipos clasifican segun la clasificacion global de todos los equipos y se emparejan en la eliminatoria segun resultados (sino es al azar)</label>
 
                                    </div>


                                </>

                                    :

                                <></>
                                }

                                {Tournament_Step_1.TournamentType === "liga" ?
                                
                                <>
                                    <div className={Styles.Data}>
                                        <label>Ida y vuelta</label> <br />
                                        <select className="league" id="round_trip"   onChange={Handle_select_and_inputs}>
                                            <option value="">--Seleccionar si hay ida y vuelta en la liga--</option>
                                            <option>Si</option>
                                            <option>No</option>
                                        </select>
                                    </div>

                                    <div className={Styles.Data}>
                                        <input type="checkbox" className="league" id="tiebreaker_match"  onChange={Handle_select_and_inputs}/> <label>Partido de desempate si se llega a dar situacion de paridad en todos los aspectos (primer, segundo y tercer puesto)</label>
                                    </div>

                                </>

                                    :
                                
                                <></>

                                }

                                {Tournament_Step_1.TournamentType === "eliminatorias" ?
                                
                                <>

                                    <div className={Styles.Data}>
                                        <label>Ida y vuelta</label> <br />
                                        <select className="playoffs" id="round_trip" onChange={Handle_select_and_inputs}>
                                            <option value="">--Seleccion si hay ida y vuelta en eliminatorias</option>
                                            <option>Si</option>
                                            <option>No</option>
                                        </select>
                                    </div>

                                    <div className={Styles.Data}>
                                        <input type="checkbox" className="playoffs" id="consolation" onChange={Handle_select_and_inputs}/><label>Crear cuadro de consolacion</label> <br />
                                        <input type="checkbox" className="playoffs" id="third_and_four_place" onChange={Handle_select_and_inputs}/><label>Crear partido de tercer y cuarto puesto</label> <br />
                                        <input type="checkbox" className="playoffs" id="winner_and_loser_secondRound" onChange={Handle_select_and_inputs}/><label>Primera ronda no cae ningun participante, en segunda ronda se enfrenta ganadores y perdedores</label>
                                    </div>

                                </>
                                
                                :

                                <></>

                                }
                                

                            </div>


                        </article>

                        <article className={Styles.Step_Btn}>
                            <button>Cancelar</button>
                            <button id="step2" onClick={Handle_Steps}>Siguiente</button>
                        </article>

                    </section>

                <Footer />
            </>

        )

    }
    else if(Step === 3 && Loading === false){
        return(

            <>
                <Navigation />

                <section className={Styles.CreateTournament_container}>

                    <article className={Styles.title_and_step}>

                        <h1>Crear torneo</h1>

                        <div className={Styles.step}>

                            <button><li>paso 1</li></button>
                            <img src="/images/flecha-correcta.png"/>
                            <button><li>paso 2</li></button>
                            <img src="/images/flecha-correcta.png"/>
                            <button style={{backgroundColor: "chartreuse"}}><li>paso 3</li></button>
                            <img src="/images/flecha-correcta.png"/>
                            <button><li>paso 4</li></button>
                        </div>

                    </article>

                    <article className={Styles.tournamentConfiguration}>

                        <h1>Configuracion de los datos del torneo</h1> <br />
                        <label>Ubicacion de los premios, canchas a usar, informacion general, premios </label>

                        <div className={Styles.configuration}>

                            <div className={Styles.configuration_div1}>
                                <h3>Club/clubes</h3> <br />
                                <label>los clubes que organizan el torneo</label> 
                                <br />
                                <button id="organizational_Club" onClick={Handle_select_and_inputs_step3}>Agregar clubes organizadores</button>
                                <br />
                                
                                {OrganizationDiv === false ? 
                                <></>
                                :
                                <article className={Styles.clubs}>
                                <Handle_organizational_Club props={OrganizationClubs}/>
                                </article>
                                }
                                
                            </div>         

                            <div className={Styles.configuration_div3}>
                                <h3>Normativas del torneo, premios, reglas generales, etc</h3> <br />
                                <textarea id="tournament_Regulations" onChange={Handle_select_and_inputs_step3}></textarea> <br />
                                <h3>se puede subir PDF: <input type="file" id="tournament_Regulations_Document" onChange={Handle_select_and_inputs_step3}/></h3> 
                            </div>

                        </div>
                        
                        <div className={Styles.configuration2}>       
                            <h1>Contacto y Imagen de perfil</h1> <br />
                            <label>Esta informacion es publica, los usuarios tambien podran comunicarse por la pagina</label>

                            <div className={Styles.Public_contact}>
                                <h3>Persona de Contacto: <input type="text" className="tournament_Contacts" id="person_of_contact" onChange={Handle_select_and_inputs_step3}/></h3>  <br />
                                <h3>Telefono de Contacto: <input type="text" className="tournament_Contacts" id="tel_of_contact" onChange={Handle_select_and_inputs_step3}/></h3>  <br />
                                <h3>Email de Contacto: <input type="text" className="tournament_Contacts" id="email_of_contact" onChange={Handle_select_and_inputs_step3}/></h3>  
                            </div>

                            <div className={Styles.configuration_div2}>
                                <h3>Imagen del torneo:  <input type="file" onChange={HandleTournamentPictures}/></h3> 
                                <br />

                                {PictureTournament === "" ?
                                    <img src="/images/icono.avif" className={Styles.picture}/>
                                    :
                                    <img src={PictureTournament} className={Styles.picture}/>
                                }
                                
                            </div> 
                        </div>

                        <h1>Privacidad</h1>

                        <div className={Styles.privacy}>
                            <div>
                                <h4><input type="checkbox" id="public_Tournament" onChange={Handle_select_and_inputs_step3}/> Este torneo es publico</h4><br />
                                <p>El torneo es publico por lo tanto cualquiera puede anotarse</p> 
                            </div>
                            <div>
                                <h4><input type="checkbox" id="private_Tournament" onChange={Handle_select_and_inputs_step3}/> Este torneo es privado</h4> <br />
                                <p>Cualquiera puede ver la descripción del torneo y solicitar la inscripción, pero los participantes tienen que ser aceptados por el club que organiza el torneo</p>
                            </div>
                           
                        </div>

                        <h1>Contraseña</h1>

                        <div className={Styles.password}>
                            <div>
                                <label>El torneo tiene contraseña</label> <br />
                                <select onChange={HandleTournamentPassword}>
                                    <option value="no">No</option>
                                    <option value="si">Si</option>
                                </select>
                            </div>
                            {
                                TournamentPassword === false ? 
                                <></> 
                                :
                                <>
                                    <div>
                                        <label>Contraseña</label> <br />
                                        <input type="password" id="password" className={Styles.password} onChange={Handle_select_and_inputs_step3}/>
                                    </div>
                                    <br />
                                    <div>
                                        <label>Repetir contraseña</label> <br />
                                        <input type="password" id="confirmPassword" className={Styles.confirmPassword} onChange={Handle_select_and_inputs_step3}/>
                                    </div>
                                </>
                            }
                        </div>

                    </article>

                    <article className={Styles.Step_Btn}>
                            <button>Cancelar</button>
                            <button id="step3" onClick={Handle_Steps}>Siguiente</button>
                    </article>

                </section>

                <Footer />
            </>

    )}
    else if(Step === 4){

        return(

            <>
                <Navigation />
            
                    <section className={Styles.CreateTournament_container}>

                    <article className={Styles.title_and_step}>

                        <h1>Crear torneo</h1>

                        <div className={Styles.step}>

                            <button><li>paso 1</li></button>
                            <img src="/images/flecha-correcta.png"/>
                            <button><li>paso 2</li></button>
                            <img src="/images/flecha-correcta.png"/>
                            <button><li>paso 3</li></button>
                            <img src="/images/flecha-correcta.png"/>
                            <button style={{backgroundColor: "chartreuse"}}><li>paso 4</li></button>

                        </div>

                    </article>

                    <article className={Styles.tournament_Price}>

                        <div className={Styles.tournament_Price_title}>
                            <h3>Configuracion de pagos</h3>
                            <label>Tipo de inscripcion, precios y modos de pago</label>
                        </div>

                        <div className={Styles.Price_payment_method}>

                            <div id={Styles.price1}>
                                <label>Tipo de inscripcion</label> <br />
                                <select className="TournamentPayment" id="InscriptionType" onChange={Handle_select_and_inputs_step4}>
                                    <option>--Elegir modelo de inscripcion--</option>
                                    <option>inscripción a pagar</option>
                                    <option>inscripción gratuita</option>
                                </select>
                            </div>

                            <div id={Styles.price2}>
                                <label>Precio</label> <br />
                                <input type="number" placeholder="Precio" className="TournamentPayment" id="Price" onChange={Handle_select_and_inputs_step4}/>
                            </div>

                            <div id={Styles.price3}>
                                <label>Metodos de pago</label> <br />
                                <select className={Styles.methodPayment} onChange={Handle_methodPayment} id="PaymentsType">
                                    <option>--Elegir un metodo de pago--</option>
                                    <option value="efectivo">Solo efectivo</option>
                                    <option value="transferencia o debito">Solo Transferencia o tarjeta de debito</option>
                                    <option value="tarjeta credito">Solo tarjeta de credito</option>
                                    <option value="todas las anteriores">Todos los metodos de pago anteriores son validos</option>
                                </select>
                            </div>

                            {methodPayment === "efectivo" ? 
                            <div id={Styles.price4}>
                                <label>Describir de que manera se efectua el pago en efectivo</label><br />
                                <input type="text" placeholder="descripcion" className="TournamentPayment" id="cash" onChange={Handle_select_and_inputs_step4}/>
                            </div>
                            :
                            null
                            }

                            {methodPayment === "transferencia o debito" ?
                            <div id={Styles.price4}>
                                <label>CBU</label> <br />
                                <input type="number" className="TournamentPayment" id="cbu" onChange={Handle_select_and_inputs_step4}/>

                                <label>Alias</label>
                                <input type="text" className="TournamentPayment" id="alias" onChange={Handle_select_and_inputs_step4}/>
                            </div>
                            :
                            null
                            }

                            {methodPayment === "todas las anteriores" ?
                            <div id={Styles.price4}>
                                <div>
                                    <label>Describir de que manera se efectua el pago en efectivo</label><br />
                                    <input type="text" placeholder="descripcion" className="TournamentPayment" id="cash" onChange={Handle_select_and_inputs_step4}/>
                                </div>
                                <div>
                                    <label>CBU</label> <br />
                                    <input type="number" className="TournamentPayment" id="cbu" onChange={Handle_select_and_inputs_step4}/>

                                    <label>Alias</label>
                                    <input type="text" className="TournamentPayment" id="alias" onChange={Handle_select_and_inputs_step4}/>
                                </div>
                            </div>
                            :
                            null
                            }

                        </div>

                    </article>

                    <article className={Styles.participantsConfiguration}>

                        <div>
                            <h3>Campos de inscripcion</h3>
                            <label>Campos que se mostraran en el formulario para la inscripcion del equipo</label>
                        </div>

                        <table>
                            <tr>
                                <td className={Styles.tableTitle}></td>
                                <td className={Styles.tableTitle}>Requerimientos</td>
                                <td className={Styles.tableTitle}>Quien puede ver este campo</td>
                                <td className={Styles.tableTitle}>Quien puede modificar este campo</td>
                            </tr>
                            <tr>
                                <td>Escudo de equipo</td>
                                <SelectRequirements props = {"club_Badge"}/>
                                <PrivacyRequirements props = {"club_Badge"}/>
                                <ModifiyRequirements props = {"club_Badge"}/>
                            </tr>
                            <tr>
                                <td>Fotos de participantes</td>
                                <SelectRequirements props = {"Picture_of_participants"}/>
                                <PrivacyRequirements props = {"Picture_of_participants"}/>
                                <ModifiyRequirements props = {"Picture_of_participants"}/>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <SelectRequirements props = {"Email_of_team"}/>
                                <PrivacyRequirements props = {"Email_of_team"}/>
                                <ModifiyRequirements props = {"Email_of_team"}/>
                            </tr>
                            <tr>
                                <td>Telefono</td>
                                <SelectRequirements props = {"Tel_of_team"}/>
                                <PrivacyRequirements props = {"Tel_of_team"}/>
                                <ModifiyRequirements props = {"Tel_of_team"}/>
                            </tr>
                            <tr>
                                <td>DNI de participantes</td>
                                <SelectRequirements props = {"Id_of_participants"}/>
                                <PrivacyRequirements props = {"Id_of_participants"}/>
                                <ModifiyRequirements props = {"Id_of_participants"}/>
                            </tr>
                            <tr>
                                <td>Edad de participantes</td>
                                <SelectRequirements props = {"Age_of_participants"}/>
                                <PrivacyRequirements props = {"Age_of_participants"}/>
                                <ModifiyRequirements props = {"Age_of_participants"}/>
                            </tr>
                            <tr>
                                <td>Fecha de nacimiento</td>
                                <SelectRequirements props = {"Birthdate_of_participants"}/>
                                <PrivacyRequirements props = {"Birthdate_of_participants"}/>
                                <ModifiyRequirements props = {"Birthdate_of_participants"}/>
                            </tr>
                            <tr>
                                <td>Dorsal</td>
                                <SelectRequirements props = {"Dorsal_of_participants"}/>
                                <PrivacyRequirements props = {"Dorsal_of_participants"}/>
                                <ModifiyRequirements props = {"Dorsal_of_participants"}/>
                            </tr>
                            <tr>
                                <td>Rol en equipo</td>
                                <SelectRequirements props = {"Team_role"}/>
                                <PrivacyRequirements props = {"Team_role"}/>
                                <ModifiyRequirements props = {"Team_role"}/>
                            </tr>
                            <tr>
                                <td>Posicion</td>
                                <SelectRequirements props = {"position_of_participants"}/>
                                <PrivacyRequirements props = {"position_of_participants"}/>
                                <ModifiyRequirements props = {"position_of_participants"}/>
                            </tr>
                        </table>

                    </article>

                    <article className={Styles.newFields}>

                        <div>
                            <h3>Campos personalizados para equipos</h3>
                            <label>Si necesitas mas informacion puedes crear tus propios campos</label>

                            <button>+ Agregar campo</button>
                        </div>

                        <table>
                            <tr>
                                <td className={Styles.tableTitle}></td>
                                <td className={Styles.tableTitle}>Requerimientos</td>
                                <td className={Styles.tableTitle}>Quien puede ver este campo</td>
                                <td className={Styles.tableTitle}>Quien puede modificar este campo</td>
                            </tr>
                            <tr>
                                <td><input type="text" placeholder="Campo" className="customFields" onChange={Handle_select_and_inputs_step4}/></td>
                                <SelectRequirements />
                                <PrivacyRequirements />
                                <ModifiyRequirements />
                            </tr>
                        </table>

                    </article>

                    <article className={Styles.inscriptionMsj}>

                        <div>
                            <h3>Mensaje en la inscripcion</h3>
                            <label>el mensaje que se mostrara cuando el equipo se inscriba</label>
                        </div>

                        <textarea id="message_in_description" onChange={Handle_select_and_inputs_step4}/>

                    </article>

                    <article className={Styles.Step_Btn}>
                            <button>Cancelar</button>
                            <button id="finish" onClick={Handle_Steps}>Siguiente</button>
                    </article>

                    </section>

                <Footer />
            </>
        )
    }
    else if(Step === 5){
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
        )}
}