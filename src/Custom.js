import React from 'react'
import {
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
} from '@mui/material'
class CustomInput extends React.Component {
  render() {
    const {
      label,
      name,
      value,
      onChange,
      type,
      error,
      placeholder,
      required,
      validation,
      startAdornment,
      endAdornment,
      sx,
      slotProps,
    } = this.props

    return (
      <div className="input">
        <TextField
          label={label}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          error={!!error} // Set error state based on validation
          helperText={error || ''} // Show error message if validation fails
          fullWidth
          sx={sx}
          slotProps={slotProps}
        />
      </div>
    )
  }
}

export default CustomInput
