import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import MovieCard from "./MovieCard";


const API_KEY = process.env.REACT_APP_TMDB_KEY;
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const Main = () => {

  const [page, setPage] = useState(1)
const [totalPages, setTotalPages] = useState()
const [pagesShown, setPagesShown] = useState([1,2,3])
const currentUser = useContext(AuthContext)
const [movies, setMovies] = useState([])
const [searchTerm, setSearchTerm] = useState("")

const getMovies=(API)=>{
  axios.get(API+`&page=${page}`).then(res=>{
    setTotalPages(res.data.total_pages)
    console.log(totalPages)
    setMovies(res.data.results)
  })
  
  .catch(err=>console.log(err))
  
}
useEffect(() => {
getMovies(FEATURED_API+`&page=${page}`)
//! pagination array oluşturma
setPagesShown(Array.from({length:totalPages<5?totalPages:5},(_,i)=>i+page-2).filter(x=>x>0))
console.log(totalPages);
}, [page])

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

const handlePage =(e)=>{
  if (e.target.tagName==="BUTTON"){
    switch (e.target.innerText) {
      case "Previous":
        setPage(page - 1)
        console.log(page,e.target.innerText)
        break;
      case "Next":
        setPage(+page + 1)
        console.log(page,e.target.innerText)
        break;
      case "<<":
        setPage(1)
        console.log(page,e.target.innerText)
        break;
    
      default:
        setPage(+e.target.innerText)
        console.log(page,e.target.innerText)
        break;
    }

  }
}


  return (
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



<nav>
  <ul className="pagination justify-content-center m-4" onClick={handlePage}>
    <li className="page-item"><button className={`page-link btn ms-4 ${page<=1&&"disabled"}`}>{"<<"}</button></li>
    <li className="page-item"><button className={`page-link btn ${page<=1&&"disabled"}`} >Previous</button></li>
   {pagesShown.map((pageNum,i)=>(
    <li className="page-item"><button type="button " className={`btn btn-primary ${pageNum===page&&"active"}`}>{pageNum}</button></li>
   ))}
    <li className="page-item"><button className="page-link ms-4 btn">Next</button></li>
  </ul>
</nav>
  </>);
};

export default Main;
