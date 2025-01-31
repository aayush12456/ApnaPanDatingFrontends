import { Button, Text } from "react-native-paper";
import { View, Image, Pressable } from 'react-native';
import rightArrow from '../../../assets/settingIcons/rightArrow.png';
import { Dialog } from 'react-native-alert-notification';
import info from '../../../assets/AllIcons/info.png';
import { useNavigation } from "@react-navigation/native";

const ManageAccount = ({completeObj}) => {
    const navigation = useNavigation();

    const showDialog = (textBodyContent) => {
        Dialog.hide(); 
        Dialog.show({
            textBody: (
                <View style={{ alignItems: 'center' }}>
                    <Image source={info} style={{ width: 60, height: 60, marginTop: -20 }} />
                    <Text style={{ textAlign: 'center', paddingTop: 7 }}>{textBodyContent}</Text>
                </View>
            ),
            button: (
                <View style={{ width: '100%' }}>
                    <Button
                        mode="contained"
                        style={{
                            height: 50, 
                            justifyContent: 'center',
                            borderRadius: 20,
                        }}
                        buttonColor="#5394e4"
                        onPress={() => Dialog.hide()} 
                    >
                        Ok
                    </Button>
                </View>
            ),
        });
    };

    const changeMobileEmail = () => {
        showDialog("You can't change Email or Number; it is permanently fixed for further changes.");
    };

    const changeName = () => {
        showDialog("You can't change Name; it is permanently fixed for further changes.");
    };

    const deactivateAccountHandler = () => {
        navigation.navigate('DeactivateAccountPage', { formData: { headerName: 'Deactivate Account' } });
    };

    const deleteAccountHandler = () => {
        navigation.navigate('DeleteAccountPage', { formData: { headerName: 'Delete Account' } });
    };

    return (
        <>
            <View style={{ marginTop: 30 }}>
                <Text style={{ paddingLeft: 20,color:`${completeObj?.appearanceMode==='Dark Mode'?'white':''}`}}>Manage</Text>
                <Pressable onPress={changeMobileEmail}>
                    <View style={{ backgroundColor:`${completeObj?.appearanceMode==='Dark Mode'?'#343434':'#dcdcdc'}`
                    , width: '90%', marginLeft: 20, marginTop: 7 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ paddingTop: 10, paddingBottom: 12, paddingLeft: 10,
                             color:`${completeObj?.appearanceMode==='Dark Mode'?'white':'black'}` }}>Change Mobile or Email</Text>
                            <Image source={rightArrow} style={{ width: 15, height: 12, marginTop: 14, marginRight: 10,
                            tintColor:`${completeObj?.appearanceMode==='Dark Mode'?'white':''}` }} />
                        </View>
                    </View>
                </Pressable>
                <Pressable onPress={changeName}>
                    <View style={{ backgroundColor:`${completeObj?.appearanceMode==='Dark Mode'?'#343434':'#dcdcdc'}`
                    , width: '90%', marginLeft: 20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ paddingTop: 10, paddingBottom: 12, paddingLeft: 10,
                             color:`${completeObj?.appearanceMode==='Dark Mode'?'white':'black'}` }}>Change Name</Text>
                            <Image source={rightArrow} style={{ width: 15, height: 12, marginTop: 14, marginRight: 10,
                            tintColor:`${completeObj?.appearanceMode==='Dark Mode'?'white':''}` }} />
                        </View>
                    </View>
                </Pressable>
                <Pressable onPress={deactivateAccountHandler}>
                    <View style={{backgroundColor:`${completeObj?.appearanceMode==='Dark Mode'?'#343434':'#dcdcdc'}`,
                     width: '90%', marginLeft: 20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ paddingTop: 10, paddingBottom: 12, paddingLeft: 10,
                             color:`${completeObj?.appearanceMode==='Dark Mode'?'white':'black'}` }}>Deactivate Account</Text>
                            <Image source={rightArrow} style={{ width: 15, height: 12, marginTop: 14, marginRight: 10,
                            tintColor:`${completeObj?.appearanceMode==='Dark Mode'?'white':''}` }} />
                        </View>
                    </View>
                </Pressable>
                <Pressable onPress={deleteAccountHandler}>
                    <View style={{ backgroundColor:`${completeObj?.appearanceMode==='Dark Mode'?'#343434':'#dcdcdc'}`
                    , width: '90%', marginLeft: 20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ paddingTop: 10, paddingBottom: 12, paddingLeft: 10,
                             color:`${completeObj?.appearanceMode==='Dark Mode'?'white':'black'}` }}>Delete Account</Text>
                            <Image source={rightArrow} style={{ width: 15, height: 12, marginTop: 14, marginRight: 10,
                            tintColor:`${completeObj?.appearanceMode==='Dark Mode'?'white':''}` }} />
                        </View>
                    </View>
                </Pressable>
            </View>
        </>
    );
};

export default ManageAccount;
