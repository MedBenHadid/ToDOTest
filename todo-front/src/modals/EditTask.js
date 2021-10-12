import React, { useState , useEffect} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ToggleButton, ButtonGroup } from "react-bootstrap"
import DatePicker from "react-datepicker";

const EditTaskPopup = ({modal, toggle, updateTask, taskObj}) => {
    const [taskName, setTaskName] = useState(taskObj.name);
    const [description, setDescription] = useState(taskObj.description);
    const [startDate, setStartDate] = useState(taskObj.date);
    const [radioValue, setRadioValue] = useState(taskObj.priority);
    const [status, setStatus] = useState(taskObj.status);
    const [Lid, setLid] = useState(taskObj.Lid);
    const [id, setId] = useState(taskObj.id);

const priority = [
    { name: '1', value: '1', color: "#bf505d" },
    { name: '3', value: '2', color: "#9750bf" },
    { name: '3', value: '3', color: "#5067ba" },
    { name: '4', value: '4', color: "#4eb583" },
    { name: '5', value: '5', color: "#d1cc47" },

];    
const handleChange = (e) => {
        
        const {name, value} = e.target

        if(name === "taskName"){
            setTaskName(value)
        }else{
            setDescription(value)
        }


    }

    useEffect(() => {
        setLid(taskObj.Lid)

        setTaskName(taskObj.name)
        setDescription(taskObj.description)
        setStartDate(taskObj.date)
        setRadioValue(taskObj.priority)
        setStatus(taskObj.status)

    },[])

    const handleUpdate = (e) => {
        e.preventDefault();
        let tempObj = {}
        taskObj["Lid"] = Lid

        taskObj["name"] = taskName
        taskObj["description"] = description
        taskObj["priority"] = radioValue
        taskObj["date"] = startDate
        taskObj["Todo"] = status

        updateTask(taskObj,Lid)
        toggle()

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
                    <div><DatePicker selected={new Date()} onChange={(date) => setStartDate(date)} /></div>
                    </div>
              <br/>


                   </div>               </div>

        </ModalBody>
        <ModalFooter>
            <Button color="primary" onClick={handleUpdate}>Create</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
    </Modal>
    );
};

export default EditTaskPopup;