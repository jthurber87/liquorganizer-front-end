import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import FlipCard from './FlipCard'
import {useHistory} from 'react-router-dom';
import {Button} from 'react-bootstrap'

function ItemLists(props) {
  let history = useHistory();
  const [bottles, setBottles] = useState([])

  const redirect = () => {
    history.push('/bottles/new')
  }

  const getBottles = async () => {
    try {
      const bottlesResults = await fetch("https://liquorganizer-back-end.herokuapp.com/bottles");
      const parsedBottles = await bottlesResults.json();
      setBottles(parsedBottles);
    } catch (error) {
      console.log(error)
    }
  }

  const decrementCount = async (id) => {
    const updatedBottle = bottles.find(bottle => bottle._id === id);
    try {
      const response = await fetch("https://liquorganizer-back-end.herokuapp.com/bottles/" + id, {
        method: "PUT",
        body: JSON.stringify({
          ...updatedBottle,
          count: updatedBottle.count - 1
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const parsedBottle = await response.json();
      console.log("parsed results=", parsedBottle);
      setBottles(bottles => {
        return bottles.map(item => (
          item._id === id
          ? {
            ...parsedBottle,
            count: parsedBottle.count
          }
          : item))
      });
    } catch (error) {
      console.log(error)
    }
  }

  const incrementCount = async (id) => {
    const updatedBottle = bottles.find(bottle => bottle._id === id);
    try {
      const response = await fetch('https://liquorganizer-back-end.herokuapp.com/bottles/' + id, {
        method: 'PUT',
        body: JSON.stringify({
          ...updatedBottle,
          count: updatedBottle.count + 1
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const parsedBottle = await response.json();
      setBottles(bottles => {
        return bottles.map(item => (
          item._id === id
          ? {
            ...parsedBottle,
            count: parsedBottle.count
          }
          : item))
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getBottles();
  }, []);

  return (<> < div className = "allBottles" > {
    bottles && bottles.map(item => (<div className='item' key={item._id}>
      <FlipCard item={item}/>
      <div className="counter">
        <button onClick={() => decrementCount(item._id)}>-</button>
        <h4>{item.count}</h4>
        <button onClick={() => incrementCount(item._id)}>+</button>
      </div>
    </div>))
  } < /div>
          <div>
          <Button onClick={redirect}>Add Bottle</Button > </div>
<br/>
</>)
}
export default ItemLists
