import React, { useEffect, useState,useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import AddMovies from './components/AddMovies';

function App() {
  const[movies,setMovies]=useState('');
  const[loading,setLoading]=useState(false);
  const[error,setError]=useState(null);

  const fetchMoviesHandler=useCallback(async()=>{
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

 },[]);

 
 useEffect(() => {
  fetchMoviesHandler();
}, [fetchMoviesHandler]);

  return (
    <React.Fragment>
      <section>
        <AddMovies/>
      </section>
      <section>
{console.log(movies)}

        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section> 
        {!loading&& movies.length>0&&<MoviesList movies={movies} />}
        {!loading&&movies.length===0&&!error&& <p>No Movie FOund</p>}
        {loading&& <p>Loading</p>}
        
        {!loading && error && <p>Error: {error}</p>}
        {!loading&&error&& <button onClick={()=>setError(null)}> Cancel Retrying </button>}
      </section>
    </React.Fragment>
  );
}

export default App;
