import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FlipCard from './FlipCard'
import { Button } from 'react-bootstrap'

function ItemLists(props) {
    const [bottles, setBottles] = useState([])

    const getBottles = async () => {
        try {
            const bottles = await fetch('http://localhost:9000/bottles');
            const parsedBottles = await bottles.json();
            setBottles(parsedBottles);
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
                      <FlipCard item={item}/>
                      <h4>Quantity:{item.count}</h4>
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
