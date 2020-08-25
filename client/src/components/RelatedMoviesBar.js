import React, { useEffect, useState } from 'react'
import {
  Segment,
  Image,
  Header
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { getMoviesByGenre, IMAGE_URL } from '../services/movieBackend.service'

export default function RelatedMoviesBar(props) {

  const [movies, setMovies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
useEffect(() => {  
  async function fetchData() {  
  const response = await getMoviesByGenre(props.genreId);
  setMovies(response);
  setIsLoaded(true);
  }
  fetchData();
   
  }, []);

  let renderImages  = (movies) => {
    const movieMarkup = movies
      .filter(movie => movie.id !== props.currentMovieId)
      .map(movie => (
        <Link to={`/${movie.id}`} key={movie.id}>
          <Image src={IMAGE_URL + movie.poster_path} size='small' wrapped />
        </Link>
      ))

    return (<Image.Group size='small'>{movieMarkup}</Image.Group>)
  }

    return (
      <div>
        <Header as='h4'>Related Movies</Header>
        <Segment className='loading-segment' textAlign='center' loading={!isLoaded}>
          {renderImages(movies)}
        </Segment>
      </div>
    )
}

RelatedMoviesBar.propTypes = {
  genreId: PropTypes.number.isRequired,
  currentMovieId: PropTypes.number
}