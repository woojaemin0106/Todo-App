import { useState } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: "밥먹기", completed: false },
    { id: 1, content: "코딩 공부하기", completed: false },
    { id: 2, content: "잠 자기", completed: false },
  ]);

  return (
    <div className="container">
      <h1 className="header"> todo app </h1>
      <TodoList todoList={todoList} setTodoList={setTodoList} />
      <hr />
      <TodoInput todoList={todoList} setTodoList={setTodoList} />
    </div>
  );
}

function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState("");
  const addTodo = () => {
    if (inputValue.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      content: inputValue,
      completed: false,
    };
    setTodoList([...todoList, newTodo]);
    setInputValue("");
  };
  return (
    <>
      <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button
        className="button"
        onClick={() => {
          const newTodo = { id: Number(new Date()), content: inputValue };
          const newTodoList = [...todoList, newTodo];
          setTodoList(newTodoList);
          setInputValue("");
        }}
      >
        추가하기
      </button>
    </>
  );
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul>
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  );
}

function Todo({ todo, setTodoList }) {
  const [inputValue, setInputValue] = useState("");
  const [edit, setEdit] = useState(false);
  const toggleComplete = () => {
    setTodoList((prev) =>
      prev.map((el) =>
        el.id === todo.id ? { ...el, completed: !el.completed } : el
      )
    );
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={toggleComplete}
      />
      <span
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          color: todo.completed ? "gray" : "black",
        }}
      >
        {todo.content}
      </span>
      {edit && (
        <input
          className="asdwaqe"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
      )}
      <button
        className="pls-button"
        onClick={() => {
          if (edit) {
            setTodoList((prev) =>
              prev.map((el) =>
                el.id === todo.id ? { ...el, content: inputValue } : el
              )
            );
          }
          setEdit(!edit);
        }}
      >
        {edit ? "저장" : "수정"}
      </button>
      <button
        className="del-button"
        onClick={() => {
          setTodoList((prev) => {
            return prev.filter((el) => el.id !== todo.id);
          });
        }}
      >
        삭제
      </button>
    </li>
  );
}

export default App;
