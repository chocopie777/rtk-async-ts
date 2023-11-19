import React, {FC} from 'react';
import TodoItem from "./TodoItem";
import {useSelector} from "react-redux";
import {useAppSelector} from "../hooks";

const TodoList: FC = () => {
  const todos = useAppSelector(state => state.todos.list);
  return (
    <ul>
      {todos.map(todo => <TodoItem key={todo.id} title={todo.title} id={todo.id} completed={todo.completed} />)}
    </ul>
  );
};

export default TodoList;