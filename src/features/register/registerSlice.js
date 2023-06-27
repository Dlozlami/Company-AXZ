import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  userAdded: false,
};

export const addUser = createAsyncThunk(
  'register/addUser',
  async (newUser, thunkAPI) => {
    const url = 'http://localhost:5000/employees/';

    try {
      await axios.post(url, newUser);
      thunkAPI.dispatch(setUserAddedTemporary(true));
      setTimeout(() => {
        thunkAPI.dispatch(setUserAddedTemporary(false));
      }, 10000); // 10 seconds delay
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {

    setUserAddedTemporary: (state, { payload }) => {
      state.userAdded = payload;
    },
  }
});

export const { setUserAdded, setUserAddedTemporary } = registerSlice.actions;
export default registerSlice.reducer;
