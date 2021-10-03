import React, { useState } from 'react';


const NewForm = (props) => {
    const [input, setInput] = useState({
        spirit: "",
        brand: "",
        count: 0,
        notes: ""
    })

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        addItem(input)
    }

    //Fetch(POST-CREATE)
    const addItem = async (data) => {
        try {
            const configs = {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content=Type": "application/json"
                }
            }
            await fetch("http://localhost:9000/bottles", configs)
        } catch (error) {
            console.log(error)
            props.history.push('/bottles/new')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='spirit'>Spirit</label>
            <input name='spirit' id='spirit' value={input.spirit} onChange={handleChange} />

            <label htmlFor='brand'>Brand</label>
            <input name='brand' id='brand' value={input.brand} onChange={handleChange} />

            <label htmlFor='count'>Count</label>
            <input type='number' name='count' id='count' value={input.count} onChange={handleChange} />

            <label htmlFor='notes'>Notes</label>
            <input name='notes' id='notes' value={input.notes} onChange={handleChange} />
        </form>
    )
};

export default NewForm;