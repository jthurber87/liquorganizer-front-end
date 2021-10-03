import Reqct, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

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
    },[]);

    return (
        <>
        <div>
            {bottles && bottles.map(item => (
                <div className='item' key={item._id}>
                    <h4>{item.spirit} {item.brand}</h4>
                    <h4>{item.count}</h4>
                    <h4>{item.notes}</h4>
                </div>
            ))}
        </div>
        <div>
            <link to '/bottles/new'>Create New Bottles</Link>
        </div>
        </>
    )
}

export default ItemLists