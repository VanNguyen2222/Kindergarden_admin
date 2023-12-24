const { createSlice } = require("@reduxjs/toolkit");

const courses = createSlice({
    name: 'courses',
    initialState: [],
    reducers: {
        addCourse: (state, action) => {
            state.push(action.payload)
        }
    }
})

const { reducer, actions } = courses;
export const { addCourse } = actions
export default reducer