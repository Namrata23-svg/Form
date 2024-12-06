import React from 'react'
import Box from '@mui/material/Box'
import Header from './Header'
import CustomInput from './Custom'
import {Grid} from '@mui/material'
import TextField from '@mui/material/TextField'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'

import DeleteIcon from '@mui/icons-material/Delete'
import SendIcon from '@mui/icons-material/Send'
import Stack from '@mui/material/Stack'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormControl from '@mui/material/FormControl'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import SideBar from './SideBar'
class Name extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      addressline1: '',
      addressline2: '',
      city: '',
      state: '',
      zip: '',
      country: '',

      errors: {
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        zip: '',
        country: '',
      },
    }
  }

  validateInputString = (value) => {
    return /^[a-zA-Z\s]*$/.test(value)
  }
  handleChange = (e) => {
    const {name, value} = e.target
    this.setState({[name]: value}, () => {
      this.validateField(name, value)
    })
  }

  validateField = (name, value) => {
    let error = ''

    if (!value) {
      error = `${name} is required` // Error message when field is empty
    } else if (
      name === 'firstName' ||
      name === 'lastName' ||
      name === 'city' ||
      name === 'state' ||
      name === 'country'
    ) {
      // Check for only letters, spaces, apostrophes, and hyphens
      if (!/^[a-zA-Z\s'-]+$/.test(value)) {
        error = 'Only letters, spaces, apostrophes, and hyphens are allowed.'
      }
      // Check if value length exceeds 64 characters
      else if (value.length > 64) {
        error = `${
          name.charAt(0).toUpperCase() + name.slice(1)
        } cannot be longer than 64 characters.`
      } else if (name === 'AddressLine1' || name === 'AddressLine2') {
        if (!/^[a-zA-Z0-9\s,.'-]{3,}$/.test(value)) {
          error = 'Please enter a valid  address.'
        } else if (value.length > 255) {
          error = 'Address cannot be longer than 255 characters.'
        }
      } else if (name === 'zip') {
        console.log(
          `Zip code validation: value = ${value}, regex test result = ${/^\d+$/.test(
            value,
          )}`,
        )
        if (!/^\d+$/.test(value)) {
          error = 'Please enter a valid zip postal.'
        }
      }
    }

    this.setState((prevState) => ({
      errors: {
        ...prevState.errors,
        [name]: error,
      },
    }))
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const {
      firstName,
      lastName,
      addressline1,
      addressline2,
      city,
      country,
      state,
      zip,
    } = this.state
    let errors = {}
    let formIsValid = true

    // Check if fields are empty
    if (!firstName) {
      errors.firstName = 'First Name is required'
      formIsValid = false
    }
    if (!lastName) {
      errors.lastName = 'Last Name is required'
      formIsValid = false
    }
    if (!addressline1) {
      errors.addressline1 = 'Address is required'
    }
    if (!addressline2) {
      errors.addressline2 = 'Address2 is required'
      formIsValid = false
    }
    if (!city) {
      errors.city = 'City is required'
      formIsValid = false
    }
    if (!country) {
      errors.country = 'Country is required'
      formIsValid = false
    }
    if (!state) {
      errors.state = 'State is required'
      formIsValid = false
    }
    if (!zip) {
      errors.zip = 'Zip is required'
      formIsValid = false
    }

    if (!formIsValid) {
      this.setState({errors})
      return
    }
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        console.log(data)
      })
    this.setState({errors})
  }

  //   formik ,react form
  render() {
    return (
      <div>
        <Header />
        <SideBar />

        <Box
          sx={{
            display: 'grid',

            gap: 2, // Space between form elements
            marginTop: '0px',
            marginLeft: '250px',
            justifyContent: 'center',
            flexDirection: 'column',
            width: '100%',

            flexWrap: 'wrap',
            marginTop: '0px',
            marginLeft: '270px',
            justifyContent: 'center',
            flexDirection: 'row',

            // '@media only screen and (min-width: 700px)': {
            //   flexDirection: 'column',
            //   justifyContent: 'center',
            // },
            // '@media only screen and (min-width: 600px) and (max-width: 900px)': {
            //     maxWidth: '800px',
            //      margin: ' 0 auto',
            //     alignItems:'center',
            //     flexDirection:'column',
            // },
            '@media only screen and (max-width:600px)': {
              justifyContent: 'center',
              flexDirection: 'column',
            },
            // '@media (max-width: 500px)': {
            //   flexDirection: 'column',
            //   alignItems: 'center',
            //   display: 'none',
            //   gap: 2,
            // },
          }}
        >
          <div style={{display: 'flex'}}>
            <CustomInput
              label="First Name*"
              name="firstName"
              type="text"
              placeholder="John"
              value={this.state.firstName}
              onChange={this.handleChange}
              error={this.state.errors.firstName}
              helperText={this.state.errors.firstName}
              id="outlined-start-adornment"
              sx={{
                flex: 1, // Allow input to grow and take available space
                minWidth: '200px',
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                },
              }}
            />

            <CustomInput
              label="Last Name*"
              name="lastName"
              type="text"
              placeholder="Snow"
              value={this.state.lastName}
              onChange={this.handleChange}
              error={this.state.errors.lastName}
              helperText={this.state.errors.lastName}
              id="outlined-start-adornment"
              style={{display: 'flex'}}
              //   sx={{m: 1, width: '25ch'}}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                },
              }}
            />
          </div>
          <Box sx={{width: '100%'}}>
            <CustomInput
              label="AddressLine1*"
              name="addressline1"
              type="text"
              placeholder="Street name and number"
              value={this.state.addressline1}
              onChange={this.handleChange}
              error={this.state.errors.addressline1}
              helperText={this.state.errors.addressline1}
              id="outlined-start-adornment"
              //   sx={{m: 1, width: '25ch'}}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                },
              }}
            />
            <Box sx={{width: '100%', marginTop: '16px'}}>
              <CustomInput
                label="AddressLine2*"
                name="addressline2"
                type="text"
                placeholder="Apartment,suite,unit,etc"
                value={this.state.addressline2}
                onChange={this.handleChange}
                error={this.state.errors.addressline2}
                helperText={this.state.errors.addressline2}
                id="outlined-start-adornment"
                //   sx={{m: 1, width: '25ch'}}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                  },
                }}
              />
            </Box>
          </Box>
          <div style={{display: 'flex'}}>
            <CustomInput
              label="City*"
              name="city"
              type="text"
              placeholder="New York"
              value={this.state.city}
              onChange={this.handleChange}
              error={this.state.errors.city}
              helperText={this.state.errors.city}
              id="outlined-start-adornment"
              sx={{m: 1, width: '25ch'}}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                },
              }}
            />
            <CustomInput
              label="State*"
              name="state"
              type="text"
              value={this.state.state}
              onChange={this.handleChange}
              placeholder="NY"
              error={this.state.errors.state}
              helperText={this.state.errors.state}
              id="outlined-start-adornment"
              sx={{m: 1, width: '25ch'}}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                },
              }}
            />
          </div>
          <div style={{display: 'flex'}}>
            <CustomInput
              label="Zip/Postal*"
              name="zip"
              type="text"
              placeholder="12345"
              value={this.state.zip}
              onChange={this.handleChange}
              error={this.state.errors.zip}
              helperText={this.state.errors.zip}
              id="outlined-start-adornment"
              sx={{m: 1, width: '25ch'}}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                },
              }}
            />
            <CustomInput
              label="Country*"
              name="country"
              type="text"
              placeholder=" United States"
              value={this.state.country}
              onChange={this.handleChange}
              error={this.state.errors.country}
              helperText={this.state.errors.country}
              id="outlined-start-adornment"
              sx={{m: 1, width: '25ch'}}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                },
              }}
            />
          </div>

          <Box sx={{display: 'flex', justifyContent: 'center', width: '100%'}}>
            <Button
              variant="contained"
              sx={{
                width: '150px',
                mt: 2,
              }}
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          </Box>
          {/* <div style={{justifyItems: 'center'}}>
            <Button
              variant="contained"
              type="submit"
              style={{justifyItems: 'center'}}
              onClick={this.handleSubmit}
            >
              Submit
            </Button> */}
          {/* </div> */}
        </Box>
      </div>
    )
  }
}

export default Name
