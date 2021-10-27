import React, { useState, useEffect } from 'react';
import FlipCard from './FlipCard';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Fragment } from 'react';

const ItemLists = () => {
  let history = useHistory();
  const [bottles, setBottles] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  const redirect = () => {
    history.push('/bottles/new')
  };

  const getBottles = async () => {
    try {
      const bottlesResults = await fetch("https://liquorganizer-back-end.herokuapp.com/bottles");
      const parsedBottles = await bottlesResults.json();
      setBottles(parsedBottles);
    } catch(error) {
      setErrorMsg(error);
    }
  };

  const updateCount = async (id, action) => {
    const updatedBottle = bottles.find(bottle => bottle._id === id);
    let count = updatedBottle.count;
    try {
      if (action === 'decrement') {
        count = count - 1;
      } else if (action === 'increment') {
        count = count + 1;
      }
      const response = await fetch("https://liquorganizer-back-end.herokuapp.com/bottles/" + id, {
        method: "PUT",
        body: JSON.stringify({
          ...updatedBottle,
          count
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
  };

  useEffect(() => {
    getBottles();
  }, []);

  return (
    <Fragment>
      <div className="allBottles" > 
      {
        bottles && bottles.map(item => 
          <div className='item' key={item._id}>
            <FlipCard item={item} />
            <div className="counter">
              <button onClick={() => updateCount(item._id, 'decrement')}>-</button>
              <h4>{item.count}</h4>
              <button onClick={() => updateCount(item._id, 'increment')}>+</button>
            </div>
          </div>
        )
      }
      </div>
      <div className="addbottlebutton">
        <Button variant="secondary" onClick={redirect}>Add Bottle</Button>
      </div>
      <div className="errorMsg">
        {errorMsg}
      </div>
      <br />
    </Fragment>
  );
}

export default ItemLists;
