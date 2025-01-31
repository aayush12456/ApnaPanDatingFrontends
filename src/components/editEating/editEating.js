import { Text, View, TouchableOpacity, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import rightTik from '../../../assets/myProfileIcons/rightTik.png';
import { updatePersonalDataAsync } from '../../Redux/Slice/updatePersonalDataSlice/updatePersonalDataSlice';
import { Eating } from '../../utils/EditPersonalInfo';
import { useEffect, useState } from "react";

const EditEating = ({ navigation,completeObj }) => {
    const [updateEating, setUpdateEating] = useState({});
    const dispatch = useDispatch();
    const completeLoginObj = useSelector((state) => state.loginData.loginData.completeLoginData);
    const completeLoginObjForOtp=useSelector((state)=>state.finalLoginWithOtpData.finalLoginWithOtpData.completeLoginData)
    const completeLoginObjData=completeLoginObj?completeLoginObj:completeLoginObjForOtp
    const updatePersonalInfoSelector = useSelector((state) => state?.updatePersonalData?.updatePersonalData?.updateData);

    const selectEatingHandler = (eating) => {
        const updateEatingObj = {
            id: completeLoginObjData?._id,
            eating: eating
        };
        dispatch(updatePersonalDataAsync(updateEatingObj));
        navigation.navigate('EditProfilePage');
    };

    useEffect(() => {
        if (updatePersonalInfoSelector) {
            setUpdateEating(updatePersonalInfoSelector);
        } else {
            setUpdateEating(completeLoginObjData);
        }
    }, [updatePersonalInfoSelector, completeLoginObjData]);

    return (
        <View style={{ paddingTop: 8, paddingLeft: 8 }}>
            {
                Eating.map((eating) => {
                    return (
                        <View key={eating.id} style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={() => selectEatingHandler(eating.eating)}>
                                <Text style={{
                                    paddingTop: 22,
                                    paddingLeft: 8,
                                    fontSize: 15,
                                    color: `${updateEating?.eating === eating?.eating ? 'rgba(0, 150, 255, 1)' : `${completeObj?.appearanceMode==='Dark Mode'?'white':'black'}`}`
                                }}>
                                    {eating.eating}
                                </Text>
                            </TouchableOpacity>
                            {updateEating?.eating === eating?.eating ?  
                                <Image source={rightTik} style={{ width: 12, height: 12, marginTop: 24, marginRight: 30 }} />
                                : null}
                        </View>
                    );
                })
            }
        </View>
    );
};

export default EditEating;
