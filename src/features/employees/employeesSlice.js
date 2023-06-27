import axios from "axios";
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
  taskAdded:false,
  taskUpdated:false,
  taskRemoved:false,
}

export const updateList = createAsyncThunk(
  'employees/updateList',
  async (newList, thunkAPI) => {
    const { userData } = thunkAPI.getState().login;
    const url = 'http://localhost:5000/accounts/'+userData.id;
    console.log("newList");
    try {
      await axios.patch(url, { list: newList });
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

export const addToList = createAsyncThunk(
  'employees/addToList',
  async (newList, thunkAPI) => {
    const { userData } = thunkAPI.getState().login;
    const url = 'http://localhost:5000/accounts/'+userData.id;
    try {
      await axios.patch(url, { list: newList });
      thunkAPI.dispatch(setTaskAddedTemporary(true));
      setTimeout(() => {
        thunkAPI.dispatch(setTaskAddedTemporary(false));
      }, 10000); // 10 seconds delay
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const remove = createAsyncThunk(
  'employees/remove',
  async (newList, thunkAPI) => {
    const { userData } = thunkAPI.getState().login;
    const url = 'http://localhost:5000/accounts/'+userData.id;
    console.log(newList);
    try {
      await axios.patch(url, { list: newList });
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