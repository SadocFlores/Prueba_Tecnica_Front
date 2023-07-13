import '../styles/home.css'
import { useEffect, useState } from 'react';
import Search from '../components/Search';
import pokemon from '../services/pokemon.service';
import Pokedex from '../components/pokedex';

const Home = () => {
  const [pokemones, setPokemones] = useState([])
  const [currentPokemon, setCurrentPokemon] = useState([])
  const [data, setData] = useState('')

  useEffect(() => {
      const getPokemon = async () => {
          const response = await pokemon.getAllPokemons();
          setPokemones(response.results)
          setCurrentPokemon(response.results)
      }

      getPokemon();
  }, []);

  
  useEffect(() => {
      if(data){
          let regex = new RegExp(data, 'i');

          let filtrado = currentPokemon.filter( filtrado => regex.test( filtrado.name ) || regex.test( filtrado.id) );
          setPokemones(filtrado)
      } else {
          setPokemones(currentPokemon)
      }
  }, [data]);


    return(
        
        <div className="container">
          <div>
            <Search setData={setData}/>
            <Pokedex pokemones={pokemones} />
          </div>

        </div>
    
    )
}

export default Home;