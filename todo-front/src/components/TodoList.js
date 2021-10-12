import React, { useEffect, useRef, useState } from 'react';
import { DragDropContext, Droppable, Draggable, } from "react-beautiful-dnd";
import _ from "lodash";
import CreateTask from '../modals/CreateTask'
import { v4 } from "uuid";
import Cards from './Card'
import exportFromJSON from 'export-from-json'
import { Button, Form, Toast } from "react-bootstrap"
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import * as ToDoListAction from "../redux/action/ToDoListAction";
import axios from "axios";
import { storage } from "../firebase/firebase"




function TodoList() {
  const [modal, setModal] = useState(false);

  const [text, setText] = useState("")
  const [showA, setShowA] = useState(false);
  const [OnUpdate, setOnUpdate] = useState(false);

  const [title, setTitle] = useState("")

  const [description, setDescription] = useState("")
  const toggleShowA = () => setShowA(!showA);
  const [TodoListState, setTodoListState] = useState({})
  const { id, idCat } = useParams();
  const dispatch = useDispatch();

  //img to firebase
  const allInputs = { imgUrl: '' }
  //   const [imageAsFile, setImageAsFile] = useState('')
  //   const [imageAsUrl, setImageAsUrl] = useState(allImputs)
  //   const handleImageAsFile = (e) => {
  //     const image = e.target.files[0]
  //     setImageAsFile(imageFile => (image))
  // }
  const initState = {
    "todo": {
      title: "Todo",
      items: []
    },
    "inprogress": {
      title: "In Progress",
      items: []
    },
    "done": {
      title: "Completed",
      items: []
    }
  }
  useEffect(() => {
    setState(initState)

    axios.get(`http://localhost:5000/api/taskList/${id}`).then((res) => {
      setTodoListState(res.data[0])
      setTitle(res.data[0].title)
      if (res.data[0].taskList != null) {
        setState(JSON.parse(res.data[0].taskList))
      }
      setDescription(res.data[0].description)
    });


  }, [id]);



  const [state, setState] = useState(initState)
  useEffect(() => {
    saveTaskList()
  }, [state, title, description])

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) {
      return
    }

    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return
    }

    // Creating a copy of item before removing it from state
    const itemCopy = { ...state[source.droppableId].items[source.index] }

    setState(prev => {
      prev = { ...prev }
      // Remove from previous items array
      prev[source.droppableId].items.splice(source.index, 1)


      // Adding to new items array location
      prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)

      return prev
    })
  }
  const toggle = () => {
    setModal(!modal);
  }


  const addItem = (taskObj) => {
    setState(prev => {
      return {
        ...prev,
        todo: {
          title: "Todo",
          items: [
            {
              Lid: v4(),
              id: taskObj.id,
              name: taskObj.name,
              description: taskObj.name,
              priority: taskObj.priority,
              date: taskObj.date,
              status: taskObj.status,
              files: taskObj.files
            },
            ...prev.todo.items
          ]
        }
      }
    })

    setText("")
  }



  const deleteTask = (obj) => {
    if (obj.status === "todo") {

      setState(prev => {
        return {
          ...prev,
          todo: {
            title: "Todo",
            items: state.todo.items.filter((item) => { return item.id !== obj.id })
          }
        }
      })
    } else if (obj.status === "inprogress") {

      setState(prev => {
        return {
          ...prev,
          inprogress: {
            title: "In Progress",
            items: state.inprogress.items.filter((item) => { return item.id != obj.id })
          }
        }
      })
    } else if (obj.status === "done") {

      setState(prev => {
        return {
          ...prev,
          done: {
            title: "Completed",
            items: state.done.items.filter((item) => { return item.id != obj.id })
          }
        }
      })
    }

  }

  // const handleFireBaseUpload = e => {
  //       e.preventDefault()
  //     console.log('start of upload')
  //     // async magic goes here...
  //     if(imageAsFile === '') {
  //       console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
  //     }
  //     const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
  //     //initiates the firebase side uploading 
  //     uploadTask.on('state_changed', 
  //     (snapShot) => {
  //       //takes a snap shot of the process as it is happening
  //       console.log(snapShot)
  //     }, (err) => {
  //       //catches the errors
  //       console.log(err)
  //     }, () => {
  //       // gets the functions from storage refences the image storage in firebase by the children
  //       // gets the download url then sets the image from firebase as the value for the imgUrl key:
  //       storage.ref('images').child(imageAsFile.name).getDownloadURL()
  //        .then(fireBaseUrl => {
  //          setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
  //        })
  //     })
  //     }
  const updateListArray = (obj, index) => {

  }

  const exports = (exportType) => {
    const fileName = 'InProgress'
    const Data = state.inprogress.items;

    const data = JSON.parse(JSON.stringify(Data))
    exportFromJSON({ data, fileName, exportType })
    setShowA(false)
  }
  const saveTaskList = () => {
    console.log(state)
    console.log(title)
    const UpdatedDate = {
      title: title,
      description: description,
      taskList: JSON.stringify(state),
      idCat: idCat
    }

    dispatch(ToDoListAction.editTodoList(id, UpdatedDate));

  }
  return (
    <div>
      {(!OnUpdate) ? (<h3 onDoubleClick={() => { setOnUpdate(true) }}>{title} ||  {description} </h3>) :
        (<>
          <Form.Group className="d-flex flex-row" controlId="exampleForm.ControlInput1">
            <Form.Control type="title" value={title} onChange={(e) => { setTitle(e.target.value) }} placeholder="Task List Title" style={{ width: 300, height: 40 }} />
            <Form.Control as="textarea" value={description} placeholder="Task List Description" onChange={(e) => { setDescription(e.target.value) }} rows={3} style={{ width: 300, height: 40 }} />
            <button class="btn btn-outline-warning" onClick={() => { setOnUpdate(false) }}>Save</button>
          </Form.Group>

        </>)}
      <div className="App mt-5">
        <div>
          <CreateTask toggle={toggle} modal={modal} save={addItem} />
        </div>
        <DragDropContext onDragEnd={handleDragEnd}>

          {(state.todo) ? (_.map(state, (data, key) => {
            return (
              <div key={key} className={"column"} >
                <div className="container">
                  <div className="row">
                    {(showA && data.title == "In Progress") && (<Toast show={showA} onClose={toggleShowA}>

                      <Toast.Header>
                        <img
                          src="holder.js/20x20?text=%20"
                          className="rounded me-2"
                          alt=""
                        />
                        <strong className="me-auto">XLS or CSV</strong>
                      </Toast.Header>
                      <Toast.Body><button className='btn btn-outline-success' onClick={() => exports('xls')}>XLS</button>&nbsp;&nbsp;&nbsp;<button onClick={() => exports('csv')} className='btn btn-outline-dark'>CSV</button></Toast.Body>
                    </Toast>
                    )}
                    <div className="col-9">
                      <h3>{data.title}</h3>
                    </div>

                    <div className="col-3">

                      {(data.title == "In Progress") ? (<div>
                        <i class="fal fa-download fa-2x" onClick={toggleShowA} ></i>

                      </div>) : ('')}

                    </div>

                  </div>
                </div>

                {/* <form onSubmit={handleFireBaseUpload}> */}

                <Droppable droppableId={key}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={"droppable-col"}
                        style={{ backgroundColor: "#F1ECEB" }}
                      >
                        <div class="container">
                        <div class="row">
                        {data.items.map((el, index) => {
                          return (<div className="col-sm-12">
                            <Draggable key={el.Lid} index={index} draggableId={el.Lid}  >
                              {(provided, snapshot) => {
                                if (snapshot.draggingOver != null) {
                                  el.status = snapshot.draggingOver
                                }
                                return (
                                  <div
                                    className={`item ${snapshot.isDragging && "dragging"}`}
                                    
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <Cards taskObj={el} index={index} deleteTask={deleteTask} updateListArray={updateListArray} />

                                  </div>
                                )
                              }}
                            </Draggable>
                        </div>  )
                        })}</div></div>
                        {provided.placeholder}
                        {(data.title == "Todo") ? (<button class="btn btn-outline-success" onClick={() => setModal(true)} >+</button>) : ('')}

                      </div>
                    )
                  }}
                </Droppable>
                {/* </form> */}
              </div>
            )
          })) : ("add task")}
        </DragDropContext>
      </div>

    </div>
  );
}

export default TodoList;
