import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ToggleButton, ButtonGroup } from "react-bootstrap"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {v4} from "uuid";
import Dropzone from "react-dropzone";

const CreateTaskPopup = ({ modal, toggle, save }) => {
    const [id, setId] = useState("");

    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [radioValue, setRadioValue] = useState('1');
    const [selectedFiles,setSelectedFiles]= useState([])

    const handleChange = (e) => {

        const { name, value } = e.target

        if (name === "taskName") {
            setTaskName(value)
        } else {
            setDescription(value)
        }


    }

    const handleSave = (e) => {

        e.preventDefault()
        let taskObj = {}
        taskObj["id"] = v4()
        taskObj["name"] = taskName
        taskObj["description"] = description
        taskObj["priority"] = radioValue
        taskObj["date"] = startDate
        taskObj["status"] = "todo"
        taskObj["files"] = JSON.stringify(selectedFiles)

        save(taskObj)
        setId("")
        setTaskName("")
        setDescription("")
        setStartDate(new Date())
        setRadioValue('1')
        toggle()
    }
    const priority = [
        { name: '1', value: '1', color: "#bf505d" },
        { name: '3', value: '2', color: "#9750bf" },
        { name: '3', value: '3', color: "#5067ba" },
        { name: '4', value: '4', color: "#4eb583" },
        { name: '5', value: '5', color: "#d1cc47" },

    ];
    const handleAcceptedFiles = files => {
        files.map(file =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
                formattedSize: formatBytes(file.size),
            })
        )

        setSelectedFiles(files)
            console.log(files)
    //    setProductInfo({...productInfo,productImage:JSON.stringify(files)});

    }
    const formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return "0 Bytes"
        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
    }
    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create Task</ModalHeader>
            <ModalBody>

                <div className="form-group">
                    <label>Task Name</label>
                    <input type="text" className="form-control" value={taskName} onChange={handleChange} name="taskName" />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea rows="5" className="form-control" value={description} onChange={handleChange} name="description"></textarea>
                </div>
                <div className="form-group">
                    <label>Priority level</label>
                    <div>   <ButtonGroup>
                        {priority.map((radio, idx) => (
                            <ToggleButton
                                key={idx}
                                id={`radio-${idx}`}
                                type="radio"
                                style={{ color: (radio.color=="danger")?'red':radio.color, borderColor: radio.color, backgroundColor: "transparent" }}
                                className={`btn btn-outline-${radio.color}`}

                                name="radio"
                                value={radio.value}
                                checked={radioValue === radio.value}
                                onChange={(e) => setRadioValue(e.currentTarget.value)}
                            >
                                {radio.name}
                            </ToggleButton>
                        ))}
                    </ButtonGroup> 
                    <br/>
                        <div className="form-group">
                        Date of completion
                        <label>Date of completion</label>
                        <div><DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /></div>
                        </div>
                  <br/>
                  <div className="form-group b-1" >
                        <label>enclosed : <br/>
                        <Dropzone
                                                onDrop={acceptedFiles =>
                                                    handleAcceptedFiles(acceptedFiles)
                                                }
                                                                                      >
                                                {({ getRootProps, getInputProps }) => (
                                                    <div>
                                                        <div
                                                            className="dz-message needsclick"
                                                            {...getRootProps()}
                                                        >
                                                            <input {...getInputProps()} />
                                                            <div className="dz-message needsclick"  
                                                             style={
                                                    {
                                                     border: '2px solid gray',
                                                     borderRadius : 10,
                                                     height : 100,width : 400
                                                    }
                                                  }   >
                                                                <div className="mb-3">
                                                                    <i className="display-4 text-muted bx bxs-cloud-upload" />
                                                                </div>
                                                                <br/>
                                                                <h4>Drop files here or click to upload.</h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </Dropzone>
                        </label>
                        </div>

                       </div>               </div>

            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSave}>Update</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

export default CreateTaskPopup;