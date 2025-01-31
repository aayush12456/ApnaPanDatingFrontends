import { Text, View, TouchableOpacity, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import rightTik from '../../../assets/myProfileIcons/rightTik.png';
import { updatePersonalDataAsync } from '../../Redux/Slice/updatePersonalDataSlice/updatePersonalDataSlice';
import { zodiacSign } from '../../utils/EditPersonalInfo';
import { useEffect, useState } from "react";

const EditZodiac = ({ navigation,completeObj }) => {
    const [updateZodiac, setUpdateZodiac] = useState({});
    const dispatch = useDispatch();
    const completeLoginObj = useSelector((state) => state.loginData.loginData.completeLoginData);
    const completeLoginObjForOtp=useSelector((state)=>state.finalLoginWithOtpData.finalLoginWithOtpData.completeLoginData)
    const completeLoginObjData=completeLoginObj?completeLoginObj:completeLoginObjForOtp
    const updatePersonalInfoSelector = useSelector((state) => state?.updatePersonalData?.updatePersonalData?.updateData);

    const selectZodiacHandler = (zodiac) => {
        const updateZodiacObj = {
            id: completeLoginObjData?._id,
            zodiac: zodiac
        };
        dispatch(updatePersonalDataAsync(updateZodiacObj));
        navigation.navigate('EditProfilePage');
    };

    useEffect(() => {
        if (updatePersonalInfoSelector) {
            setUpdateZodiac(updatePersonalInfoSelector);
        } else {
            setUpdateZodiac(completeLoginObjData);
        }
    }, [updatePersonalInfoSelector, completeLoginObjData]);

    return (
        <View style={{ paddingTop: 8, paddingLeft: 8 }}>
            {
                zodiacSign.map((zodiac) => {
                    return (
                        <View key={zodiac.zodiac} style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={() => selectZodiacHandler(zodiac.zodiac)}>
                                <Text style={{
                                    paddingTop: 22,
                                    paddingLeft: 8,
                                    fontSize: 15,
                                    color: `${updateZodiac?.zodiac === zodiac?.zodiac ? 'rgba(0, 150, 255, 1)' : `${completeObj?.appearanceMode==='Dark Mode'?'white':'black'}`}`
                                }}>
                                    {zodiac.zodiac}
                                </Text>
                            </TouchableOpacity>
                            {updateZodiac?.zodiac === zodiac?.zodiac ?
                                <Image source={rightTik} style={{ width: 12, height: 12, marginTop: 24, marginRight: 30 }} />
                                : null}
                        </View>
                    );
                })
            }
        </View>
    );
};

export default EditZodiac;
