import Button from '@mui/material/Button'
import { GrCloudUpload } from 'react-icons/gr'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import { useEffect, useState } from 'react'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import { db } from '../../firebase'
import { doc, getDoc } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'

const Index = ({ user }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0)
  const fileLimit = 50
  console.log(user)

  const handleUpload = (e) => {
    const file = e.target.files[0]
    console.log(file)

    if (file == null) {
      setError('File Not Selected')
      setTimeout(() => {
        setError('')
      }, 3000)
      return
    }

    if (file.size / (1024 * 1024) > fileLimit) {
      setError(
        `File too Large, Please try uploading a file less than ${fileLimit} MB`
      )
      setTimeout(() => {
        setError('')
      }, 2000)
      return
    }

    setLoading(true)

    const uid = uuidv4()

    const storage = getStorage()

    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: 'video/mp4',
    }

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, `${user.uid}/post/${uid}`)
    const uploadTask = uploadBytesResumable(storageRef, file, metadata)

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + prog + '% done')
        setProgress(prog)
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
          console.log('File available at', downloadURL)

          let postData = {
            likes: [],
            postId: uid,
            postURL: downloadURL,
            profileName: user.fullName,
            profilePhotoURL: user.profilePhoto,
            userID: user.uid,
            timestamp: serverTimeStamp(),
          }
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
        <Button
          variant="outlined"
          component="label"
          sx={{ mt: 3, mb: 3, fontSize: 20, color: '#2196f3', width: '30%' }}
        >
          Choose File
          <input
            hidden
            accept="video/*"
            type="file"
            multiple
            onChange={handleUpload}
          />
        </Button>

        <Box sx={{ width: '30%' }}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
      </Box>
    </>
  )
}

export default Index
