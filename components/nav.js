
import Image from "next/image";
import Style from "../styles/components/Navigation/Navigation.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";



export default function Navigation({is_owner}){

    const [logued, setlogued] = useState(false);

    useEffect(() => {

        if(localStorage.getItem("JWT")){
            setlogued(true);
        }else{
            setlogued(false);
        }

    }, [])

    return(
        <article id="Nav_container" className={Style.nav}>

            <h1>Tu Club</h1>

            <ul id="Nav_options" className={Style.nav_options}>
                <li>Reservar canchas</li>
                <li>Clubes</li>
                <li>Quienes somos</li>
                <li>Como asociarme</li>
            </ul>

            <div id="Nav_menu" className={Style.nav_menu}>
                <div>
                    { logued !== true ?
                    <Link href="/Home">
                        <Image
                            src="/images/Nav_icon/casa.png"
                            height={40}
                            width={40}
                            alt="casa"
                        />
                    </Link>
                    :
                    <Link href="/Main">
                         <Image
                            src="/images/Nav_icon/casa.png"
                            height={40}
                            width={40}
                            alt="casa"
                        />
                    </Link>
                    }

                    <Link href="/Home/login">
                        <Image
                            src="/images/Nav_icon/acceso.png"
                            height={40}
                            width={40}
                            alt="login"
                        />
                    </Link>
                    
                    {is_owner === "owner" ? <Link href="/MiClub"><button>Mi Club</button></Link> : <Link href="/CreateClub/data"><button>Unir mi club</button></Link>}
                    
                    
                </div>
                <div>
                    <label>Home</label>
                    <label>Acceso</label>
                </div>
            </div>

        </article>
    )

}