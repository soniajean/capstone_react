/* eslint-disable jsx-a11y/img-redundant-alt */
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { DataContext } from "../context/DataProvider";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';







const Exercises = () => {
 

   const [exercises, setExercises] = useState([])
   useEffect(()=> {
    async function getData() {
    const res = await axios.get('http://127.0.0.1:5000/api/exercise')
    const data=res.data.data
    setExercises(data)
    console.log(data)


   
}
getData()}, [])

    return (
        <div className="container">
            <div className="row">
                <h1> Workout </h1>
            </div>
            <div>
           
            <div class="card-group">
  <div class="card">
    <img class="card-img-top" src="..." alt="Card image cap"/>
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    </div>
  </div>
  <div class="card">
    <img class="card-img-top" src="..." alt="Card image cap"/>
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    </div>
  </div>
  <div class="card">
    <img class="card-img-top" src="..." alt="Card image cap"/>
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    </div>
  </div>
</div>
</div>
                
            </div> 

           
            

       

    );
}


export default Exercises;