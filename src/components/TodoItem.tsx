import React, {FC} from 'react';
import {removeTodo, toggleTodoComplete} from "../store/todoSlice";
import {useAppDispatch} from "../hooks";

interface  TodoItemProps {
  id: string;
  title: string,
  completed: boolean,
}

const TodoItem: FC<TodoItemProps> = ({id, title, completed}) => {
  const dispatch = useAppDispatch();

  return (
    <li>
      <input type="checkbox" checked={completed} onChange={() => dispatch(toggleTodoComplete(id))}/>
      <span>{title}</span>
      <span className='delete' onClick={() => dispatch(removeTodo(id))}>&times;</span>
    </li>
  );
};

export default TodoItem;
