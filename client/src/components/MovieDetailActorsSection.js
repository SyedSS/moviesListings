import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  List,
  Dimmer,
  Loader
} from 'semantic-ui-react'

import { getActors } from '../services/movieBackend.service'

export default function MovieDetailActorsSection(props) {
 
  const [actors, setActors] = useState([]);
  useEffect(() => {
    async function fetchData() {  
    const response = await getActors(props.movieId);
    setActors(response);
    }
    fetchData();

  }, [])
    return (
      <div className='loading-actors-list'>
        <Dimmer active={actors.length === 0} inverted >
          <Loader size='medium' inline='centered'>Loading</Loader>
        </Dimmer>

        <List className='actor-list'>
          {actors.map(val => <List.Item key={val.cast_id}>{val.name}</List.Item>)}
        </List>
      </div>
    )
}

MovieDetailActorsSection.propTypes = {
  movieId: PropTypes.number.isRequired
}

