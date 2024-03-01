
import Styles from "../styles/global.css"
import Provider_products from "../context/Provider_products.js";
import Provider_user from "../context/Provider_user.js";
import Provider_clubs from "../context/Provider_clubs.js";



export default function App({Component, pageProps}){

    return(

        <Provider_user>
        <Provider_clubs>
        <Provider_products>

            <Component {...pageProps} />
            
        </Provider_products>
        </Provider_clubs>
        </Provider_user>    
             
    )

}