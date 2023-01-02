import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress'
import { GrCloudUpload } from 'react-icons/gr'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'

import {
  doc,
  serverTimestamp,
  setDoc,
  arrayUnion,
  updateDoc,
} from 'firebase/firestore'

import { v4 as uuidv4 } from 'uuid'
import { db } from '../../firebase'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Index = ({ user }) => {
  const [error, setError] = useState('')
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileLimit = 50
  const handleUpload = (e) => {
    const file = e.target.files[0]
    const notify = () => toast('Upload Completed')
    console.log('handleUpload Called', file)

    if (file === null) {
      setError('File Not Selected')

      setTimeout(() => {
        setError('')
      }, 3000)
      return
    }

    if (file.size / (1024 * 1024) > fileLimit) {
      setError(`Please Try Uploading a File Less Than ${fileLimit} MB`)

      setTimeout(() => {
        setError('')
      }, 3000)
      return
    }

    const uid = uuidv4()

    const storage = getStorage()

    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: 'video/mp4',
    }

    // Upload file and metadata to the object 'videos/someName.mp4
    const storageRef = ref(storage, `${user.uid}/post/${uid}`)
    const uploadTask = uploadBytesResumable(storageRef, file, metadata)

    // Listen for state changes, error and completion of the upload
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setUploadProgress(progress)
        console.log(`Upload is ${progress} % done`)
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break
          case 'storage/canceled':
            // User canceled the upload
            break

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log('File Available At', downloadURL)
          notify()
          let posData = {
            likes: [],
            postId: uid,
            postURL: downloadURL,
            profileName: user.name,
            profilePhotoURL: user.profilePhoto,
            userId: user.uid,
            timeStamp: serverTimestamp(),
          }

          await setDoc(doc(db, 'posts', uid), posData)

          await updateDoc(doc(db, 'users', user.uid), {
            posts: arrayUnion(uid),
          })
        })
      }
    )
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
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
        <ToastContainer />
        <Button
          variant="outlined"
          component="label"
          sx={{ mt: 3, mb: 3, fontSize: 20, color: '#2196f3', width: '30%' }}
        >
          Choose File &nbsp; <GrCloudUpload />
          <input
            hidden
            accept="video/*"
            type="file"
            multiple
            onChange={handleUpload}
          />
        </Button>

        <Box sx={{ width: '30%' }}>
          <LinearProgress variant="determinate" value={uploadProgress} />
        </Box>
      </Box>
    </>
  )
}

export default Index
