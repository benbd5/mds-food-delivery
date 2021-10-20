import('./styles/TextInput.css')

function TextInput (props) {
  return (
    <label className='label'>
      {props.label}
      <input
        // {...props} permet de changer dynamiqument le type d'input par les props
        {...props}
        value={props.value}
        onChange={props.onChange}
        className='input'
      />
    </label>
  )
}

export default TextInput
