import React, { useState} from 'react'
import { Input } from 'semantic-ui-react'

export default function SearchInput(props) {
  
  let [searchTerm, setSearchTerm] = useState('');
 let  handleInput = (event) => {
   let val = event.target.value
  setSearchTerm(val);
  }

 let  handleClick  = () => {
    props.clickHandler(searchTerm)
  }

    return (
      <Input
        onChange={handleInput}
        action={{ content: 'Search', onClick: handleClick }}
        placeholder='Search movies...'
        value={searchTerm}
      />
    )
}

SearchInput.propTypes = {
  clickHandler: function (props, propName, componentName) {
    if (typeof props[propName] !== 'function') {
      return new Error(
        `Invalid prop ${propName} supplied to ${componentName}. Must be a function.`
      )
    }
  }
}