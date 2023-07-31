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
    const response =await fetch('https://react-http-916a4-default-rtdb.firebaseio.com/movies.json') 
     
       if(!response.ok)
      throw new Error('Retrying')
    

    const data=await response.json();
    
    const loadedMovie=[];
    for(const key in data){
       loadedMovie.push({
        id:key,

        title:data[key].title,
        releaseDate:data[key].releaseDate,
        tittle:data[key].tittle,
      });
      console.log(loadedMovie)
    }
    
    
        setMovies(loadedMovie);
    }
    catch(error){
      setError(error.message);
    }
    setLoading(false);

 },[]);

 async function addMovieHandler(movie){
  const response=await fetch('https://react-http-916a4-default-rtdb.firebaseio.com/movies.json',{
    method:"POST",
    body:JSON.stringify(movie),
    headers:{
      'content-type':'application/json'
    }
  });
  const data=await response.json();
  console.log(data);
 }
 
 useEffect(() => {
  fetchMoviesHandler();
}, [fetchMoviesHandler]);

  return (
    <React.Fragment>
      <section>
        <AddMovies onAddMovie={addMovieHandler}/>
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
