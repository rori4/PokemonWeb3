import React from 'react'
import web3 from '../web3'
import pokedex from '../pokedex'

class Pokemon extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pokemonAvailabe: null
    }
  }

  async componentDidMount() {
    let pokemonAvailable = await pokedex.methods
      .checkAvailable(this.props.pokemon.id)
      .call()
    console.log('pokemonAvailable :', pokemonAvailable)
    if (pokemonAvailable === true) {
      this.setState({ pokemonAvailabe: true })
    } else if (pokemonAvailable === false) {
      this.setState({ pokemonAvailabe: false })
    }
  }

  compo

  renderButton() {
    let pokemonButton
    if (this.state.pokemonAvailabe === null) {
      pokemonButton = <button disabled>Loading...</button>
    } else if (this.state.pokemonAvailabe === true) {
      pokemonButton = (
        <button
          onClick={() => {
            buyWithEther(this.props.pokemon.id)
          }}
        >
          BUY POKEMON
        </button>
      )
    } else {
      pokemonButton = <button disabled>SOLD</button>
    }
    return pokemonButton
  }

  render() {
    return (
      <div>
        <div className="pokemon">
          <button
            type="button"
            className="pokemon__sprite"
            style={{
              backgroundImage: `url(${`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                this.props.pokemon.id
              }.png`})`
            }}
          />
          <p className="pokemon__name">{this.props.pokemon.name}</p>
        </div>
        {this.renderButton()}
      </div>
    )
  }
}

// const Pokemon = ({ pokemon }) => (
//   <div>
//     <div className="pokemon">
//       <button
//         type="button"
//         className="pokemon__sprite"
//         style={{
//           backgroundImage: `url(${`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
//             pokemon.id
//           }.png`})`
//         }}
//       />
//       <p className="pokemon__name">{pokemon.name}</p>
//     </div>
//     {RenderButton(pokemon.id)}
//   </div>
// )

// async function RenderButton(pokemonId) {
//   let pokemonAvailable = await pokedex.methods.checkAvailable(pokemonId).call()
//   console.log('pokemonAvailable :', pokemonAvailable)
//   if (pokemonAvailable) {
//     return (
//       <button
//         onClick={() => {
//           buyWithEther(pokemonId)
//         }}
//       >
//         BUY POKEMON
//       </button>
//     )
//   } else {
//     return <button disabled>SOLD</button>
//   }
// }

async function buyWithEther(pokemonId) {
  console.log('Buy POKEMON !')
  console.log('pokemonId :', pokemonId)
  const accounts = await web3.eth.getAccounts()
  // let gas = await pokedex.methods.buy(pokemonId).estimateGas({
  //   from: accounts[0]
  // });
  // console.log('gas :', gas);
  let result = await pokedex.methods.buy(pokemonId).send({
    from: accounts[0],
    value: web3.utils.toWei('0.01', 'ether')
  })
  // console.log(result);
  // web3.eth.getAccounts().then(console.log);
}

export default Pokemon
