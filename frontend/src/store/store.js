import { configureStore } from "@reduxjs/toolkit";
import userSlice from './userSlice';
import projectSlice from './projectSlice';

export const store = configureStore({
    reducer : {
        user : userSlice,
        project : projectSlice,
    }
});