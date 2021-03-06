import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';

const IMG_API = "https://image.tmdb.org/t/p/w1280";
const defaultImage =
  "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";

const MovieCard = ({title, backdrop_path, overview, vote_average,id}) => {

  const toastId = React.useRef(null);
  
  const loginFirst = () => {
    if(! toast.isActive(toastId.current)) {
      toastId.current = toast("You need to login first");
    }
  }

const {currentUser} = useContext(AuthContext)
let navigate = useNavigate()
  return (
    <div className="movie" onClick={currentUser? ()=> navigate("details/"+id):loginFirst} >
<img src={backdrop_path?IMG_API+backdrop_path:defaultImage} alt="" />
<div className="d-flex align-items-baseline justify-content-between p-1 text-white">
    <h5>{title}</h5>
    {currentUser&&<span className={`tag ${vote_average>=8?"green": vote_average>=6?"orange":"red"}`}>{vote_average}</span>}
</div>
<div className="movie-over">
<h2>Overview</h2>
<p>{overview}</p>

</div>

    </div>
  )
}

export default MovieCard