import { configureStore } from "@reduxjs/toolkit"
import registerSlice from "../Slice/registerSlice/registerSlice"
import loginSlice from "../Slice/loginSlice/loginSlice"
import sidebarModalSlice from "../Slice/sidebarModalSilce/sidebarModalSlice"
import updatePersonalDataSlice from "../Slice/updatePersonalDataSlice/updatePersonalDataSlice"
const store=configureStore({
    reducer:{
        registerData:registerSlice,
        loginData:loginSlice,
        sidebarModal:sidebarModalSlice,
        updatePersonalData:updatePersonalDataSlice
    }
})
export default store