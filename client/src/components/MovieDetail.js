import React, { useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {
  Image,
  Container,
  Segment,
  Grid
} from 'semantic-ui-react'

import './App.css'
import { getMovie, IMAGE_URL } from '../services/movieBackend.service'
import Loading from './Loading'
import LinkButton from './LinkButton'
import MovieDetailFactsSection from './MovieDetailFactsSection'
import RelatedMoviesBar from './RelatedMoviesBar'

export default function MovieDetail(props) {
  
  const [movie, setMovie] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
 
 useEffect(() => {
    async function fetchData() {  
    const movieId = props.match.params.movieId
    const response = await getMovie(movieId)
    setMovie(response);
    setIsLoaded(true);
    }
    fetchData();
    
  }, [])

    return (
      <Container style={{ marginTop: '2em' }}>
        {!isLoaded &&
          <Loading />
        }
        {isLoaded &&
          <div>
            <Grid stackable columns={2} >
              <Grid.Row>
                <Grid.Column>
                  <LinkButton path='/' text='Back to movies list' />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row stretched >
                <Grid.Column width={6}>
                  <Image
                    src={IMAGE_URL + movie.poster_path}
                    size='large'
                    verticalAlign='top'
                    centered
                  />
                </Grid.Column>
                <Grid.Column width={9}>
                  <Segment>
                    <MovieDetailFactsSection
                      title={movie.title}
                      genres={movie.genres.map(ob => ob.name)}
                      runtime={movie.runtime}
                      releaseYear={Number(movie.release_date.split('-')[0])}
                      rating={Math.round(movie.vote_average / 2)}
                      movieId={movie.id}
                    />
                  </Segment>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={15}>
                  <Segment>{movie.overview}</Segment>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={15}>
                  <RelatedMoviesBar
                    genreId={movie.genres[0].id}
                    currentMovieId={movie.id}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        }
      </Container>
    )
}

MovieDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      movieId: PropTypes.string.isRequired
    })
  })
}
