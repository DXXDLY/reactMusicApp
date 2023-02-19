import React, { useContext } from 'react'
import { AudioUrl, TokenContext } from '../../Context/AllContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemove } from '@fortawesome/free-solid-svg-icons'

import Modal from '../../utils/modal'
import axios from 'axios'

const LikedTrack = ({ track, index }) => {

    const { accessToken } = useContext(TokenContext)
    const { setUrlForAudioTrack } = useContext(AudioUrl)
    const [openModal, setOpenModal] = React.useState(false)
    const allDataToPlayer = [track.name, track.album.images[0].url, track.preview_url, track.artists[0].name, track.id]

    const deleteTrack = async () => {
        await axios.delete(
            `https://api.spotify.com/v1/me/tracks?ids=${track.id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + accessToken,
                },
            }
        );
        setOpenModal(true)
    }
    const clickImg = () => {
        setUrlForAudioTrack(allDataToPlayer)
    }

    const durationTrack = track.duration_ms

    const millisToMinutesAndSeconds = (durationTrack) => {
        const minutes = Math.floor(durationTrack / 60 / 1000) % 60;
        const seconds = Math.floor(durationTrack / 1000) % 60;
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    return (
        <div className='liked_track_full'>
            <div className='main__content-top-artist-track-img-liked' onClick={clickImg}>
                <div className='index_track'>{index}</div>
                <img
                    src={track.album.images[1].url}
                    alt="Tranding"
                />
                <audio
                    src={track.preview_url}
                    id="audioTrack">
                </audio>
                <div className='main__content-trending-artist-track-title'>
                    <p>{track.name}</p>
                    <p>{track.artists[0].name}</p>
                </div>
            </div>
            <div className="time"><p>{millisToMinutesAndSeconds(durationTrack)}</p></div>
            <div className="deleteLiked">
                <Modal open={openModal} />
                <FontAwesomeIcon icon={faRemove} onClick={deleteTrack} />
            </div>
        </div>
    )
}

export default LikedTrack