/* eslint-disable @typescript-eslint/no-explicit-any */
import TextField, { TextFieldVariants } from '@mui/material/TextField'
import { HTMLInputTypeAttribute } from 'react'
import { Control, Controller } from 'react-hook-form'
import InputAdornment from '@mui/material/InputAdornment'

interface FormInputProps {
  name: string
  control: Control<any>
  label: string
  className?: string
  variant?: TextFieldVariants
  multiline?: boolean
  rows?: number
  fullWidth?: boolean
  type?: HTMLInputTypeAttribute | undefined
  prefix?: string
}

export default function ControlledTextField({
  name,
  control,
  label,
  className = 'min-h-20',
  variant = 'outlined',
  multiline = false,
  rows,
  fullWidth = false,
  type = 'text',
  prefix
}: FormInputProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          id={name}
          label={label}
          type={type}
          variant={variant}
          error={!!error}
          fullWidth={fullWidth}
          helperText={error ? error.message : null}
          {...field}
          InputLabelProps={{
            shrink: true
          }}
          onChange={(e) => field.onChange(e)}
          className={className}
          multiline={multiline}
          rows={rows}
          InputProps={
            prefix
              ? {
                  startAdornment: <InputAdornment position='start'>{prefix}</InputAdornment>
                }
              : undefined
          }
        />
      )}
    />
  )
}
