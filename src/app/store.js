import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "features/Courses/coursesSlice";


const rootReducers = {
    courses: courseReducer
}

const store = configureStore({
    reducer: rootReducers,

})

export default store