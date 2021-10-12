import axios from "axios";
import * as ToDoListConstants from "../constants/ToDoList";

export const listTodosByCategory = (idCat) => async (dispatch) => {

    try {

        // dispatch({type : ToDoListConstants.TODOLISTS_FETCH_START});

        await axios.get(`http://localhost:5000/api/taskList/TaskListCat/${idCat}`)
            .then((res) => {
                console.log(res)
                dispatch({
                    type: ToDoListConstants.TODOLISTS_FETCH_SUCCESS,
                    payload: res.data,
                });
            })
    } catch (error) {
        dispatch({
            type: ToDoListConstants.TODOLISTS_FETCH_ERROR,
            payload: error.response && error.response.data.error
                ? error.response.data.error : error.message
        });
    }

};

export const TodoList = (id) => async (dispatch) => {
    try {
        dispatch({ type: ToDoListConstants.TODOLIST_FETCH_START });

        await axios.get(`http://localhost:5000/api/taskList/${id}`).then((res) => {
            console.log(res.data)
            dispatch({
                type: ToDoListConstants.TODOLIST_FETCH_SUCCESS,
                payload: res.data
            });
        });
    } catch (error) {
        dispatch({
            type: ToDoListConstants.TODOLIST_FETCH_FAIL,
            payload:
                error.response && error.response.data.error
                    ? error.response.data.error
                    : error.message,
        });
    }
};


export const deleteTodoList = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ToDoListConstants.DELETE_TODOLIST_START });





        await axios.delete(`http://localhost:5000/api/taskList/${id}`).then((resp) => {
            dispatch({
                type: ToDoListConstants.DELETE_TODOLIST_SUCCESS,
            });
        });
    } catch (error) {
        dispatch({
            type: ToDoListConstants.DELETE_TODOLIST_FAIL,
            payload:
                error.response && error.response.data.error
                    ? error.response.data.error
                    : error.message,
        });
    }
};

export const createTodoList = (formData) => async (dispatch, getState) => {
    console.log(formData)

    try {
        dispatch({ type: ToDoListConstants.CREATE_TODOLIST_START });


        await axios.post("http://localhost:5000/api/taskList/", formData).then((resp) => {
            dispatch({
                type: ToDoListConstants.CREATE_TODOLIST_SUCCESS,
            });
        });
    } catch (error) {
        dispatch({
            type: ToDoListConstants.CREATE_TODOLIST_FAIL,
            payload:
                error.response && error.response.data.error
                    ? error.response.data.error
                    : error.message,
        });
    }
};

export const editTodoList = (id, UpdatedData) => async (dispatch, getState) => {
    try {
        dispatch({ type: ToDoListConstants.EDIT_TODOLIST_START });

        await axios
            .put(`http://localhost:5000/api/taskList/${id}`, UpdatedData)
            .then((resp) => {
                const response = resp.data
                dispatch({
                    type: ToDoListConstants.EDIT_TODOLIST_SUCCESS,

                    payload: "Task List updated successfully",
                });
            });
    } catch (error) {
        dispatch({
            type: ToDoListConstants.EDIT_TODOLIST_FAIL,
            payload:
                error.response && error.response.data.error
                    ? error.response.data.error
                    : error.message,
        });
    }
};
