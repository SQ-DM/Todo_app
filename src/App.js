import React from "react";
import TodoItems from "./components/todo-items/TodoItems";
import TodoList from "./components/todo-list/TodoList";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <ul className="wrapper__nav">
            <li className="nav__li">
              <Link className="nav__link" to="/form">
                Form
              </Link>
            </li>
            <li className="nav__li">
              <Link className="nav__link" to="/tasks">
                Task
              </Link>
            </li>
          </ul>
          <Routes>
            <Route path="/form" element={<TodoList />} />
            <Route path="/tasks" element={<TodoItems />} />
          </Routes>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
