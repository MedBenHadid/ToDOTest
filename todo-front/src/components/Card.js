import React, { useState } from 'react';
import EditTask from '../modals/EditTask'
import { Dropdown, ListGroup, Card, Form } from "react-bootstrap"
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { } from '@fortawesome/free-solid-svg-icons'

const Cards = ({ taskObj, index, deleteTask, updateListArray }) => {
    const [modal, setModal] = useState(false);
    const [show, setShow] = useState(false)
    const [done, setDone] = useState((taskObj.status == "done") ? true : false)

    const toggle = () => {
        setModal(!modal);
    }

    const updateTask = (obj, index) => {
        updateListArray(obj, index)
    }

    const handleDelete = (taskObj) => {
        deleteTask(taskObj, index)
    }


    const color = [
        { name: '1', value: '1', color: "#bf505d" },
        { name: '3', value: '2', color: "#9750bf" },
        { name: '3', value: '3', color: "#5067ba" },
        { name: '4', value: '4', color: "#4eb583" },
        { name: '5', value: '5', color: "#d1cc47" },


    ].find((c, i) => { return taskObj.priority === c.value })
    var d = new Date(taskObj.date).toLocaleString();
    const handelCheck = () => {
        setDone(!done);
        if (done) {
            taskObj.status = "done"
        } else {
            taskObj.status = "todo"

        }
        console.log(done)
    }
    return (
        <div class="card-wrapper mr-5" >

            <Card>
                <span style={{ backgroundColor: color.color, height: 4 }}></span>
                <div className="row" >
                    <div className="col-10">
                        <Card.Header style={{ color: "gray", width: "125%" }} onClick={() => { setShow(!show) }}>

                            {(!done) ? (taskObj.name) : (<span style={{ textDecoration: "line-through" }}>{taskObj.name}</span>)}
                        </Card.Header></div>
                    <div className="col-2">
                        <Form.Group className="mt-2" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" checked={done} onChange={handelCheck} />
                        </Form.Group>
                    </div>

                </div>


                {(show) ? (<ListGroup variant="flush">
                    <ListGroup.Item> <label>description:</label>

                        <div >
                            {taskObj.description}
                        </div></ListGroup.Item>
                    <ListGroup.Item> <label>date: </label>

                        <div >
                            <div className="row" style={{ width: 280 }}>
                                <div className="col-7">      {d}</div>
                                <div className="col-5">
                                    <i style={{ color: "green" }} class="fal fa-pen-square fa-2x" onClick={() => setModal(true)} ></i>
                                    &nbsp;&nbsp; <i style={{ color: "red" }} class="fal fa-minus-octagon fa-2x" onClick={() => { handleDelete(taskObj) }} ></i>

                                </div>

                            </div>

                        </div></ListGroup.Item>
                </ListGroup>) : ('')}

            </Card>

            <EditTask modal={modal} toggle={toggle} updateTask={updateTask} taskObj={taskObj} />
        </div>
    );
};

export default Cards;