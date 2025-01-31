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
import addLikeSmsSlice from "../Slice/addLikeSmsSlice/addLikeSmsSlice"
import addOnlineSkipUserSlice from "../Slice/addOnlineSkipUserSlice/addOnlineSkipUserSlice"
import onlinePassDataSlice from "../Slice/onlinePassDataSlice/onlinePassDataSlice"
import addVisitorEmailSlice from "../Slice/addVisitorEmailSlice/addVisitorEmailSlice"
import moreChatSlice from "../Slice/moreChatSlice/moreChatSlice"
import dotsOpenModalSlice from "../Slice/dotsOpenModalSlice/dotsOpenModalSlice"
import passSkipProfileSlice from "../Slice/passSkipProfileSlice/passSkipProfileSlice"
import passwordUpdateSlice from "../Slice/passwordUpdateSlice/passwordUpdateSlice"
import toastSlice from "../Slice/toastSlice/toastSlice"
import deleteProfileUserSlice from "../Slice/deleteProfileUserSlice/deleteProfileUserSlice"
import loginWithOtpSlice from "../Slice/loginWithOtpSlice/loginWithOtpSlice"
import getAllPhoneNumberSlice from "../Slice/getAllPhoneNumberSlice/getAllPhoneNumberSlice"
import finalLoginWithOtpSlice from "../Slice/finalLoginWithOtpSlice/finalLoginWithOtpSlice"
import forgotUpdatePasswordUserSlice from "../Slice/forgotUpdatePasswordUserSlice/forgotUpdatePasswordUserSlice"
import getBollywoodSongSlice from "../Slice/getBollyWoodSongSlice/getBollywoodSongSlice"
import changePasswordToastSlice from "../Slice/changePasswordToastSlice/changePasswordToastSlice"
import appearModeSlice from "../Slice/appearModeSlice/appearModeSlice"
const store=configureStore({
    reducer:{
        registerData:registerSlice,
        loginData:loginSlice,
        updatePersonalData:updatePersonalDataSlice,
        getAllUserData:getAllUserSlice,
        addChatModalData:addChatModalSlice,
        passFilterData:passDataSlice,
        passVideoData:passVideoSlice,
        playVideoModal:playVideoModalSlice,
        getMatchesData:getMatchesSlice,
        passMatchData:passMatchDataSlice,
        anotherPassData:anotherPassDataSlice,
        addCrossMatchData:addCrossMatchSlice,
        addMatchUserData:addMatchUserSlice,
        getMatchUserData:getMatchUserSlice,
        passMatchArrayData:passMatchArrayDataSlice,
        addSmsLikeText:addLikeSmsSlice,
        onlneSkipUser:addOnlineSkipUserSlice,
        onlinePassData:onlinePassDataSlice,
        addVisitorEmailData:addVisitorEmailSlice,
        moreChatData:moreChatSlice,
        dotsOpenData:dotsOpenModalSlice,
        passSkipProfile:passSkipProfileSlice,
        passwordUpdate:passwordUpdateSlice,
        toastData:toastSlice,
        deleteProfileData:deleteProfileUserSlice,
        loginOtpData:loginWithOtpSlice,
        finalLoginWithOtpData:finalLoginWithOtpSlice,
        getAllPhoneNumber:getAllPhoneNumberSlice,
        forgotPasswordUpdateData:forgotUpdatePasswordUserSlice,
        getBollyWoodSong:getBollywoodSongSlice,
        toasts:changePasswordToastSlice,
        appearMode:appearModeSlice
    }
})
export default store