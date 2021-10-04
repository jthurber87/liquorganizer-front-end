import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

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
            <div>
                {bottles && bottles.map(item => (
                    <div className='item' key={item._id}>
                        <h4>Spirit: {item.spirit} {item.brand}</h4>
                        <h4>Count: {item.count}</h4>
                        <h4>Notes: {item.notes}</h4>
                        <button><Link to={`/bottles/${item._id}`}>See Details</Link></button>
                    </div>
                ))}
            </div>
            <div>
                <Link to='/bottles/new'>Create New Bottles</Link>
        </div>
        </>
    )
}

export default ItemLists
