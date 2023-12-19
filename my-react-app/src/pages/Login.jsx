import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import AppNavbar from '../components/Navbar'
import Cookies from 'js-cookie';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Afraz Butt
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const theme = createTheme()
const customFontClass = 'custom-font'


export default function LogIn() {
  const navigate = useNavigate()


  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    // console.log(data.get('email'))
    const response = axios.post(`/login`, {
      email: data.get('email'),
      password: data.get('password')
    })
    /*Response is a promise object so we need to destructure a promise object*/

    response.then(result => {
      const { data } = result
      if (data != null) {
        Cookies.set("currentUserForHotelApp", JSON.stringify(data), { expires: 1 });//in this way you can store Cookie value and to get you can use Cookies.get("currentUserForHotelApp") okay, JSON.parse it yes?yes and its better than localstorage Ok thank you so muchproblem
      }
      if (data.role === 2) {   // the role for customer
        navigate('/home')
      } //one minute i'll store this data in Cookies and check wheather data remove or not ok open cmd and run npm install js-cookie
      else {
        navigate('/adminHome')
      }
    })
      .catch(error => {
        alert('Something went wrong, Try again!!!')
      })

  }

  return (
    <>
      <AppNavbar />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            className='custom-font'
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </Box>
            </form>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/registerScreen" variant="body2">
                  New to the app? Register
                </Link>
              </Grid>
            </Grid>

          </Box>
        </Container>
      </ThemeProvider>
    </>
  )
}