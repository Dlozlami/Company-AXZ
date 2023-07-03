import axios from "axios";
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";



const initialState = {
  allEmployees:[],
}

export const updateList = createAsyncThunk(
  'employees/updateList',
  async (employee, thunkAPI) => {
    const url = 'http://localhost:5000/employees/'+employee.id;
    try {
      await axios.patch(url,employee);
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

    }
});




export default employeesSlice.reducer;