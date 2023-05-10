import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { DataContext } from "../context/DataProvider";
import { useAuth, useUser, useSigninCheck, useDatabase } from "reactfire";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { get, child, ref } from "firebase/database";


const Nav = props => {

    const { plan, setPlan } = useContext(DataContext);

    const auth = useAuth();
    

    const { data: user } = useUser();
    const { signinStatus } = useSigninCheck();

    const db = useDatabase();

    const signin = async () => {
        let provider = new GoogleAuthProvider();
        let u = await signInWithPopup(auth, provider);
        console.log(u);
        return u
    }
    const signout = async () => {
        await signOut(auth);
        setPlan({size:0, total:0, exercise: {}})
    }

    useEffect(() => {
        if (user){
            get(child(ref(db), `plans/${user.uid}`)).then((snapshot) => {
                if (snapshot.exists()) {
                  console.log(snapshot.val());
                  setPlan(snapshot.val());
                } else {
                  console.log("No data available");
                }
              }).catch((error) => {
                console.error(error);
              });
        }
    }, [user]);

    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-light bg-secondary">
                <div className="container-fluid">
                    <Link className="nav-item nav-link active" to='/'>Home</Link>
                    <Link className="nav-item nav-link active" to='/search'>Search</Link>
                    <Link className="nav-item nav-link active" to='/plan'>Workout Plan</Link>
                    {
                        signinStatus === 'loading' ?
                            <button className="btn btn-primary" disabled>Waiting. . .  to. . . .  log . . .  in</button> :
                            user ?
                                <>
                                    <span>{user.displayName}</span>
                                    <button className="btn btn-primary w-25" onClick={signout}>Logout</button>
                                </> :
                                <button className="btn btn-primary w-25" onClick={signin}>Login</button>
                    }
                    {
                        props.admin? <Link className="nav-link" to='/adminhome'><i className="fa-solid fa-lock-open"></i></Link>
                        :
                        <Link className="nav-link" to='/adminsignin'><i className="fa-solid fa-lock"></i></Link>
                    }
                    
                    
                </div>
            </nav>
        </div>
    );
}


export default Nav;