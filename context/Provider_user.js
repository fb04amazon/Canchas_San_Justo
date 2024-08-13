
import { createContext, useState, useEffect } from "react";

export const User_Context = createContext();

const { Provider } = User_Context;


const Provider_user = ({children}) => {

    const [User, setUser] = useState();
    const [Ask_user, setAsk_user] = useState();
    const [UserURL] = useState("http://127.0.0.1:8080/userDB");
    const [IsLogued, setIsLogued] = useState(false);

    useEffect(() => {

        if(localStorage.getItem("TypeUser") === null){

            fetch( UserURL + "/current", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + JSON.stringify(localStorage.getItem("JWT"))
                }
            })
            .then( (res) => {
                res.json().then( (user) => {
                    console.log(user);

                    localStorage.setItem("TypeUser", user.typeUser);

                    setUser(user);
                } )
            })
            .catch( (err) => {
                console.log(err);
            })

        }

        console.log(User)

    }, [IsLogued])

    
    const Ask_For_Logging_user = (value) => {

        setIsLogued(value)

    }

    const Handle_Ask_user = (value) => {
        setAsk_user(value);
    }

    const contextValue = {

        User,
        Ask_For_Logging_user,
        Ask_user
    }

    return(
        <Provider value={contextValue}>
            {children}
        </Provider>
    )

}

export default Provider_user;