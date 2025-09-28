import React from 'react'

const Input = ({ value, onChange, errorMessage, ...rest }) => (
  <>
    <input
      type={rest.type || "text"}
      className="form-control"
      value={value}
      onChange={e => onChange(e.target.value)}
      {...rest}
    />
    {errorMessage && (
      <div class="text-danger">
        {errorMessage}
      </div>
    )}
  </>
)

export default Input