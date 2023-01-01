import React, {useContext, useState} from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import {Alert, Link, TextField, Typography} from '@mui/material'
import {RxUpload} from 'react-icons/rx'
import {AuthContext} from '../../context/auth'
import {doc, setDoc} from 'firebase/firestore'
import {db} from '../../firebase'
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Index = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [file, setFile] = useState(null)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState('')
    const {signup} = useContext(AuthContext)
    // const notify = () => toast("Sign Up Successful"); // React Notification Function
    let notify;
    const handleSignUp = async () => {
        try {
            setLoading(true)
            const userInfo = await signup(email, password)
            console.log('successfully signed up', userInfo)
            setSuccess('Sign Up Successful')
            notify = () => toast('Sign Up Successful')
            notify()
            //Upload Files
            // Create the file metadata
            /** @type {any} */
            const metadata = {
                contentType: 'image/jpeg',
            }

            // Create a root reference
            const storage = getStorage()

            // Create a reference to 'mountains.jpg'
            const storageRef = ref(storage, `${userInfo.user.uid}/Profile`)

            const uploadTask = uploadBytesResumable(storageRef, file, metadata)

            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    console.log('Upload is ' + progress + '% done')
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused')
                            break
                        case 'running':
                            console.log('Upload is running')
                            break
                    }
                },
                (error) => {
                    // Handle unsuccessful uploads
                    console.log(error)
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        console.log('File available at', downloadURL)

                        let userData = {
                            email,
                            password,
                            name,
                            profilePhoto: downloadURL,
                            posts: [],
                            uid: userInfo.user.uid,
                        }

                        await setDoc(doc(db, 'users', userInfo.user.uid), userData)
                    })

                }
            )
        } catch (err) {
            console.log(err)
            setError('Could Not Sign up, Try Again !')
            notify = () => toast(err.message)
            notify()
        }

        setError(false)
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                mt: 10,
            }}
        >
            <Card sx={{mb: 4, width: 400}}>
                <CardContent>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                    />
                    {/* Same as */}
                    <ToastContainer/>
                    <div className="instaLogo"/>

                    <TextField
                        id="outlined-basic"
                        label="Enter email"
                        variant="outlined"
                        fullWidth
                        placeholder="abc@gmail.com"
                        sx={{
                            mt: 2,
                        }}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <TextField
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        fullWidth
                        placeholder="Enter Password"
                        sx={{
                            mt: 2,
                        }}
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <TextField
                        id="outlined-basic"
                        label="Full Name"
                        variant="outlined"
                        fullWidth
                        placeholder="Enter Full Name"
                        sx={{
                            mt: 2,
                        }}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <Button
                        variant="outlined"
                        color="secondary"
                        component="label"
                        fullWidth
                        sx={{mt: 3}}
                    >
                        Profile Picture &nbsp; <RxUpload/>
                        <input
                            hidden
                            accept="image/*"
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </Button>

                    <Button
                        variant="contained"
                        fullWidth
                        sx={{mt: 3, background: '#0095F6'}}
                        onClick={handleSignUp}
                    >
                        Sign Up
                    </Button>
                    <hr/>
                    <Typography
                        variant="subtitle1"
                        gutterBottom
                        sx={{textAlign: 'center', mt: 4}}
                    >
                        Forget Password ?
                    </Typography>
                </CardContent>
            </Card>

            <Card
                sx={{
                    width: 400,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <CardContent>
                    <p style={{textDecoration: 'none !important'}}>
                        Have an account with Us?{' '}
                        <Link href="/login">
              <span
                  style={{
                      fontWeight: 'bold',
                      color: '#0095F6',
                      textDecoration: 'none',
                  }}
              >
                Login !
              </span>
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </Box>
    )
}

export default Index
