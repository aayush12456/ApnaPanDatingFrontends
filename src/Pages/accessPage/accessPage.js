import Access from "../../components/access/access"
import CommonHeader from "../../components/common/commonHeader/commonHeader"
import {View} from 'react-native'
const AccessPage=({route})=>{
    const accessObj=route.params.formData
    const headerName=route.params.headerName
return (
    <>
    <View style={{backgroundColor:`black`,height:"100%"}}>
    <CommonHeader commonHeaderName={headerName} completeLoginObj={accessObj}/>
    <Access accessObjs={accessObj}/>
    </View>
    </>
)
}
export default AccessPage