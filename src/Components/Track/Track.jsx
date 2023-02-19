import React, { useContext, useState } from 'react'
import { TokenContext } from '../../Context/AllContext';
import { useParams } from 'react-router-dom';
import { Loading } from '../../Components/Loader/Loading'

import styleTrack from './TrackModule/Track.module.css'
import style from '../../UsedFrequently/Main.module.css'
import axios from 'axios';

const Track = () => {
    
    const { accessToken } = useContext(TokenContext)
    const [track, setTrack] = useState([])
    const [loading, setLoading] = useState(true)
    const [lyrics, setLyrics] = useState('')
    const [lyricsError, setLyricsError] = useState('')
    const { id } = useParams();

    React.useEffect(() => {
        if (accessToken)
            axios
                .get(
                    `https://api.spotify.com/v1/tracks/${id}`,
                    {
                        headers: {
                            Authorization: 'Bearer ' + accessToken,
                        },
                    },
                )
                .then((e) => {
                    setTrack(e.data)
                })
    }, [accessToken]);

    React.useEffect(() => {
        if (accessToken)
            axios
                .get(
                    `https://spotify-lyric-api.herokuapp.com/?trackid=${id}`
                )
                .then((e) => {
                    setLyrics(e)
                })
                .catch(err => {
                    if(err.response.status === 404) {
                        setLyricsError('Текст отсутствует :(')
                    }
                })
        setLoading(false)
    }, [accessToken,loading])

    return (
        <>
            {
                loading ?
                    (<Loading />)
                    : (
                        <div className={style.main}>
                            <div className={styleTrack.header_track}>
                                <div className={styleTrack.imageTrack}><img src={track?.album?.images[0]?.url} alt="" /></div>
                                <div className={styleTrack.nameTrack}><p>Трек</p><br />{track.name}</div>
                            </div>
                            <div className={styleTrack.textTrack}>
                                <p>Текст песни</p>
                                <div className={styleTrack.textForTrack}>
                                    {
                                        lyrics?.data?.lines?.map(item => {
                                            return (
                                                <p>{item?.words}</p>
                                            )
                                        })
                                    }
                                </div>
                                <div className={styleTrack.textForTrackError}>
                                    {lyricsError}
                                </div>
                            </div>
                        </div>
                    )
            }
        </>
    )
}

export default Track