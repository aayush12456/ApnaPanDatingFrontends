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
import getBollywoodSongSlice from "../Slice/getBollyWoodSongSlice/getBollywoodSongSlice"
import changePasswordToastSlice from "../Slice/changePasswordToastSlice/changePasswordToastSlice"
import appearModeSlice from "../Slice/appearModeSlice/appearModeSlice"
import verifyOtpSlice from "../Slice/verifyOtpSlice/verifyOtpSlice"
import getPersonalProfileSlice from "../Slice/getPersonalProfileSlice/getPersonalProfileSlice"
import bottomSheetOpenModalSlice from "../Slice/bottomSheetOpenModalSlice/bottomSheetOpenModalSlice"
import contactUsSlice from "../Slice/contactUsSlice/contactUsSlice"
import anotherBottomSheetModalSlice from "../Slice/anotherBottomSheetModalSlice/anotherBottomSheetModalSlice"
import reportSlice from "../Slice/reportSlice/reportSlice"
import getFieldRegisterUserSlice from "../Slice/getFieldRegisterUserSlice/getFieldRegisterUserSlice"
import deleteProfileArraySlice from "../Slice/deleteProfileArraySlice/deleteProfileArraySlice"
import replyUserSlice from "../Slice/replyUserSlice/replyUserSlice"
import addCredSlice from "../Slice/addCredSlice/addCredSlice"
import getCredSlice from "../Slice/getCredSlice/getCredSlice"
import getAllPhoneMailSlice from "../Slice/getAllPhoneMailSlice/getAllPhoneMailSlice"
const store=configureStore({
    reducer:{
        registerData:registerSlice,
        loginData:loginSlice,
        verifyOtp:verifyOtpSlice,
        getPersonalData:getPersonalProfileSlice,
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

        getAllPhoneMail:getAllPhoneMailSlice,
        getBollyWoodSong:getBollywoodSongSlice,
        toasts:changePasswordToastSlice,
        appearMode:appearModeSlice,
        bottomSheet:bottomSheetOpenModalSlice,
        contactUs:contactUsSlice,
        anotherBottomSheet:anotherBottomSheetModalSlice,
        report:reportSlice,
        fieldReport:getFieldRegisterUserSlice,
        profileDeleteArray:deleteProfileArraySlice,
        replyUser:replyUserSlice,
        credential:addCredSlice,
        getCred:getCredSlice

    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false, // ⬅️ यह middleware disable कर दिया
    }),
})
export default store