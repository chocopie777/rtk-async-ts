import './App.css';
import {useEffect, useState} from "react";
import TodoList from "./components/TodoList";
import InputField from "./components/InputField";
import {useAppDispatch, useAppSelector} from "./hooks";
import {addNewTodo, fetchTodos} from "./store/todoSlice";

function App() {
  const [text, setText] = useState('');
  const {loading, error} = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();

  const addTask = () => {
    dispatch(addNewTodo(text))
    setText('');
  }

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className="App">
      <InputField text={text} handleInput={setText} handleSubmit={addTask}/>
      {loading && (
        <h2>
          Loading...
        </h2>
      )}
      {error && (
        <h2>An error occurred: {error}</h2>
      )}
      <TodoList/>
    </div>
  );
}

export default App;