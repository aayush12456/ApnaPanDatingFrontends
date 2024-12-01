import { configureStore } from "@reduxjs/toolkit"
import registerSlice from "../Slice/registerSlice/registerSlice"
import loginSlice from "../Slice/loginSlice/loginSlice"
import updatePersonalDataSlice from "../Slice/updatePersonalDataSlice/updatePersonalDataSlice"
import getAllUserSlice from "../Slice/getAllUserSlice/getAllUserSlice"
import addChatModalSlice from "../Slice/addChatModalSilce/addChatModalSlice"
import passDataSlice from "../Slice/passDataSlice/passDataSlice"
import passVideoSlice from "../Slice/passVideoSlice/passVideoSlice"
import playVideoModalSlice from "../Slice/playVideoModalSlice/playVideoModalSlice"
import getMatchesSlice from "../Slice/getMatchesSlice/getMatchesSlice"
import passMatchDataSlice from "../Slice/passMatchDataSlice/passMatchDataSlice"
import anotherPassDataSlice from "../Slice/anotherPassDataSlice/anotherPassDataSlice"
import addCrossMatchSlice from "../Slice/addCrossMatchSlice/addCrossMatchSlice"
import addMatchUserSlice from "../Slice/addMatchUserSlice/addMatchUserSlice"
import getMatchUserSlice from "../Slice/getMatchUserSlice/getMatchUserSlice"
import passMatchArrayDataSlice from "../Slice/passMatchArrayDataSlice/passMatchArrayDataSlice"
const store=configureStore({
    reducer:{
        registerData:registerSlice,
        loginData:loginSlice,
        updatePersonalData:updatePersonalDataSlice,
        getAllUserData:getAllUserSlice,
        addChatModalData:addChatModalSlice,
        passData:passDataSlice,
        passVideoData:passVideoSlice,
        playVideoModal:playVideoModalSlice,
        getMatchesData:getMatchesSlice,
        passMatchData:passMatchDataSlice,
        anotherPassData:anotherPassDataSlice,
        addCrossMatchData:addCrossMatchSlice,
        addMatchUserData:addMatchUserSlice,
        getMatchUserData:getMatchUserSlice,
        passMatchArrayData:passMatchArrayDataSlice
    }
})
export default store