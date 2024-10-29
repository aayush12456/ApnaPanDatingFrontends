import { configureStore } from "@reduxjs/toolkit"
import registerSlice from "../Slice/registerSlice/registerSlice"
import loginSlice from "../Slice/loginSlice/loginSlice"
import sidebarModalSlice from "../Slice/sidebarModalSilce/sidebarModalSlice"
const store=configureStore({
    reducer:{
        registerData:registerSlice,
        loginData:loginSlice,
        sidebarModal:sidebarModalSlice
    }
})
export default store