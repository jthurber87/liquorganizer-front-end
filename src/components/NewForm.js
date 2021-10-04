import React, { useState, useEffect } from 'react';


const NewForm = (props) => {
    const [input, setInput] = useState({
        spirit: "",
        brand: "",
        count: 1,
        notes: "",
        img: ""
    })

    //Fetch(POST-CREATE)
    const addItem = async (data) => {
        try {
            const configs = {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                },
            };
            await fetch("http://localhost:9000/bottles", configs)
            props.history.push('/bottles/')
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addItem(input)
    }
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='spirit'>Spirit</label>
            <input name='spirit' id='spirit' value={input.spirit} onChange={handleChange} />
            <br />
            <label htmlFor='brand'>Brand</label>
            <input name='brand' id='brand' value={input.brand} onChange={handleChange} />
            <br />
            <label htmlFor='count'>Count</label>
            <input type='number' name='count' id='count' value={input.count} onChange={handleChange} />
            <br />
            <label htmlFor='notes'>Notes</label>
            <input name='notes' id='notes' value={input.notes} onChange={handleChange} />
            <br />
            <label htmlFor='img'>Image</label>
            <input name='img' id='img' value={input.img} onChange={handleChange} />
            <br />
            <input type="submit" value="submit" />
        </form>
    )
};

export default NewForm;
