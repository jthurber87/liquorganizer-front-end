import React, { useState, useEffect } from 'react'
import { Form, Button, Container } from 'react-bootstrap'

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
              <div className="card">
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicSpirit">
                    <Form.Label htmlFor="spirit">Spirit</Form.Label>
                    <Form.Control type="text" name='spirit' id='spirit' value={input.spirit} onChange={handleChange}/>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicBrand">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control type="text" name='brand' id='brand' value={input.brand} onChange={handleChange}/>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCount">
                    <Form.Label>Count</Form.Label>
                    <Form.Control type="number" name='count' id='count' value={input.count} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicNotes">
                    <Form.Label>Notes</Form.Label>
                    <Form.Control type="text" as="textarea" name='notes' id='notes' value={input.notes} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicImg">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="text" name='img' value={input.img} onChange={handleChange} />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                  <Button variant="danger" onClick={toggleDeleteModal}>Delete</Button>
              </Form>
            </div>
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

// function Modal(props) {
//     return(<>
//         <h1>Are you sure delete {props.bottles.spirit} ?</h1>
//         <div className='details'>
//             <p>Brand: {props.botle</p>
//             <p></p>
//             <p></p>
//             <p></p>
//         </div>
//         <button>Delete</button>
//         <button>Keep it</button>
//         </>
//     )
// }

export default EditForm
