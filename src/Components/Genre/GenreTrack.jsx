import React, { useContext } from 'react'
import { AudioUrl, TokenContext } from '../../Context/AllContext';
import { useParams } from 'react-router-dom';
import { Loading } from '../Loader/Loading';

import GenreTrackSearch from './GenreTrackSearch';
import PlayerGenre from '../Search/PlayerSearch'
import axios from 'axios';
import style from '../../UsedFrequently/Main.module.css'

const GenreTrack = () => {

    const [trackPlaylist, setTrackPlaylist] = React.useState([])

    const [isPlaying, setIsPlaying] = React.useState(false)
    const [loading, setLoading] = React.useState(true);

    const { urlForAudioTrack } = useContext(AudioUrl)
    const { accessToken } = useContext(TokenContext)

    const audioElem = React.useRef()
    const { id } = useParams();

    React.useEffect(() => {
        if (isPlaying) {
            audioElem?.current?.play()
        }
        else {
            audioElem?.current?.pause()
        }
    }, [isPlaying]);

    React.useEffect(() => {
        if (accessToken)
            axios
                .get(
                    `https://api.spotify.com/v1/playlists/${id}`,
                    {
                        headers: {
                            Authorization: 'Bearer ' + accessToken,
                        },
                    },
                )
                .then((e) => {
                    setTrackPlaylist(e.data)
                    setLoading(false)
                })
    }, [accessToken]);

    return (

        <>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <div className={style.main}>
                        <div className="genre__header">
                            <h1>{trackPlaylist.name}</h1>
                        </div>
                        <div className="parent">
                            {
                                trackPlaylist.tracks.items.slice(0, 25).map((item, index) => {
                                    return (
                                        <GenreTrackSearch {...item} index={index} />
                                    )
                                })
                            }
                        </div>
                    </div>
                    <PlayerGenre
                        name={urlForAudioTrack}
                        audioElem={audioElem}
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
                    />
                </>
            )}
        </>

    )
}

export default GenreTrack