import React, { useEffect, useState } from 'react'
import {
  Item,
  Container,
  Dropdown,
  Menu,
  Segment
} from 'semantic-ui-react'

import './App.css'
import {
  getPopularMovies,
  getMoviesByQuery,
  getGenres,
  getMoviesByGenre
} from '../services/movieBackend.service'
import MovieListItem from './MovieListItem'
import SearchInput from './SearchInput'

export default function MovieList(props) {
const [movies, setMovies] = useState([]);
const [genres, setGenres] = useState([]);
  useEffect(() => {
    async function fetchData() {  

    const responses = await Promise.all([getPopularMovies(), getGenres()])
    setMovies(responses[0]);
    setGenres(formatGenresForDropdown(responses[1]));
    }
    fetchData();
  }, [])

  let formatGenresForDropdown =  (rawGenreResponse) => {
    return rawGenreResponse.map(val => {
      return {
        key: val.id,
        text: val.name,
        value: val.id
      }
    })
  }

 let  handleSearchClick =  async (searchTerm) => {
    const response = await getMoviesByQuery(searchTerm)
  setMovies(response);
  }

  let handleGenreSelect = async(event, { value }) => {
    const response = await getMoviesByGenre(value)
   setMovies(response);
  }

 let  renderMovieListItems = (movies) => {
    const items = movies.map(movie => {
      const props = {
        id: movie.id,
        posterPath: movie.poster_path,
        title: movie.title,
        releaseDate: movie.release_date,
        overview: movie.overview,
        scoreOutOfFive: Math.round(movie.vote_average / 2)
      }
      return <MovieListItem key={movie.id} {...props} />
    })

    return (<Item.Group divided >{items}</Item.Group>)
  }

    return (
      <Container style={{ marginTop: '2em' }} >
        <Menu attached='top' stackable >
          <Menu.Item>
            <SearchInput clickHandler={handleSearchClick} />
          </Menu.Item>
          <Menu.Item position='right' fitted='vertically'>
            <Dropdown
              item
              placeholder='Select a genre...'
              selection
              search
              options={genres}
              onChange={handleGenreSelect}
            />
          </Menu.Item>
        </Menu>
        <Segment
          className='loading-segment'
          attached='bottom'
          loading={movies.length < 1}
        >
          {renderMovieListItems(movies)}
        </Segment>
      </Container>
    )
}