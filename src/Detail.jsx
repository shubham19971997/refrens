import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import DETAIL from './CSS/Detail.module.css';

function Detail() {
  const location = useLocation();
  const { char } = location.state;
  const [chapInfo, setChapinfo] = useState();
  const [charLocation, setCharlocation] = useState();
  const [showMore, setShowmore] = useState(false);

  function fetchChapinfo() {
    const requests = char.episode.map((ep) => axios.get(ep));
    Promise.all(requests).then((res) => setChapinfo(res));
  }

  const fetchLocation = async () => {
    const response = await axios.get(char.location.url).catch((err) => {
      console.log('Error', err);
    });
    setCharlocation(response.data);
  };

  useEffect(() => {
    fetchLocation();
    fetchChapinfo();
  }, []);

  const allEpisodes = chapInfo && chapInfo.map((info) => info.data.name);

  return charLocation ? (
    <div className={DETAIL.detail}>
      <div className={DETAIL.char}>
        <img src={char.image} alt="imag" />
        <div className={DETAIL.info}>
          <div className={DETAIL.infocont}>
            <p className={DETAIL.name}>{char.name}</p>
            <p className={DETAIL.name}>{char.gender}</p>
          </div>
          <div className={DETAIL.infocont}>
            <p className={DETAIL.name}>{char.species}</p>
            <p className={DETAIL.name}>{char.status}</p>
          </div>
        </div>
      </div>
      <div>
        <div className={DETAIL.location}>
          <h2>Origin and Location</h2>
          <p>
            <span>Location:</span>
            {' '}
            {charLocation.name}
          </p>
          <p>
            <span>Dimension:</span>
            {' '}
            {charLocation.dimension}
          </p>
          <p>
            <span>Population:</span>
            {' '}
            {charLocation.residents.length}
          </p>
        </div>
        <div className={DETAIL.episodecontainer}>
          <div className={DETAIL.episodesname}>
            <h2>Episodes in which Character is Featured in.</h2>
          </div>
          <div className={DETAIL.episode}>
            {allEpisodes
              && allEpisodes
                .filter((episode, index) => {
                  if (allEpisodes.length > 5 && showMore) {
                    return episode;
                  } if (index < 5) {
                    return episode;
                  }
                  return 0;
                })
                .map((episode) => (
                  <p key={episode.length * char.id}>
                    {' '}
                    {episode}
                    ,
                  </p>
                ))}
          </div>
          {allEpisodes && allEpisodes.length > 5 ? (
            <button
              onClick={() => setShowmore(!showMore)}
              className={DETAIL.button}
              type="button"
            >
              {showMore
                ? 'Shome Less Episode Names'
                : 'Show More Episode Names'}
            </button>
          ) : (
            <button type="button" className={DETAIL.infobutton}>
              This Character have less than 5 episode appearance
            </button>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className={DETAIL.errorpage}>
      <p>Oooops!</p>
    </div>
  );
}

export default Detail;
