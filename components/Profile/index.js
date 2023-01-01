import {useContext, useEffect, useState} from "react";
import {doc, onSnapshot} from "firebase/firestore";
import {db} from "../../firebase";
import {AuthContext} from "../../context/auth";
import Navbar from '../Navbar'
import Sidebar from "../Sidebar";
import {BsFillFilePostFill} from "react-icons/all";

const Index = () => {
    const {user} = useContext(AuthContext)

    const [userData, setUserData] = useState({})

    useEffect(() => {
        try {
            const unsub = onSnapshot(doc(db, 'users', user.uid), (doc) => {
                setUserData(doc.data())
            })
            return () => unsub()
        } catch (err) {
            console.log(err)
        }
    }, [user])

    console.log(userData)

    return (
        <>
            <Navbar user={userData}/>
            <div className="profileWrapper">
                <Sidebar/>
                <div className="profileMain">
                    <div className="profileInfo">
                        <div className="profile-pic" style={{background: `url(${userData.profilePhoto})`}}/>
                        <div className="details">
                            <h2>{userData?.name}</h2>
                            <p><strong>{userData?.posts?.length}</strong> post</p>
                        </div>
                    </div>
                    <div className="posts">
                        <p><BsFillFilePostFill size={22}/>POSTS</p>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Index