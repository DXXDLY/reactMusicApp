import React, { useContext } from 'react'
import { AudioUrl } from '../../Context/AllContext'

const PlaylistTrackMore = ({track,index}) => {

    const { setUrlForAudioTrack } = useContext(AudioUrl)

  const allDataToPlayer = [
    track?.name,
    track?.album.images[0].url,
    track?.preview_url, track?.artists[0].name,
    track?.id,
    track?.artists[0].id
  ]

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
        <>
            <div className='liked_track_full' onClick={clickImg}>
                <div className='main__content-top-artist-track-img-liked'>
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
                        <p>{track?.name}</p>
                        <p>{track?.artists[0].name}</p>
                    </div>
                </div>
                <div className="time"><p>{millisToMinutesAndSeconds(durationTrack)}</p></div>
            </div>
        </>
    )
}

export default PlaylistTrackMore