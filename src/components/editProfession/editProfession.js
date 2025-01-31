import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { profession } from '../../utils/EditPersonalInfo';
import rightTik from '../../../assets/myProfileIcons/rightTik.png';
import { updatePersonalDataAsync } from '../../Redux/Slice/updatePersonalDataSlice/updatePersonalDataSlice';
import { useEffect, useState } from "react";

const EditProfession = ({ navigation,completeObj }) => {
    const [updateProfession, setUpdateProfession] = useState({});
    const dispatch = useDispatch();
    const completeLoginObj = useSelector((state) => state.loginData.loginData.completeLoginData);
    const completeLoginObjForOtp=useSelector((state)=>state.finalLoginWithOtpData.finalLoginWithOtpData.completeLoginData)
    const completeLoginObjData=completeLoginObj?completeLoginObj:completeLoginObjForOtp
    const updatePersonalInfoSelector = useSelector((state) => state?.updatePersonalData?.updatePersonalData?.updateData);

    const selectProfessionHandler = (profession) => {
        const updateProfessionObj = {
            id: completeLoginObjData?._id,
            profession: profession
        };
        dispatch(updatePersonalDataAsync(updateProfessionObj));
        navigation.navigate('EditProfilePage');
    };

    useEffect(() => {
        if (updatePersonalInfoSelector) {
            setUpdateProfession(updatePersonalInfoSelector);
        } else {
            setUpdateProfession(completeLoginObjData);
        }
    }, [updatePersonalInfoSelector, completeLoginObjData]);

    return (
        <ScrollView>
            <View style={{ paddingTop: 8, paddingLeft: 8 }}>
                {
                    profession.map((profession) => {
                        return (
                            <View key={profession.id} style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                <TouchableOpacity onPress={() => selectProfessionHandler(profession.profession)}>
                                    <Text style={{
                                        paddingTop: 22,
                                        paddingLeft: 8,
                                        fontSize: 15,
                                        color: `${updateProfession?.profession === profession?.profession ? 'rgba(0, 150, 255, 1)' : `${completeObj?.appearanceMode==='Dark Mode'?'white':'black'}`}`
                                    }}>
                                        {profession.profession}
                                    </Text>
                                </TouchableOpacity>
                                {updateProfession?.profession === profession?.profession ? 
                                    <Image source={rightTik} style={{ width: 12, height: 12, marginTop: 24, marginRight: 30 }} /> 
                                    : null}
                            </View>
                        );
                    })
                }
            </View>
        </ScrollView>
    );
};

export default EditProfession;
