import {configureStore} from '@reduxjs/toolkit';
import loginReducer from '../features/login/loginSlice';
import registerReducer from '../features/register/registerSlice';
import employeesReducer from '../features/employees/employeesSlice';


export const store = configureStore({
    reducer:{
        login: loginReducer,
        register: registerReducer,
        employees: employeesReducer,
    }
})