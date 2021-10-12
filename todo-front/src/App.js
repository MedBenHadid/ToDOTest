import React, {useState} from 'react';
import './App.css';
import Category from './components/Category';
import TodoList from './components/TodoList';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  
  return (
    <Router>

      <div className="container mt-4">
        <div className="row" > 
          <div className="col-3 " style={{marginTop:"6%"}}> 
          <Category/>
          </div>
          <div className="col-9">  
          <Switch>  
          <Route exact path="/:idCat/:id">
              <TodoList/>
              </Route>
              <Route exact path="/">
                <h2 style={{textAlign :"center",marginTop : "30%",color:"gray"}}>Please select Task List</h2>
              </Route>
         </Switch>
   
        </div>
      </div>
    </div>
    </Router>

  );
}

export default App;
