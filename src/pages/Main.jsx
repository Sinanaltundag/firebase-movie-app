import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import MovieCard from "./MovieCard";


const API_KEY = process.env.REACT_APP_TMDB_KEY;
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const Main = () => {
const currentUser = useContext(AuthContext)
const [movies, setMovies] = useState([])
const [searchTerm, setSearchTerm] = useState("")

const getMovies=(API)=>{
  axios.get(API).then(res=>setMovies(res.data.results))
  .catch(err=>console.log(err))
}
useEffect(() => {
getMovies(FEATURED_API)
}, [])

const handleSubmit =(e)=>{
e.preventDefault();
if (searchTerm&&currentUser) {
  
  getMovies(SEARCH_API+searchTerm)
} else if (!currentUser){
  alert("Please login to search")
} else {
  alert("Please enter a text")
}
}

  return (<>
<>
<form className="search" onSubmit={handleSubmit}>
        <input
          type="search"
          className="search-input"
          placeholder="Search a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
<div className="d-flex justify-content-center flex-wrap">

{movies.map((movie)=>(
  <MovieCard key={movie.id} {...movie}/>
))}

</div>

</>
  </>);
};

export default Main;
