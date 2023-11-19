import {AnyAction, createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
}

type TodosState = {
  list: Todo[];
  loading: boolean,
  error: string | null,
}

const initialState: TodosState = {
  list: [],
  loading: false,
  error: null,
}

export const fetchTodos = createAsyncThunk<Todo[], undefined, { rejectValue: string }>(
  'todos/fetchTodos',
  async function (_, thunkAPI) {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
    if (!response.ok) {
      return thunkAPI.rejectWithValue('ServerError!');
    }
    const data = await response.json();
    return data;
  }
)

export const addNewTodo = createAsyncThunk<Todo, string, { rejectValue: string }>(
  'todos/addNewTodo',
  async function (text, thunkAPI) {
    const todo = {
      title: text,
      userId: 1,
      completed: false,
    };
    const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(todo),
    })
    if (!response.ok) {
      return thunkAPI.rejectWithValue('Can\'t add task. Server error.');
    }
    return (await response.json()) as Todo;
  }
)

export const toggleStatus = createAsyncThunk<Todo, string, { rejectValue: string, state: { todos: TodosState } }>(
  'todos/toggleStatus',
  async function (id, thunkAPI) {
    const todo = thunkAPI.getState().todos.list.find(todo => todo.id === id);
    if (todo) {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !todo.completed,
        })
      })
      if (!response.ok) {
        return thunkAPI.rejectWithValue('Can\'t toggle status. Server error.')
      }
      return (await response.json()) as Todo;
    }
    return thunkAPI.rejectWithValue('No such todo in the list');
  }
)

export const deleteTodo = createAsyncThunk<string, string, { rejectValue: string }>(
  'todos/deleteTodo',
  async function (id, thunkAPI) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      return thunkAPI.rejectWithValue('Can\'t delete task. Server error.')
    }
    return id;
  }
)

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(addNewTodo.pending, (state) => {
        state.error = null;
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(toggleStatus.fulfilled, (state, action) => {
        const toggledTodo = state.list.find(t => t.id === action.payload.id);
        if (toggledTodo) {
          toggledTodo.completed = !toggledTodo.completed;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.list = state.list.filter(t => t.id !== action.payload);
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      })
  }
})

// export const {addTodo, removeTodo, toggleTodoComplete} = todoSlice.actions;
export const todoReducer = todoSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}