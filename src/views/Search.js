import { useContext, useState } from "react";
import axios from "axios";
import { DataContext } from "../context/DataProvider";
import { useDatabase, useUser } from "reactfire";
import { ref, set } from "firebase/database";


const Search = () => {
 

    const db = useDatabase();
    const { data:user } = useUser();


    const web_url = 'https://final-flask-ocx8.onrender.com';
    const local_url = 'http://127.0.0.1:5000';
    console.log(web_url, local_url);

    const getExerciseData = async () => {
        let response = await axios.get(web_url);
        return response.status === 200 ? response.data : null
    }

    const loadExerciseData = async () => {
        let data = await getExerciseData();
      
        setExercise(data.data)

    }

    const [exercise, setExercise] = useState(() => loadExerciseData());
    
    const {plan, setPlan} = useContext(DataContext);

    
    const addExercise = (exercise) => {
        
        let copyPlan = {...plan}

        copyPlan.size ++;
        copyPlan.total += exercise.price;
        
      
        copyPlan.exercise[exercise.id] ?
        copyPlan.exercise[exercise.id].quantity ++
        :
        copyPlan.exercise[exercise.id] = {data: exercise, quantity:1};
        console.log(copyPlan);
        if (user){
            set(ref(db, 'plans/' + user.uid), copyPlan);
        }
        setPlan(copyPlan)
    }

    return (
        <div className="container">
            <div className="row">
                <h1> Workout till you drop.</h1>
            </div>
            <div className="row">
                {/* this is where we'll throw in a bootstrap for each product */  console.log(exercise, typeof exercise)}
                {typeof exercise === 'object' && !exercise.then ? exercise.map((exercise, index) => {
                    return <div className="card m-4 border border-4 border-dark" key={index} style={{width: 18 + 'rem'}}>
                        <img src={exercise.img_url} className="card-img-top mt-3 rounded" alt={exercise.name} />
                        <div className="card-body">
                            <h3>{exercise.name}</h3>
                            <h5 className="card-title">{exercise.make} {exercise.model}</h5>
                            <p className="card-text">{exercise.desc}</p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Year- {exercise.year}</li>
                            <li className="list-group-item">Miles- {exercise.miles}</li>
                            <li className="list-group-item">Price-${exercise.price}</li>
                        </ul>
                        <div className="card-body">
                            <button href="#" className="card-link b`tn btn-success mb-2" onClick={() => addExercise(exercise)}>Add to workout plan!</button>
                            <button href="#" className="card-link btn btn-secondary" disabled>Maybe later?</button>
                        </div>
                    </div>
                }) :
                <h3> We're out finding all the exercises. . .</h3>
            }

                
            </div>
        </div>

    );
}


export default Search;