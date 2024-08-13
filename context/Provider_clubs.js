
import { createContext, useState, useEffect } from "react";

export const Clubs_Context = createContext();

const { Provider } = Clubs_Context;

const Provider_clubs = ({children}) => {

    const [Club_data, setClub_data] = useState();
    const [Club_Image, setClub_Image] = useState();
    const [Court_club, setCourt_club] = useState([]);
    const [ClubURL] = useState("http://127.0.0.1:8080/clubDB");
    const [IsLogued, setIsLogued] = useState(true);

    useEffect( () => {

        if(IsLogued){

            fetch( ClubURL + "/getClubs", {
                method: "get"
                
            })
            .then(async (res) => {
                res.json().then( (res) => {
                    
                    setClub_data(res);
                });
            })
            .catch((err) => {
                console.log(err);
            })
        }

    }, [])

    // funcion que pregunta y setea los datos del club del usuario
    const Ask_for_clubData = (value) => {
        setClub_data(value);
    }

    const Ask_for_clubImage = (value) => {

        setClub_Image(value);

    }

    const Push_Court = (value) => {
        
        Court_club.push(value);

    }

    const contextValue = {
        Club_data,
        Ask_for_clubData,
        Club_Image,
        Ask_for_clubImage,
        Push_Court,
        Court_club
    }

    return(
        <Provider value={contextValue}>
            {children}
        </Provider>
    )

}

export default Provider_clubs;