import React from 'react'
import PropTypes from 'prop-types'
import {
  Rating,
  Header,
  Grid,
  List
} from 'semantic-ui-react'

import MovieDetailActorsSection from './MovieDetailActorsSection'

export default function MovieDetailFactsSection(props) {
 let getFormattedGenres =  (genres) => {
    return genres.reduce((agg, val, index) => {
      const delim = index < genres.length - 1 ? ', ' : ''
      return agg + val + delim
    }, ' ')
  }

    return (
      <Grid doubling padded >
        <Grid.Row>
          <List>
            <List.Item>
              <Header floated='left' size='huge'>{props.title}</Header>
            </List.Item>
            <List.Item>
              {getFormattedGenres(props.genres)}
            </List.Item>
            <List.Item>
              <List horizontal divided >
                <List.Item>
                  {props.runtime}min
                </List.Item>
                <List.Item>
                  {props.releaseYear}
                </List.Item>
                <List.Item>
                  <Rating
                    icon='star'
                    defaultRating={props.rating}
                    maxRating={5}
                    disabled
                  />
                </List.Item>
              </List>
            </List.Item>
          </List>
        </Grid.Row>
        <Grid.Row>
          <MovieDetailActorsSection movieId={props.movieId} />
        </Grid.Row>
      </Grid>
    )
}

MovieDetailFactsSection.propTypes = {
  title: PropTypes.string.isRequired,
  genres: PropTypes.array.isRequired,
  runtime: PropTypes.number.isRequired,
  releaseYear: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  movieId: PropTypes.number.isRequired
}

