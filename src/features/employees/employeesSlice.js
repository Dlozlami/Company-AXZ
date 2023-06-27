import axios from "axios";
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";



const initialState = {
  taskAdded:false,
  taskUpdated:false,
  taskRemoved:false,
}

export const updateList = createAsyncThunk(
  'employees/updateList',
  async (employee, thunkAPI) => {
    const url = 'http://localhost:5000/employees/'+employee.id;
    try {
      await axios.patch(url,employee);
      thunkAPI.dispatch(setTaskUpdatedTemporary(true));
      setTimeout(() => {
        thunkAPI.dispatch(setTaskUpdatedTemporary(false));
      }, 10000); // 10 seconds delay
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const remove = createAsyncThunk(
  'employees/remove',
  async (id, thunkAPI) => {
    const url = 'http://localhost:5000/employees/'+id;
    try {
      await axios.delete(url);
      thunkAPI.dispatch(setTaskRemovedTemporary(true));
      setTimeout(() => {
        thunkAPI.dispatch(setTaskRemovedTemporary(false));
      }, 10000); // 10 seconds delay
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);


const employeesSlice = createSlice({
    name:'employees',
    initialState,
    reducers:{
      
      setTaskAddedTemporary: (state, { payload }) => {
        state.taskAdded = payload;
      },
        
      setTaskUpdatedTemporary: (state, { payload }) => {
        state.taskAdded = payload;
      },
        
      setTaskRemovedTemporary: (state, { payload }) => {
        state.taskAdded = payload;
      },
    }
});

//console.log(loginSlice);

export const {setTaskRemovedTemporary,setTaskAddedTemporary,setTaskUpdatedTemporary} = employeesSlice.actions;
export default employeesSlice.reducer;