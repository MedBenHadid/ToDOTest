import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import {v4} from "uuid";


import {
  listTodosByCategory,
  TodoList,

  deleteTodoList,
  createTodoList,
  editTodoList,
} from "./redux/reducer/ToDoListReducer";
import {
  listCategorys,
  Category,

  deleteCategory,
  createCategory,
  editCategory,
} from "./redux/reducer/CategoryReducer";



const rootReducer = combineReducers({
  
  listTodos: listTodosByCategory,
  TodoList: TodoList,
  deleteTodoList: deleteTodoList,
  createTodoList: createTodoList,
  editTodoList: editTodoList,
  
  listCategory: listCategorys,
  Category: Category,
  deleteCategory: deleteCategory,
  createCategory: createCategory,
  editCategory: editCategory,
  
});


const init = [{
    Lid: v4(),
    id:v4(),
    name: "Clean the house",
    description : "sqjdhodqd",
    priority : "2",
    date : "Sat Oct 09 2021 19:50:22 GMT+0100 (Central European Standard Time)",
    status : "todo"
  
  },
  {
    Lid: v4(),
    id:v4(),
      name: " Wash the car dsd",
      priority : "2",
      description : "sqjdhodqd",
      priority : "2",
      date : "Sat Oct 09 2021 19:50:22 GMT+0100 (Central European Standard Time)",
      status : "todo"
  
    }
  ]
const initialState = {
  TodoList:{
    "todo": {
      title: "Todo",
      items: init
    },
    "inprogress": {
      title: "In Progress",
      items: []
    },
    "done": {
      title: "Completed",
      items: []
    }
  },
};

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
