import {Link} from 'react-router-dom';
import {routes} from "../../api/paths.js";

export default function Navbar(){

    return(
        <div className="bg-amber-500 h-20 flex  items-center text-2xl mb-20">
            <div className="flex w-48 flex-row justify-around list-none">
                <Link to={routes.PROJECT} >Projekti</Link>
                <Link to={routes.TASKS} className="cursor-pointer">Zadaci</Link>
            </div>
        </div>
    )
}