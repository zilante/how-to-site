import React from 'react'

export default function Input({className, name, type, placeholder, error, onChange, value}) {
  return (
    <input className={className} name={name} type={type}
           placeholder={placeholder} onChange={onChange}
           value={value} error={error}/>
  )
}