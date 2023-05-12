import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { DataContext } from "../context/DataProvider";



const Nav = props => {

 



    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-light bg-secondary">
                <div className="container-fluid">
                    <Link className="nav-item nav-link active" to='/'>Home</Link>
                    <Link className="nav-item nav-link active" to='/exercises'>Exercises</Link>
                    <Link className="nav-item nav-link active" to='/Login'>Login</Link>
                    <Link className="nav-item nav-link active" to='/Register'>Register</Link>
            
                    
                </div>
            </nav>
        </div>
    );
}


export default Nav;