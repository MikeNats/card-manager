
import React from 'react'
import { InputProps } from './types' 

const Input = ({  
  id,
  name,
  type = '', 
  placeholder = '',
  onChangeHandler,
  checked,
  className = '',
  label, 
  title='',
  error = false, 
  errorMessage = '',
  value= '', 
  ...props 
}: InputProps) => ( 
    <fieldset  className={`comp-input ${className}` }>
      <label>{title}</label>
      <input 
        id={id}   
        name={name} 
        type={type}
        value={value}
        className={`${error? 'error' : '' }`}
        placeholder={placeholder}
        onChange={(e:  React.ChangeEvent<HTMLInputElement>)=> 
          {e.persist(); onChangeHandler(e.currentTarget.value)}}
        {...props}/>
      <p className={`errorMessage hide ${error? 'show' : '' }`}>{errorMessage}</p>
    </fieldset>
  )  
 
export default React.memo(Input)