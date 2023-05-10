import { useContext } from "react";
import { DataContext } from "../context/DataProvider";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Button } from "react-bootstrap";
import { useDatabase, useUser } from "reactfire";
import { set, ref } from "firebase/database";
import { Link } from "react-router-dom";

const Plan = () => {
  
    const db = useDatabase();
    const { data:user } = useUser();

    const { plan, setPlan } = useContext(DataContext);

    const clearPlan = () => {
        if (user){
            set(ref(db, 'plans/' + user.uid), null);
        }
        setPlan({size:0, total:0, exercise: {}});
        
    }

    const increaseQuantity = id => {
        // create a copy
        let copyPlan = {...plan};
        // modify the copy
        copyPlan.size++;
        copyPlan.total += copyPlan.exercise[id].data.price;
        copyPlan.exercise[id].quantity++;
        //set the state
        if (user){
            set(ref(db, 'plans/' + user.uid), copyPlan);
        }
        setPlan(copyPlan);
    }

    const decreaseQuantity = id => {
        let copyPlan = {...plan};
        copyPlan.size--;
        copyPlan.total -= copyPlan.exercise[id].data.price;
        copyPlan.exercise[id].quantity > 1 ?
        copyPlan.exercise[id].quantity-- :
        delete copyPlan.exercise[id];
        if (user){
            set(ref(db, 'plans/' + user.uid), copyPlan);
        }
        setPlan(copyPlan)
    }
    const removeItem = id => {
        let copyPlan = {...plan};
        copyPlan.size -= copyPlan.exercise[id].quantity;
        copyPlan.total -= copyPlan.exercise[id].quantity*copyPlan.exercise[id].data.price;
        delete copyPlan.exercise[id];
        if (user){
            set(ref(db, 'plans/' + user.uid), copyPlan);
        }
        setPlan(copyPlan)
    }

    return (

        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>Your Cart:</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
            {Object.values(plan.exercise).map((exercise, index) => {
                console.log(exercise);
                return <ListGroup.Item key={index}>
                    <Card.Img variant="top" src={exercise.data.img_url} id="p-img"/>
                    <h3>{exercise.data.name}</h3>
                    <h5>{exercise.data.make} {exercise.data.model}</h5>
                    <h6>Price: {exercise.data.price}</h6>
                    <Button variant="secondary" id="dec-btn" onClick={() => {decreaseQuantity(exercise.data.id)}}><b> - 1 </b></Button>
                    <span id="q-span">{exercise.quantity}</span>
                    <Button variant="success" id="inc-btn" onClick={() => {increaseQuantity(exercise.data.id)}}><b> + 1 </b></Button>
                    <br></br>
                    <Button variant="warning" id="r-item" onClick={() => {removeItem(exercise.data.id)}}>remove this item</Button>
                </ListGroup.Item>
            })}
            
            </ListGroup>
            <Card.Body>
                <Link  to="/checkout" className="btn btn-primary">Checkout</Link>
                <Button variant="danger" onClick={clearPlan}>Clear Workout Plan</Button>
            </Card.Body>
        </Card>
    )
}
export default Plan;