import * as React from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardActions from '@mui/material/CardActions'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import { red } from '@mui/material/colors'
import Box from '@mui/material/Box'
import { FaRegHeart, FaRegComment } from 'react-icons/fa'
import { RxShare2 } from 'react-icons/rx'
import { GoKebabHorizontal } from 'react-icons/go'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

const Index = () => {
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Box>
      <Card sx={{ maxWidth: 470 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              U
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <GoKebabHorizontal />
            </IconButton>
          }
          title="Ujjwal Tiwari"
        />
        <CardMedia
          component="img"
          height="470"
          width="470"
          image="https://play-lh.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3"
          alt="Paella dish"
        />

        <CardActions>
          <FaRegHeart size="25" />
          <FaRegComment size="25" />
          <RxShare2 size="25" />
        </CardActions>
      </Card>
    </Box>
  )
}

export default Index
