import axios from 'axios';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { generateRandomColor } from '../../utils/randomColor'
import style from '../../UsedFrequently/Main.module.css'
import SpotifyWebApi from 'spotify-web-api-node';
import SearchResult from './SearchResult';
import PlayerSearch from './PlayerSearch'
import { AudioUrl, TokenContext } from '../../Context/AllContext';
import { Loading } from '../Loader/Loading';

const spotifyApi = new SpotifyWebApi({
  clientId: 'ffbc598a32f044ab935465bbf1cb48c5',
})

const TheSearchTrack = () => {
  const {urlForAudioTrack} = useContext(AudioUrl)
  const { accessToken } = useContext(TokenContext);
  const [value, setValue] = React.useState('');
  const [categoriesData, setCategoriesData] = React.useState('');
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [loading, setLoading] = React.useState(true);
  const [searchResult, setSearchResult] = React.useState([]);
  const audioElem = React.useRef()

  React.useEffect(() => {
    if (isPlaying) {
      audioElem?.current?.play()
    }
    else {
      audioElem?.current?.pause()
    }
  }, [isPlaying]);

  React.useEffect(() => {
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken]);

  React.useEffect(() => {
    spotifyApi.searchTracks(value).then(res => {
      setSearchResult(res.body.tracks.items)
    })
  }, [value, accessToken])

  React.useEffect(() => {
    if (accessToken) {
      axios
        .get(
          'https://api.spotify.com/v1/browse/categories?country=BR&limit=50',
          {
            headers: {
              Authorization: 'Bearer ' + accessToken,
            },
          },
        )
        .then((e) => {
          setCategoriesData(e.data);
          setLoading(false);
        });
    }
  }, [accessToken])

  return (
    <>
      <div className={style.main}>
        <h2 className={style.artist_Title}>Поиск Треков</h2>
        <div className={style.main__content_title}>
          <div className={style.main__content_search}>
            <input
              type="search"
              id="search"
              className="search"
              placeholder="Search"
              value={value}
              onChange={e => setValue(e.target.value)}
            />
            <div className="btn__search"></div>
          </div>
        </div>
        <div className="parent">
          {loading ? (
            <Loading/>
          ) : (searchResult.length !== 0 ? (
            <>
              {
                searchResult.map((item, index) => {
                  return (
                    <SearchResult
                      {...item}
                      index={index}
                      key={index}
                    />
                  )
                })
              }
            </>
          ) : (
            <>
              {categoriesData.categories.items.map((e, index) => (
                <>
                  <div className='searchResult_two' >
                    <Link
                      key={index}
                      style={{ backgroundColor: generateRandomColor() }}
                      className="card__type--category"
                      to={'/genre/' + e.id}
                    >
                      <img className="card__img" src={e.icons[0].url} alt="1" />
                      <div className="card__title" >
                        <span>{e.name}</span>
                      </div>
                    </Link>
                  </div>
                </>
              ))}
            </>
          ))}
        </div>
      </div>
      <PlayerSearch
        name={urlForAudioTrack}
        audioElem={audioElem}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </>

  )
}

export default TheSearchTrack