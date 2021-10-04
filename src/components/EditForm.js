import React, { useState, useEffect } from 'react'

function EditForm(props) {
    const initialState = {
        spirit: '',
        brand: '',
        count: 0,
        notes: ''
    }

    const [input, setInput] = useState(initialState)
    const [loading, setLoading] = useState(true)

    const getBottleToEdit = async (id) => {
        try {
            const id = props.match.params.id;
            const foundBottle = await fetch('http://localhost:9000/bottles/' + id)
            const parsedBottle = await foundBottle.json()
            setInput(parsedBottle)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const updateBottle = async (id, data) => {
        const configs = {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }

        const updateBottle = await fetch('http://localhost:9000/bottles/' + id, configs)
        const parsedBottle = await updateBottle.json();
        props.history.push('/bottles/' + id)
    }
    const handleSubmit = (e) => {
        e.prevendDefault()
        const { spirit, brand, count, notes } = input;
        const bottlesData = { spirit, brand, count, notes }
        updateBottle(input._id, bottlesData);
    }

    const handleChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    }

    useEffect(()=>{
        getBottleToEdit()
    },[])


    return(
        <div>
            <h1>Edit Form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='spirit'>Spirit</label>
                    <input name='spirit' id='spirit' value={input.spirit} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor='brand'>Brand</label>
                    <input name='brand' id='brand' value={input.brand} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor='count'>Count</label>
                    <input type='number' name='count' id='count' value={input.count} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor='notes'>Notes</label>
                    <input name='notes' id='notes' value={input.notes} onChange={handleChange}/>
                </div>

            </form>
        </div>
    )
}

export default EditForm