import React from 'react'

const TextArea = ({ value, onChange, placeholder, ...rest }) => (
  <textarea
    className="form-control"
    placeholder={placeholder}
    value={value}
    onChange={e => onChange(e.target.value)}
    {...rest}
  />
)

export default TextArea