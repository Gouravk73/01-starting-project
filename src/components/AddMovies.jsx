import React, { useState } from 'react'

const AddMovies = () => {
    const[title,setTitle]=useState('');
    const[openingText,setOpeningText]=useState('');
    const[releaseDate,setReleaseDate]=useState('');
    const[addedMoves,setAddedMovie]=useState([]);
    const submitHandler=(e)=>{
        e.preventDefault();
        const dummyData={
            title,
            openingText,
            releaseDate,
        }
        setAddedMovie([...addedMoves,dummyData]);
        setTitle('');
        setOpeningText('');
        setReleaseDate('');
    }
  return (
    <div>
        <form action="" onSubmit={submitHandler}>
            <div>
                <label htmlFor="title">Title</label><br />
                <input type="text" name="title" id="title"  onChange={(e)=>setTitle(e.target.value)}/>
            </div>
            <div className='opening-text'>
                <label htmlFor="openingText">Opening Text</label><br />
                <input type="text" name="openingText" id="openingText" onChange={(e)=>setOpeningText(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="releaseDate">Release Date</label><br />
                <input type="text" name="releaseDate" id="releaseDate" onChange={(e)=>setReleaseDate(e.target.value)}/>
            </div>
            <button>ADD Movies</button>
        </form>
    </div>
  )
}

export default AddMovies