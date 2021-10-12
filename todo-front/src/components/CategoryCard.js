import React, { useState, useEffect, useRef } from "react";
import { Dropdown, ListGroup, Card, Form, Toast } from "react-bootstrap"
import * as ToDoListAction from "../redux/action/ToDoListAction";
import * as CategoryAction from "../redux/action/CategoryAction";
import {
    Link
  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const CategoryCard = ({ category, index }) => {
    const [show, setShow] = useState(false)
    const [TasksList, setTasksList] = useState([]);
    const [showaddTaskList, setShowAddTaskList] = useState(false)
    const titleTaskList = useRef();
    const descTaskList = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/taskList/TaskListCat/${category.id}`)
            .then((res) => {
                setTasksList(res.data)

            }).catch((e) => console.log(e))
    }, [])

    const fetchData = async () => {

        await axios.get(`http://localhost:5000/api/taskList/TaskListCat/${category.id}`)
            .then((res) => {
                setTasksList(res.data)

            }).catch((e) => console.log(e))

    }
    const addTaskList = () => {
        setShowAddTaskList(false)
        const data = {
            idCat: category.id,
            title: titleTaskList.current.value,
            description: descTaskList.current.value,

        }
        dispatch(ToDoListAction.createTodoList(data))
    }
    const DeleteTaskList = (id) => {
        // setShowAddTaskList(false)

        dispatch(ToDoListAction.deleteTodoList(id))
    }
    const DeleteCategory = (id) => {
        // setShowAddTaskList(false)

        dispatch(CategoryAction.deleteCategory(id))
        dispatch(CategoryAction.listCategorys(true));

    }
    const CloseTaskList = () => {
        setShowAddTaskList(false)
        console.log(titleTaskList.current.value)
        titleTaskList.current.value = ""
        descTaskList.current.value = ""

    }
    fetchData()

    return (
        <Card className="mb-1" id={index}  >
            <div className="row" >
                <div className="col-12">
                    <Card.Header style={{ color: "gray", }}>
                        <div className="row">
                            <div className="col-md-8 col-sm-6" onClick={() => { setShow(!show); if (show === false) { setShowAddTaskList(false) } }} >{category.title}  </div>
                            <div className="col-md-2"><button class="btn btn-outline-dark" onClick={() => { if (show == false) { setShow(true); }; setShowAddTaskList(!showaddTaskList) }} style={{ height: 30, textAlign: "center" }}>+</button></div>

                            <div className="col-md-2"><button class="btn btn-outline-danger" onClick={() => { DeleteCategory(category.id) }} style={{ height: 30, textAlign: "center" }}>-</button></div>



                        </div>
                    </Card.Header>

                </div>


            </div>
            {(show) && (
                <Toast style={{ opacity: 0.3, }}>

                    <Toast.Body>Desciption :{category.description}</Toast.Body>
                </Toast>
            )}

            {(show) ? (
                <ListGroup variant="flush">
                    {TasksList.map((tl, index) => {
                        return (
                            <ListGroup.Item>
                                <div className="row">
                                    <div className="col-10" ><Link to={`/${category.id}/${tl.id}`} style={{textDecoration : "none",color:"black"}}>{tl.title}</Link></div>
                                    <div className="col-2"><button class="btn btn-outline-danger" style={{ height: 30 }} onClick={() => { DeleteTaskList(tl.id) }}>-</button></div>

                                </div>
                            </ListGroup.Item>

                        )

                    })}
                    {(showaddTaskList) ? (<Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control type="title" ref={titleTaskList} placeholder="Task List Title" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" ref={descTaskList} placeholder="Task List Description" rows={3} />
                        </Form.Group>
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <button onClick={addTaskList} class="btn btn-outline-info" style={{ width: "100%" }}>
                                        +
                                    </button></div>
                                <div className="col">
                                    <button onClick={CloseTaskList} class="btn btn-outline-danger" style={{ width: "100%" }}>
                                        -
                                    </button>
                                </div>
                            </div>
                        </div>

                    </Form>) : ('')}


                </ListGroup>) : ('')}

        </Card>

    );
}

export default CategoryCard;