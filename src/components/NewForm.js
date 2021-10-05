import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap'

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
            props.history.push('/bottles')
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
      </Form>


      </div>
    )
};

export default NewForm;
