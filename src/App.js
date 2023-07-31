import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const[movies,setMovies]=useState('');
  const[loading,setLoading]=useState(false);
  const[error,setError]=useState(null);


 async function fetchMoviesHandler(){
  setLoading(true);
  setError(null);
  try{
    const response =await fetch('https://swapi.dev/api/films/') 
     
       if(!response.ok)
      throw new Error('Retrying')
    

    const data=await response.json();
    
    const transformedMovies=data.results.map(movieData=>{
          return{
            id:movieData.episode_id,
            title:movieData.title,
            openingText:movieData.opening_crawl,
            releaseDate:movieData.release_date,
          };
        })
        setMovies(transformedMovies);
    }
    catch(error){
      setError(error.message);
    }
    setLoading(false);

 };
  return (
    <React.Fragment>
      <section>
{console.log(movies)}

        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section> 
        {!loading&& movies.length>0&&<MoviesList movies={movies} />}
        {!loading&&movies.length===0&&!error&& <p>No Movie FOund</p>}
        {loading&& <p>Loading</p>}
        
        {!loading && error && <p>Error: {error}</p>}
        {!loading&&error&& <button onClick={()=>setError(!error)}> Cancel Retrying </button>}
      </section>
    </React.Fragment>
  );
}

export default App;
