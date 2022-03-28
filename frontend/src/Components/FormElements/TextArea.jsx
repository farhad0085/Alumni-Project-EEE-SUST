import React from 'react'

const TextArea = ({ value, onChange, placeholder, errorMessage, ...rest }) => (
  <>
    <textarea
      className="form-control"
      placeholder={placeholder}
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

export default TextArea