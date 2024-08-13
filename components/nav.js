
import Image from "next/image";
import Style from "../styles/components/Navigation/Navigation.module.css";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";

import { User_Context } from "../context/Provider_user";

export default function Navigation(){

    const contexto = useContext(User_Context);

    const {User} = contexto;

    const [logued, setlogued] = useState(false);
    const [typeUser, setTypeUser] = useState();
    const [Loading, setLoading] = useState(false);


    useEffect(() => {

        if(localStorage.getItem("JWT")){
            setlogued(true);
        }else{
            setlogued(false);
        }

        setTypeUser(localStorage.getItem("TypeUser"));

        setLoading(true)

    }, [])

    return(
        <article id={Style.Nav_container} className={Style.nav}>

            <Link href="/Main" id={Style.Logo}>
                <h1>Tu Club</h1>
            </Link>

            <article className={Style.navOptions}>
                <button>
                    Canchas
                </button>

                <button>
                    Torneos
                </button>

                <button>
                    Clubes
                </button>

                <button>
                    Comunidad
                </button>
                
                <button>
                    ¿Quienes somos?
                </button>
            </article>
            
            <article id="Nav_menu" className={Style.nav_menu}>
                <div>
                    
                    <Link href="/Home/login">
                        <Image
                            src="/images/Nav_icon/acceso.png"
                            height={40}
                            width={40}
                            alt="login"
                        />
                    </Link>
                    
                    {typeUser === "owner" ? <Link href="/MiClub"><button>Mi Club</button></Link> : <Link href="/CreateClub/data"><button>Unir mi club</button></Link>}
                    
                </div>
                
            </article>

        </article>
    )

}