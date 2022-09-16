import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import HOMEPAGE from './CSS/Homepage.module.css';

function Homepage() {
  const [characters, setCharacters] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const fetchProducts = async () => {
    const response = await axios
      .get(`https://rickandmortyapi.com/api/character/?page=${currentPage}`)
      .catch((err) => {
        console.log('Error', err);
      });
    setCharacters(response.data.results);
  };
  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const totalPages = [];
  for (let i = 1; i <= 42; i += 1) {
    totalPages.push(i);
  }

  return (
    <div className={HOMEPAGE.container}>
      {characters
        && characters.map((char) => (
          <Link
            to="/Detail"
            state={{
              char,
            }}
            key={char.id}
          >
            <div className={HOMEPAGE.card} key={char.id}>
              <img src={char.image} alt="morty rocks!" />
              <div className={HOMEPAGE.info}>
                <div className={HOMEPAGE.infols}>
                  <p>
                    {char.name}
                  </p>
                  <p>
                    {char.species}
                  </p>
                </div>
                <div className={HOMEPAGE.infols}>
                  <p>
                    {char.gender}
                  </p>
                  <p>
                    {char.status}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      <div className={HOMEPAGE.pagntncontainer}>
        {/* {totalPages.map((page) => (
          <p
            onClick={() => setCurrentPage(page)}
            className={
                currentPage === page ? HOMEPAGE.selected : HOMEPAGE.pagntn
              }
            key={page}
            aria-hidden="true"
          >
            {page}
          </p>
        ))} */}
        {currentPage > 1 ? <button type="button" onClick={() => setCurrentPage(currentPage - 1)}>Prev</button> : <button type="button">Prev</button>}
        <p>
          {`${currentPage} `}
          out of
          {` ${totalPages.length}`}
        </p>
        {currentPage > 41 ? <button type="button">Next</button> : <button onClick={() => setCurrentPage(currentPage + 1)} type="button">Next</button>}
      </div>
    </div>
  );
}

export default Homepage;
