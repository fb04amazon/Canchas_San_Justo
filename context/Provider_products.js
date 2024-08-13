
import { createContext, useState, useEffect } from "react";

export const Products_Context = createContext();

const { Provider } = Products_Context;


const Provider_products = ({children}) => {

    const [Courts, setCourts] = useState();
    const [images] = useState([]);
    const [CourtsURL] = useState("http://127.0.0.1:8080/CourtsDB");
    const [IsLogued, setIsLogued] = useState(true);

    // METODO PARA LLAMAR A PRODUCTOS, TRAE LAS CANCHAS (productos) Y CONVIERTE EN URL A LOS BLOB DE LAS IMAGENES
    useEffect(() => {

        console.log(IsLogued);

        if(IsLogued){

        fetch(CourtsURL + "/Get_dbproduct", {
            method: "GET",
            headers:  {
                "Authorization": "Bearer " + JSON.stringify(localStorage.getItem("JWT"))
            }
        })
        .then((res) => {
            
            res.json().then((res)=>{
                
                res.map( (element) => {

                    element.media.map( async (res) => {
        
                        const products = await fetch(CourtsURL + "/sendFiles/" + element.club_owner + "/" + element.title + "/" + res.type + "/" + res.name);
        
                        products.blob()
                        
                        .then(blob => {
                            res.blob = URL.createObjectURL(blob);
                        })
        
                    })
                })

                setCourts(res);
                console.log(res);

            })  
        })
        .catch((err) => {
            console.log(err);
        })

        }

        

    }, [IsLogued])

    const Ask_For_Logging_products = (value) => {

        setIsLogued(value)

    }

    const contextValue = {

        CourtsURL,
        Courts,
        images,
        Ask_For_Logging_products

    }

    return(
        <Provider value={contextValue}>
            {children}
        </Provider>
    )

}

export default Provider_products;