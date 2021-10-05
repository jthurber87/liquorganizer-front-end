import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'

function ItemDetail(props) {
    const currentId = props.match.params.id
    const [bottles, setBottles] = useState({})

    const getBottle = async (id) => {
        const foundBottle = await fetch('http://localhost:9000/bottles/' + id)
        const parsedBottle = await foundBottle.json()
        console.log(parsedBottle)
        setBottles(parsedBottle)
    };

    useEffect(() => {
        getBottle(currentId)
    }, []);

    return (
        <>
        <div className="card">
            <h1>Details</h1>

            <img src= {bottles.img} />

            <p>Spirit: {bottles.spirit}</p>
            <p>Brand: {bottles.brand}</p>
            <p>Count: {bottles.count}</p>
            <p>Notes: {bottles.notes}</p>
            <button><Link to={`/bottles/`}>Go back</Link></button>
            <button><Link to={`/bottles/${bottles._id}/edit`}>Edit</Link></button>
          </div>
        </>
    )
};

export default ItemDetail
