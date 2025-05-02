import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
    name : "Project",
    initialState : [],
    reducers : {
        addProject : (state, action) => {
            if (Array.isArray(action.payload)) {
                state.push(...action.payload);
            } else {
                state.push(action.payload);
            }
        },
        updateProject : (state, action) => {
            const { id, ...updates } = action.payload;
            const existingProject = state.find(project => project.id === id);
            if (existingProject) {
                Object.assign(existingProject, updates);
            }
        },
        removeProject : (state, action) => {
            const id = typeof action.payload === 'object' 
                ? action.payload.id 
                : action.payload;
            return state.filter(project => project.id !== id);
        }
    }
});

export const {addProject, updateProject, removeProject} = projectSlice.actions;

export default projectSlice.reducer;