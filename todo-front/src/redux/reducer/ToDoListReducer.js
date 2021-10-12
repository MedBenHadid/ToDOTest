import * as ToDoListConstants from "../constants/ToDoList";


export const listTodosByCategory = (state = { listTodos: [] }, action) => {
    switch (action.type) {
        case ToDoListConstants.TODOLISTS_FETCH_START:
            return {
                loading: true,
                listTodos: [],

            };
        case ToDoListConstants.TODOLISTS_FETCH_SUCCESS:
            return {
                listTodos: action.payload.listTodos,
                success: true,

            };
        case ToDoListConstants.TODOLISTS_FETCH_ERROR:
            return {
                error: action.payload,
            };
        default: return state;
    }
};

export const TodoList = (state = { TodoList: {} }, action) => {
    switch (action.type) {
        case ToDoListConstants.TODOLIST_FETCH_START:
            return {
                loading: true,
                TodoList: {}
            }
        case ToDoListConstants.TODOLIST_FETCH_START:
            return {
                TodoList: action.payload.TodoList,
                success: true
            }
        case ToDoListConstants.TODOLIST_FETCH_FAIL:
            return {
                error: action.payload
            }
        default: return state;
    }
}

export const deleteTodoList = (state = {}, action) => {
    switch (action.type) {
        case ToDoListConstants.DELETE_TODOLIST_START:
            return {
                loading: true,
            };
        case ToDoListConstants.DELETE_TODOLIST_SUCCESS:
            return {
                success: true,
            };
        case ToDoListConstants.DELETE_TODOLIST_FAIL:
            return {
                error: action.payload,
            };

        case ToDoListConstants.DELETE_TODOLIST_RESET:
            return {};

        default:
            return state;
    }
};

export const createTodoList = (state = {}, action) => {
    switch (action.type) {
        case ToDoListConstants.CREATE_TODOLIST_START:
            return {
                loading: true,
            };
        case ToDoListConstants.CREATE_TODOLIST_SUCCESS:
            return {
                success: true,
            };
        case ToDoListConstants.CREATE_TODOLIST_FAIL:
            return {
                error: action.payload,
            };

        case ToDoListConstants.CREATE_TODOLIST_RESET:
            return {};

        default:
            return state;
    }
};

export const editTodoList = (state = {}, action) => {
    switch (action.type) {
        case ToDoListConstants.EDIT_TODOLIST_START:
            return {
                loading: true,
            };
        case ToDoListConstants.EDIT_TODOLIST_SUCCESS:
            return {
                success: true,
            };
        case ToDoListConstants.EDIT_TODOLIST_FAIL:
            return {
                error: action.payload,
            };
        case ToDoListConstants.EDIT_TODOLIST_RESET:
            return {};
        default:
            return state;
    }
};
