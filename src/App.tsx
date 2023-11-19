import './App.css';
import {useState} from "react";
import TodoList from "./components/TodoList";
import InputField from "./components/InputField";
import {addTodo} from "./store/todoSlice";
import {useAppDispatch} from "./hooks";

function App() {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();

  const addTask = () => {
    dispatch(addTodo(text))
    setText('');
  }

  return (
    <div className="App">
      <InputField text={text} handleInput={setText} handleSubmit={addTask}/>
      <TodoList/>
    </div>
  );
}

export default App;