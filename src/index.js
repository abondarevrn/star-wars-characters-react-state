import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';
import BASE_URL from './endpoint'
import CharacterList from './CharacterList';

import { useFetch, useFetchAsync } from './hooks/useFetch';

import './styles.scss';

const Application = () => {

  const [loading, error, characters] = useFetch(`${BASE_URL}/characters`)

  return (
    <div className="Application">
      <header>
        <h1>Star Wars Characters</h1>
      </header>
      <main>
        <section className="sidebar">
          {loading ? <span>Loading....</span> : <CharacterList characters={characters} />}
          {error && <span>{error}</span>}
        </section>
      </main>
    </div>
  );
};

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Router>
    <Application />
  </Router>,
  rootElement,
);
