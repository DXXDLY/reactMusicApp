import React, { useContext } from 'react'
import { AudioUrl, TokenContext } from '../../Context/AllContext';
import { useParams } from 'react-router-dom'
import { Loading } from '../Loader/Loading';

import SpotifyWebApi from 'spotify-web-api-node';
import ArtistTracks from './ArtistTracks';

import style from '../../UsedFrequently/Main.module.css'
import axios from 'axios';
import PlayerSearch from '../Search/PlayerSearch';

const ArtistPages = () => {

    const [artistTrack, setArtistTrack] = React.useState([])
    const [artist, setArtist] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const { urlForAudioTrack } = useContext(AudioUrl)
    const { accessToken } = useContext(TokenContext)
    const { id } = useParams();

    const audioElem = React.useRef()

    const [isPlaying, setIsPlaying] = React.useState(false)

    React.useEffect(() => {
        if (isPlaying) {
            audioElem?.current?.play()
        }
        else {
            audioElem?.current?.pause()
        }
    }, [isPlaying]);

    const spotifyApi = new SpotifyWebApi({
        clientId: 'ffbc598a32f044ab935465bbf1cb48c5',
    })

    React.useEffect(() => {
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken]);

    React.useEffect(() => {
        if (accessToken)
            axios
                .get(
                    `https://api.spotify.com/v1/artists/${id}`,
                    {
                        headers: {
                            Authorization: 'Bearer ' + accessToken,
                        },
                    },
                )
                .then((e) => {
                    setArtist(e.data)
                })
                .catch(err => {
                    console.log(err)
                })
    }, [accessToken]);

    React.useEffect(() => {
        spotifyApi.getArtistTopTracks(id, 'GB').then(res => {
            setArtistTrack(res.body.tracks)
            setLoading(false)
        })
    }, [accessToken]);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className={style.main}>
                    <div className="main_artist">
                        <div className="header__artist">
                            <div className="header__artists_img" style={{ backgroundImage: `url(${artist.images[0]?.url})` }}>
                            </div>
                        </div>
                        <div className="liked__title">
                            <h2>Популярные треки</h2>
                        </div>
                        <div className="popular_track">
                            <div className="main__content-trending-artist-title">
                                {artistTrack.map((item, index) => {
                                    return (
                                        <ArtistTracks {...item} index={index} key={index} />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <PlayerSearch
            name={urlForAudioTrack}
            audioElem={audioElem}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
        />
        </>
    )
}

export default ArtistPages