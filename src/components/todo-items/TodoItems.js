import React, { useState, useEffect, useMemo, useCallback } from "react";
import "./style.css";

//-->компонент получает данные с сервера и рендерит эти данные

function TodoItems() {
  const [tasks, setTasks] = useState([]);
  const [active, setActive] = useState(false);

  //--> функция меняет состояние свойства deed по переданному id
  function changeDeed(id) {
    const idx = tasks.findIndex((item) => item.id === id);
    const oldTask = tasks[idx];
    const newTaskDeed = { ...oldTask, deed: !oldTask.deed };

    const newTasks = [
      ...tasks.slice(0, idx),
      newTaskDeed,
      ...tasks.slice(idx + 1),
    ];

    return setTasks(newTasks);
  }

  //--> функция удаляет через слушатель определенный элемент с сервера
  const deleteTask = useCallback(
    (value) => {
      fetch(`http://localhost:3001/tasks/${value}`, {
        method: "DELETE",
        body: null,
      });
      setActive(!active);
    },
    [active]
  );

  //--> хук позволяет рендерить данные при загрузке страницы
  useEffect(() => {
    const getFetchTasks = async () => {
      console.log("fetching");
      const response = await fetch("http://localhost:3001/tasks", {
        method: "GET",
        body: null,
        headers: { "Content-Type": "application/json" },
      });
      const req = await response.json();
      setTasks(req);
    };
    getFetchTasks();
  }, [active]);

  const tasksContent = tasks
    ? Array.from(tasks).map((item, index) => (
        <table key={index} className="wrapper">
          <tbody className="wrapper__list">
            <td>
              <p className="wrapper__p">{item.stateLineTime}</p>
            </td>
            <td>
              <p className="wrapper__date">
                {item.deed && <del>{item.task} </del>}
                {!item.deed && item.task}
              </p>
            </td>
            <td>
              <p className="wrapper__p">{item.description}</p>
            </td>
            <td>
              {item.sFile.selectedFile ? (
                <img
                  src={item.sFile.selectedFile}
                  width="150px"
                  height="150px"
                />
              ) : null}
            </td>
            <td className="button__group">
              <button
                className="button__add"
                title="Пометить как сделанное"
                onClick={() => changeDeed(item.id)}>
                &#9745;
              </button>
              <button
                className="button__delete"
                title="Удалить"
                onClick={() => deleteTask(item.id)}>
                &#9746;
              </button>
            </td>
          </tbody>
        </table>
      ))
    : null;

  return tasksContent;
}

export default TodoItems;
