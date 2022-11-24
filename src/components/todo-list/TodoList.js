import React, { useState } from "react";
import "./style.css";

//--> компонент получения данных введенных пользователем

function TodoList() {
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [selectFile, setSelectFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dateEnd, setDateEnd] = useState("");

  //--> функции получения данных с инпутов
  const onHandleTextChange = (e) => {
    e.preventDefault();
    return setText(e.target.value);
  };

  const onHandleDescriptionChange = (e) => {
    e.preventDefault();
    return setDescription(e.target.value);
  };

  const onHandleFileChange = async (e) => {
    e.preventDefault();
    const sFile = e.target.files[0];
    const base64 = await convertBase64(sFile);
    setSelectFile(base64);
  };

  const onHandleAddSelectFile = async (e) => {
    e.preventDefault();
    setSelectedFile(selectFile);
  };

  const onHandleDateChange = (e) => {
    e.preventDefault();
    setDateEnd(e.target.value);
  };

  //--> функция конвертации данных выбранных файлов
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  //--> функция оправки данных на сервер
  const onHandleSendForm = (e) => {
    e.preventDefault();
    const date = new Date();

    const newTask = {
      createTime: date.toLocaleString(),
      stateLineTime: dateEnd,
      task: text,
      description: description,
      deed: false,
      key: date.getTime(),
      sFile: { selectedFile },
    };

    const request = new Request("http://localhost:3001/tasks", {
      method: "POST",
      body: JSON.stringify(newTask),
      headers: { "Content-Type": "application/json" },
    });
    fetch(request);
    clearForm();
  };

  //--> функция сброса данных в ипутах
  const clearForm = () => {
    setText("");
    setDescription("");
    setSelectFile(null);
    setDateEnd("");
  };

  return (
    <form className="todoListMain" onSubmit={onHandleSendForm}>
      <h4>Todo Form</h4>
      <div>
        <label className="todoList_label">Заголовок</label>
        <div>
          <input
            className="todoList__input"
            type="text"
            value={text}
            onChange={onHandleTextChange}
          />
        </div>
      </div>
      <div>
        <label className="todoList_label">Примечание</label>
        <div className="col-sm-10">
          <textarea
            className="todoList__input"
            type="text"
            value={description}
            onChange={onHandleDescriptionChange}></textarea>
        </div>
      </div>
      <div>
        <label className="todoList_label">Сделать до</label>
        <div className="col-sm-10">
          <input
            className="todoList__input"
            type="date"
            value={dateEnd}
            onChange={onHandleDateChange}></input>
        </div>
      </div>
      <div>
        <label className="todoList_label">Выбранный файл</label>
        <div>
          <input
            className="todoList__input"
            type="file"
            onChange={onHandleFileChange}
          />
        </div>
      </div>
      <div className="todoList__btn__group">
        <button className="todoList__btn" type="button" onClick={clearForm}>
          Сбросить
        </button>
        <button
          className="todoList__btn"
          type="button"
          onClick={onHandleAddSelectFile}>
          Добавить файл
        </button>
        <button className="todoList__btn" type="submit">
          Отправить
        </button>
      </div>
    </form>
  );
}

export default TodoList;
