import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwt_decode from 'jwt-decode';


const initialState = {
  userData: {
    emp_num:"",
    name: "",
    surname: "",
    email: "",
    bio: "",
    pic: "",
    birthday: "",
    position: "",
    phone: "",
  },
  validPwd: 0,
  validUsername: 0,
  isLoggedIn:false,

};

export const setLogin = createAsyncThunk(
  'login/setLogin',
  async ([username, password], thunkAPI) => {
    const url = `http://localhost:5000/employees/login/`;
    try {
      const resp = await axios.post(url, { username: username, password: password });

      const token = resp.data.token; // Extract the token from the response

      localStorage.setItem('axzjwtUser', token); // Store the token in local storage

      const decodedToken = jwt_decode(token); // Decode the token to extract the user data
      console.log(decodedToken);
      thunkAPI.dispatch(setValidUsername(1));
      thunkAPI.dispatch(setValidPwd(1));
      thunkAPI.dispatch(setUserData(decodedToken)); // Set the user data in the state
      thunkAPI.dispatch(setIsLoggedIn(true));
      return;

    } catch (error) {
      thunkAPI.dispatch(setValidUsername(2));
      thunkAPI.dispatch(setValidPwd(0));
      return thunkAPI.rejectWithValue('Something went wrong');
    }
  }
);




const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {

    clearState: (state, { payload }) => {
      state.userData = {
        id:"",
        password: "",
        name: "",
        surname: "",
        email: "",
        bio: "",
        pic: "",
        birthday: "",
        position: "",
        phone: "",
      };
      state.isLoggedIn = false;
      localStorage.removeItem('axzjwtUser');
    },

    setValidPwd: (state, { payload }) => {
      state.validPwd = payload;
    },

    setValidUsername: (state, { payload }) => {
      state.validUsername = payload;
    },

    setIsLoggedIn: (state, { payload }) => {
      state.isLoggedIn = payload;
    },

    setUserData: (state, { payload }) => {
      state.userData = payload;
    },
    
  },

});

// Include the methods in normal reducers in actions to avoid undefined errors
export const {
  setIsLoggedIn,
  clearState,
  setValidPwd,
  setValidUsername,
  setUserData
} = loginSlice.actions;

export default loginSlice.reducer;
