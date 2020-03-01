import React, { useState, useEffect } from 'react';
import BASE_URL from './endpoint'

const CharacterView = ({ match }) => {

  const [character, setCharacter] = useState({})

  useEffect(() => {
    fetch(`${BASE_URL}/characters/${match.params.id}`)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error(response.statusText)
        }
      })
      .then(json => {
        setCharacter(json)
      })
      .catch(error => console.error(error))
  }, [match.params.id])

  return (
    <section className="CharacterView">
      <h2>{character.name}</h2>
      <ul className="CharacterDetails">
        <li>
          <strong>Birth Year</strong>: {character.birthYear}
        </li>
        <li>
          <strong>Eye Color</strong>: {character.eyeColor}
        </li>
        <li>
          <strong>Gender</strong>: {character.gender}
        </li>
        <li>
          <strong>Hair Color</strong>: {character.hairColor}
        </li>
        <li>
          <strong>Height</strong>: {character.height}
        </li>
        <li>
          <strong>Mass</strong>: {character.mass}
        </li>
        <li>
          <strong>Skin Color</strong>: {character.skinColor}
        </li>
      </ul>
    </section>
  );
};

export default CharacterView;
