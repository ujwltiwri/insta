import {useContext, useEffect, useState} from 'react'
import {AuthContext} from '../../context/auth'
import {doc, getDoc, onSnapshot} from 'firebase/firestore'
import {db} from '../../firebase'
import Navbar from '../Navbar'
import Upload from '../Upload'

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

    return (
        <>
            <Navbar user={userData}/>
            <Upload user={userData}/>
        </>
    )
}

export default Index
