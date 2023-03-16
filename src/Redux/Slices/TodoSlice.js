import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getTodosAsync = createAsyncThunk(
  "TodoSlice/getTodoAsync",
  async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/");
    const data = await response.json();
    return data;
  }
);

export const addTodoAsync = createAsyncThunk(
  "addTodoAsync/todoSlice",
  async (payload) => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ title: payload.title }),
      }
    );
    if (response.ok) {
      const todo = await response.json();
      return { todo };
    }
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState: [
    { id: 1, title: "todo1", completed: false },
    { id: 2, title: "todo2", completed: false },
    { id: 3, title: "todo3", completed: true },
  ],
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        completed: false,
      };
      state.push(newTodo);
    },
    toggleCompleted: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTodosAsync.pending, (state) => {
      console.log("fetching data ....");
    });
    builder.addCase(getTodosAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addTodoAsync.fulfilled, (state, action) => {
      state.push(action.payload.todo);
    });
  },
});

export const { addTodo, toggleCompleted, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
