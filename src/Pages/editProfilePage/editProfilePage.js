import AnotherHeader from "../../components/anotherHeader/anotherHeader"
import EditProfile from "../../components/editProfile/editProfile"

const EditProfilePage=()=>{
    const editObj={
        name:'Edit Profile'
    }
return (
    <>
    <AnotherHeader editObj={editObj}/>
    <EditProfile/>
    </>
)
}
export default EditProfilePage