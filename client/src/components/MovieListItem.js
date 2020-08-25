import React from 'react'
import PropTypes from 'prop-types'
import { Item, Rating } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { IMAGE_URL } from '../services/movieBackend.service'

export default function MovieListItem(props){
    return (
      <Item>
        <Item.Image src={IMAGE_URL + props.posterPath} size='tiny' />
        <Item.Content>
          <Item.Header><Link to={`/${props.id}`}>{props.title}</Link></Item.Header>
          <Item.Meta>
            <div>Released: {props.releaseDate}</div>
          </Item.Meta>
          <Item.Description>
            <div className='small-text'>{props.overview}</div>
            <Rating
              icon='star'
              defaultRating={props.scoreOutOfFive}
              maxRating={5}
              disabled
            />
          </Item.Description>
        </Item.Content>
      </Item>
    )
}

MovieListItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  scoreOutOfFive: PropTypes.number.isRequired
}