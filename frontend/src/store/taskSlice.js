import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name : "Task",
    initialState : [],
    reducers : {
        addTask : (state, action) => {
            if (Array.isArray(action.payload)) {
                state.push(...action.payload);
            } else {
                state.push(action.payload);
            }
        },
        updateTask : (state, action) => {
            
        },
        removeTask : (state, action) => {
        }
    }
});

export const {addTask, updateTask, removeTask} = taskSlice.actions;

export default taskSlice.reducer;