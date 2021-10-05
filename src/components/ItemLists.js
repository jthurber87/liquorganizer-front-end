import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FlipCard from './FlipCard'


// / ** 
// * bottles : [
// *    {
// *        brand: "Patron"
// *        count: 4
// *        notes: "Silver"
// *        spirit: "Vodka"
// *        __v: 0
// *        _id: "615b4e004da16de5d597433f"
// *    }       
// *  ]
// */
function ItemLists(props) {
    const [bottles, setBottles] = useState([])
    const getBottles = async () => {
        try {
            const bottlesResults = await fetch('http://localhost:9000/bottles/');
            console.log(bottlesResults)
            const parsedBottles = await bottlesResults.json();
            console.log(parsedBottles)
            setBottles(parsedBottles);

        } catch (error) {
            console.log(error)
        }
    }
    const decrementCount = async (id) => {
        const updatedBottle = bottles.find(bottle => bottle._id === id);

        try {
            const response = await fetch("http://localhost:9000/bottles/" + id, {
                method: "PUT",
                body: JSON.stringify({ ...updatedBottle, count: updatedBottle.count - 1 }),
                headers: {
                    "Content-type": "application/json"
                }
            });
            const parsedBottle = await response.json();
            console.log("parsed results=", parsedBottle);
            setBottles(bottles => {
                return bottles.map(item => (
                    item._id === id ? { ...parsedBottle, count: parsedBottle.count } : item
                ))
            });

        }
        catch (error) {
            console.log(error)
        }
    }


    const incrementCount = async (id) => {
        const updatedBottle = bottles.find(bottle => bottle._id === id);
        try {
            const response = await fetch('http://localhost:9000/bottles/' + id, {
                method: 'PUT',
                body: JSON.stringify({ ...updatedBottle, count: updatedBottle.count + 1 }),
                headers: {
                    "Content-type": "application/json"
                }
            })
            const parsedBottle = await response.json();
            setBottles(bottles => {
                return bottles.map(item => (
                    item._id === id
                        ? { ...parsedBottle, count: parsedBottle.count }
                        : item
                ))
            })
        } catch (error) {
            console.log(error)
        }
    }

        useEffect(() => {
            getBottles();
        }, []);

        return (
            <>

                <div className="allBottles">
                    {bottles && bottles.map(item => (
                        <div className='item' key={item._id}>
                            <FlipCard item={item} />
                            <button onClick={() => decrementCount(item._id)}>-</button>
                            <h4>Quantity:{item.count}</h4>
                            <button onClick={() => incrementCount(item._id)}>+</button>
                        </div>
                    ))}
                </div>
                <div>
                    <Link to='/bottles/new'>Add Bottle</Link>
                </div>
            </>
        )
}
export default ItemLists
