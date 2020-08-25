import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'

export default function LinkButton(props) {
    return (
      <Link to={props.path}>
        <Button icon labelPosition='left'>
          <Icon name='left arrow' />
          {props.text}
        </Button>
      </Link>
    )
}

LinkButton.propTypes = {
  path: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}