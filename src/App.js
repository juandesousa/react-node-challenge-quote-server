import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [searchRandom, setSearchRandom] = useState();
  const [searchTerm, setSearchTerm] = useState();

  useEffect(() => { getRandom() }
  ,[])

  const getRandom = () => {
    fetch("http://localhost:5000/quotes/random")
      .then(res => res.json())
      .then(data => setSearchRandom(data));
  }

  const getTerm = () => {
    console.log(searchTerm)
    fetch(`http://localhost:5000/quotes/search?term=${searchTerm}`)
    .then(res => res.json())
    .then(data => data.length>0 ? setSearchRandom(data[0]) : setSearchRandom({"quote":"No Results", "author":""}));
  }


  return (
    <>
    <div className="input-group p-5">
      <input type="text" className="form-control m-5" placeholder="Search Term" onChange={(event)=>setSearchTerm(event.target.value)}/>
      <button className="btn btn-outline-secondary m-5" type="button" onClick={getTerm}>Search</button>
      <button className="btn btn-outline-secondary m-5" type="button" onClick={getRandom}>Random</button>
    </div>
    {searchRandom ? <div className="p-5"><p className="card-text d-flex justify-content-center fs-1">{searchRandom.quote}</p><h5 className="card-title d-flex justify-content-end mx-5 px-5">{searchRandom.author}</h5></div> 
    : null}
    </>
  );
}

export default App;


