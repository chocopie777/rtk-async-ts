import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
}

type TodosState = {
  list: Todo[];
}

const initialState: TodosState = {
  list: [],
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      state.list.push({
        id: new Date().toISOString(),
        title: action.payload,
        completed: false,
      })
    },
    removeTodo(state, action: PayloadAction<string>) {
      state.list = state.list.filter(t => t.id !== action.payload);
    },
    toggleTodoComplete(state, action: PayloadAction<string>) {
      const toggledTodo = state.list.find(t => t.id === action.payload);
      if (toggledTodo) {
        toggledTodo.completed = !toggledTodo.completed;
      }
    },
  },
})

export const {addTodo, removeTodo, toggleTodoComplete} = todoSlice.actions;
export const todoReducer = todoSlice.reducer;