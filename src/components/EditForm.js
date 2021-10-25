import React, { useState, useEffect } from 'react'
import { Form, Button, Container, Modal } from 'react-bootstrap'



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
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getBottleToEdit = async (id) => {
        try {
            const id = props.match.params.id;
            const foundBottle = await fetch("https://liquorganizer-back-end.herokuapp.com/bottles/" + id)
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

        const updateBottle = await fetch("https://liquorganizer-back-end.herokuapp.com/bottles/" + id, configs)
        console.log(updateBottle)
        const parsedUpdateBottle = await updateBottle.json();
        console.log('after update:', parsedUpdateBottle.spirit);
        props.history.push('/bottles/')
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

    const deleteBottle = async (id) => {
        try {
            const deleteBottle = await fetch('https://liquorganizer-back-end.herokuapp.com/bottles/' + id, {
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
            {loading ? (
                <h3>Loading...</h3>
            ) : (
                <div className="card">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicSpirit">
                            <Form.Label htmlFor="spirit">Spirit</Form.Label>
                            <Form.Control type="text" name='spirit' id='spirit' value={input.spirit} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicBrand">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control type="text" name='brand' id='brand' value={input.brand} onChange={handleChange} />
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
                        <div className="cancel-submit">
                            <Button variant="danger" onClick={handleShow}>Delete</Button>
                            <Button variant="success" type="submit">Update</Button>
                        </div>
                    </Form>

                    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>Last Confirmation to delete</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Are you sure you want to delete this liquor?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                            <Button variant="danger" onClick={() => deleteBottle(input._id)}>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            )}
        </div>
    )
}



export default EditForm
