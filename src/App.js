import search from "./components/search-icon.svg";
import logo from "./components/m.svg";
import axios from "axios";
import {useState} from "react";
import styled from "styled-components";
import MovieComponent from "./components/MovieComponent";
import MovieInfoComponent from "./components/MovieInfoComponent";
export const API_KEY = "dc5d5b8b";


const Container = styled.div`
  display: flex;
  flex-direction: column; 
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #371B58;
  color: white;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  box-shadow: 0 3px 6px #555;
`

const Footer = styled.footer`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #371B58;
  color: white;
  text-align: center;
  font-size: 15px;
`;

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const MovieImage = styled.img`
  width: 50px;
  height: 50px;
  margin: 8px;
`

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  background-color: white;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
  align-items: center;
`;

const SearchIcon = styled.img`
width: 32px;
height: 32px;
`;

const SearchInput = styled.input`
  color:black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;

const MovieListContainer = styled.div`
  display: flex;  
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 24px;
  justify-content: space-evenly;
`;

const Placeholder = styled.img`
  width: 500px;
  height: 500px;
  margin: 150px;
`;

function App() {
  const [searchQuery, updateSearchQuery] = useState();
  const [timeoutId, updateTimeoutId] = useState();
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const fetchData = async (searchString) => {
    const response = await  axios.get(`https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`);
    updateMovieList(response.data.Search)
  };

  const onTextChange = (event) => {
      clearTimeout(timeoutId);
      updateSearchQuery(event.target.value);
      const timeout = setTimeout(() => fetchData(event.target.value), 500);
      updateTimeoutId(timeout);
    };
  return (

    <Container> 
    <Header>
      <AppName>
      
        <MovieImage src={logo} />
        Movie Monk
        </AppName>
        <SearchBox>
          <SearchIcon src={search} />
          <SearchInput placeholder="Search Movie" value={searchQuery} onChange={onTextChange}/>
        </SearchBox>
      </Header>
      {selectedMovie && (
        <MovieInfoComponent 
          selectedMovie={selectedMovie} 
          onMovieSelect={onMovieSelect} /> 
        )}
      <MovieListContainer>
        {movieList?.length 
          ? movieList.map((movie, index) => 
             <MovieComponent 
              key={index} 
              movie={movie} 
              onMovieSelect={onMovieSelect}   
              />) : (
               <Placeholder src={logo} />
               )}
      <Footer> Created by @AyushKr15 </Footer>    
      </MovieListContainer>
     
  
    </Container>
    
  );
}

export default App;
