import React from 'react'
import web3 from '../web3';

const Pokemon = ({ pokemon }) => (
  <div>
    <div className="pokemon">
      <button
        type="button"
        className="pokemon__sprite"
        style={{
          backgroundImage: `url(${`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            pokemon.id
          }.png`})`
        }}
      />
      <p className="pokemon__name">{pokemon.name}</p>
    </div>
    <button
      onClick={() => {buyWithEther()}}
    >
      BUY POKEMON
    </button>
  </div>
)

function buyWithEther() {
  console.log('Buy POKEMON !');
  web3.eth.getAccounts().then(console.log);
}

export default Pokemon
