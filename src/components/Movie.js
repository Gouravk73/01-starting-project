import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {
  const DeleteHandler=async(id)=>{
    console.log(id);
    try{
      const response=await fetch(`https://react-http-916a4-default-rtdb.firebaseio.com/movies/${id}.json`,{
      method: "DELETE",
      });
      if (!response.ok && response.status !== 204) {
      throw new Error('Could not delete');
    }
      console.log('deleted successfully')
    }
    catch(e){
      console.log(e.message);
    }


     
      
  }
  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button style={{background:'red'}} onClick={()=>DeleteHandler(props.id)} >Delete</button>
    </li>
  );
};

export default Movie;
