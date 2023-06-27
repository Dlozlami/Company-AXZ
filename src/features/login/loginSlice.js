import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  userData: {
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
  },
  validPwd: true,
  validUsername: true,
  isLoggedIn:false,
};

export const validateUser = createAsyncThunk(
  'login/validateUser',
  async ([username, password], thunkAPI) => {
    const url = `http://localhost:5000/employees/${username}`;
    try {
      const resp = await axios.get(url);
      // Retrieve the stored password from the response data
      const storedPassword = resp.data.password;
      thunkAPI.dispatch(setValidUsername(true));
      // Compare the password provided by the user with the stored password
      if (password !== storedPassword) {
        // Update the state to indicate an invalid password
        thunkAPI.dispatch(setValidPwd(false));
        
        // Return early or perform additional logic if needed
        return;
      }
      thunkAPI.dispatch(setValidPwd(true));
      thunkAPI.dispatch(setIsLoggedIn(true));
      //thunkAPI.dispatch(setIsLoggedIn(true));
      // Make the API request if the password is valid
      return resp.data;
    } 
    
    catch (error) {
      thunkAPI.dispatch(setValidUsername(false));
      return thunkAPI.rejectWithValue('something went wrong');
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

  },

  extraReducers: (builder) => {
    builder
      .addCase(validateUser.fulfilled, (state, action) => {
        console.log(action);
        state.userData = action.payload;

      });
  },
});

// Include the methods in normal reducers in actions to avoid undefined errors
export const {
  setIsLoggedIn,
  clearState,
  setValidPwd,
  setValidUsername, 
} = loginSlice.actions;

export default loginSlice.reducer;
