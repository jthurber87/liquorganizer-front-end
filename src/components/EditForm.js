import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'

function EditForm(props) {
    console.log(props)
    const initialState = {
        spirit: '',
        brand: '',
        count: 0,
        notes: '',
        img: ''
    }

    const [input, setInput] = useState(initialState)
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)

    const getBottleToEdit = async (id) => {
        try {
            const id = props.match.params.id;
            const foundBottle = await fetch('http://localhost:9000/bottles/' + id)
            const parsedBottle = await foundBottle.json()
            setInput(parsedBottle)
            setLoading(false)
            if (foundBottle.status === 200) {
              const parsedBottle = await foundBottle.json();
              setInput(parsedBottle)
            }
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
        console.log(updateBottle)
        const parsedUpdateBottle = await updateBottle.json();
        console.log('after update:', parsedUpdateBottle.spirit);
        props.history.push('/bottles/' + id)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const { spirit, brand, count, notes, img } = input;
        const bottlesData = { spirit, brand, count, notes, img }
        updateBottle(input._id, bottlesData);
    }

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        getBottleToEdit()
    }, [])

    const toggleDeleteModal = (e) => {
        e.preventDefault();
        setShowModal(!showModal);
    }


    const deleteBottle = async (id) => {
        try {
            const deleteBottle = await fetch('http://localhost:9000/bottles/' + id, {
                method: 'DELETE',
            })
            console.log(deleteBottle);
            const parsedDeletedBottle = await deleteBottle.json();
            props.history.push('/bottles/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1>Edit Form</h1>
            {loading ? (
                <h3>Loading...</h3>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='spirit'>Spirit</label>
                        <input name='spirit' id='spirit' value={input.spirit} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor='brand'>Brand</label>
                        <input name='brand' id='brand' value={input.brand} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor='count'>Count</label>
                        <input type='number' name='count' id='count' value={input.count} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor='notes'>Notes</label>
                        <input name='notes' id='notes' value={input.notes} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor='img'>Image</label>
                        <input name='img' id='img' value={input.img} onChange={handleChange} />
                    </div>
                    <div>
                        <input type='submit' value='Confirm Changes' />
                        <button onClick={toggleDeleteModal}>Trash</button>
                    </div>
                </form>
            )}

            {
                showModal ? (
                    <div>
                        <h1>Yeah Trash!!!!</h1>
                        <h3>Are you sure?</h3>
                        <div>
                            <button onClick={() => deleteBottle(input._id)}>Trash!!!!</button>
                            <button onClick={toggleDeleteModal}>Cancel</button>
                        </div>
                    </div>
                ) : null
            }
        </div>
    )
}

export default EditForm
