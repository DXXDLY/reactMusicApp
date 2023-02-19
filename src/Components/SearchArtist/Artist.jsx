import React, { useContext } from 'react'
import { generateRandomColor } from '../../utils/randomColor'
import { AudioUrl, TokenContext } from '../../Context/AllContext';
import { Link } from 'react-router-dom';

import style from '../../UsedFrequently/Main.module.css'
import SpotifyWebApi from 'spotify-web-api-node';
import ArtistsName from './ArtistsName';
import { Loading } from '../Loader/Loading';

const spotifyApi = new SpotifyWebApi({
    clientId: 'ffbc598a32f044ab935465bbf1cb48c5',
})

const Artist = () => {
    const { accessToken } = useContext(TokenContext)
    
    const [value, setValue] = React.useState('1')
    const [result, setResult] = React.useState([])
    const [loading, setLoading] = React.useState(true);
    
    React.useEffect(() => {
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken]);

    React.useEffect(() => {
        spotifyApi.searchArtists(value).then(res => {
            setResult(res)
            setLoading(false)
        })
    }, [value, accessToken])

    return (
        <>
            <div className={style.main}>
                <h2 className={style.artist_Title}>Поиск Артистов</h2>
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
                    {
                        loading ? (
                            <Loading/>
                        ) : (
                            <>
                                {
                                    result.body.artists.items.map((e, index) => {
                                        return (
                                            <div className='searchResult_two' key={index}>
                                                <Link
                                                    style={{ backgroundColor: generateRandomColor() }}
                                                    className="card__type--category"
                                                    to={'/artist/' + e.id}
                                                >
                                                    <ArtistsName {...e} />
                                                </Link>
                                            </div>
                                        )
                                    })
                                }
                            </>
                        )
                    }
               
                </div>
            </div>
        </>
    )
}

export default Artist