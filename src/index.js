import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import CharacterList from './CharacterList';
import { useFetchCharacters } from './hooks/useFetchCharacters'

import './styles.scss';

const Application = () => {

  const [loading, characters, error] = useFetchCharacters();

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
