import React, { useState, useEffect } from 'react';

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
            <h1>Detail</h1>
            <p>{bottles._id}</p>
            {/* will add code more after test */}
        </>
    )
};

export default ItemDetail