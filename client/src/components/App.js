import React from 'react'
import { Container } from 'semantic-ui-react'
import { Switch, Route } from 'react-router-dom'

import MovieList from './MovieList.js'
import MovieDetail from './MovieDetail.js'

export default function App(){
    return (
      <Container>
        <Switch>
          <Route exact path='/' component={MovieList} />
          <Route path='/:movieId' render={props => (
            <MovieDetail key={props.match.params.movieId} {...props} /> 
          )} />
        </Switch>
      </Container>
    )
}
