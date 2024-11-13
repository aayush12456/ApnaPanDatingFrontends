import { configureStore } from "@reduxjs/toolkit"
import registerSlice from "../Slice/registerSlice/registerSlice"
import loginSlice from "../Slice/loginSlice/loginSlice"
import updatePersonalDataSlice from "../Slice/updatePersonalDataSlice/updatePersonalDataSlice"
import getAllUserSlice from "../Slice/getAllUserSlice/getAllUserSlice"
import addChatModalSlice from "../Slice/addChatModalSilce/addChatModalSlice"
import passDataSlice from "../Slice/passDataSlice/passDataSlice"
import passVideoSlice from "../Slice/passVideoSlice/passVideoSlice"
import playVideoModalSlice from "../Slice/playVideoModalSlice/playVideoModalSlice"
const store=configureStore({
    reducer:{
        registerData:registerSlice,
        loginData:loginSlice,
        updatePersonalData:updatePersonalDataSlice,
        getAllUserData:getAllUserSlice,
        addChatModalData:addChatModalSlice,
        passData:passDataSlice,
        passVideoData:passVideoSlice,
        playVideoModal:playVideoModalSlice
    }
})
export default store