import React from 'react'

const Input = ({ value, onChange, ...rest }) => (
  <input
    type={rest.type || "text"}
    className="form-control"
    value={value}
    onChange={e => onChange(e.target.value)}
    {...rest}
  />
)

export default Input