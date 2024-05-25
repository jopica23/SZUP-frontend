import {Link} from 'react-router-dom';
import {routes} from "../../api/paths.js";

export default function Navbar(){

    return(
        <div className="bg-amber-500 pb-3 pt-3 flex  items-center text-2xl">
            <div className="flex w-48  flex-row justify-around list-none">
                <Link to={routes.HOME} >Moji projekti</Link>
            </div>
        </div>
    )
}