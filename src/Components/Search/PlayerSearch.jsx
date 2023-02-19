import React, { useContext, useState } from 'react'
import { faAdd, faHeart, faPause, faPlay, faVolumeDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import { TokenContext } from '../../Context/AllContext'

import axios from 'axios'

const PlayerSearch = ({ name, audioElem, isPlaying, setIsPlaying }) => {
  const { accessToken } = useContext(TokenContext)
  const [currentSong, setCurrentSong] = React.useState([0])
  const [artistId, setArtistId] = React.useState('')
  const [trackId, setTrackId] = React.useState('')
  const [volume, setVolume] = React.useState(30)
  const [liked, setLiked] = useState(false)
  const clickRef = React.useRef()
  const navigate = useNavigate()

  if (currentSong.progress == 100) {
    currentSong.progress = 0
  }

  React.useEffect(() => {
    if (name)
      audioElem.current.volume = volume / 100;
    // eslint-disable-next-line
  }, [volume])

  React.useEffect(() => {
    if (liked) {
      handleFollow()
    }
    else {
      setLiked(liked)
    }
  }, []);
  const toArtistLink = () => {
    setArtistId(name[5])
    if (!artistId == '') {
      navigate(`/artist/${artistId}`)
    }
  }

  const toTrackLink = () => {
    setTrackId(name[4])
    if (!trackId == '') {
      navigate(`/track/${trackId}`)
    }
  }

  const PlayPause = (e) => {
    e.preventDefault()
    setIsPlaying(!isPlaying)
  }

  const onPlaying = () => {
    const duration = audioElem.current.duration
    const currentTime = audioElem.current.currentTime
    setCurrentSong({ "progress": currentTime / duration * 100, 'length': duration })

  }

  const checkWidth = (e) => {
    let width = clickRef.current.clientWidth
    const offset = e.nativeEvent.offsetX
    const divProgress = offset / width * 100
    audioElem.current.currentTime = divProgress / 100 * currentSong.length
  }
  const handleFollow = async () => {
    setLiked(!liked)
    await axios.put(
      `https://api.spotify.com/v1/me/tracks?ids=${name[4]}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
  }
  const deleteFollow = async () => {
    setLiked(!liked)
    await axios.delete(
      `https://api.spotify.com/v1/me/tracks?ids=${name[4]}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );

  }
  return (
    <>
      {!name ? (<div></div>) : (
        <div className="player">
          <div className="music-player">
            <div className="song-bar">
              <div className="song-infos">
                <div className="image-container">
                  <img src={name[1]} alt="img" />
                </div>
                <div className="song-description">
                  <p className="title" onClick={toTrackLink}>{name[0]}</p>
                  <p className="artist" onClick={toArtistLink}>{name[3]}</p>
                </div>
              </div>
              <div className="liked"   >
                {!liked ? <FontAwesomeIcon icon={faAdd} onClick={handleFollow} /> : <FontAwesomeIcon icon={faHeart} onClick={deleteFollow} />}
              </div>
            </div>
            <div className="progress-controller">
              <div className="control-buttons">
                <a href="/#" onClick={PlayPause}>
                  {!isPlaying ? <FontAwesomeIcon icon={faPlay} /> : <FontAwesomeIcon icon={faPause} />}
                  <audio src={name[2]} ref={audioElem} onTimeUpdate={onPlaying}></audio>
                </a>
              </div>
              <div className="progress-container">
                <div className="progress-bar" onClick={checkWidth} ref={clickRef}>
                  <div className="progress" style={{ width: `${currentSong.progress + '%'}` }}></div>
                </div>
              </div>
            </div>
            <div className="other-features">
              <div className="volume-bar">
                <FontAwesomeIcon icon={faVolumeDown} />
                <input className='volume' type="range" min={0} max={100} value={volume}
                  onChange={e => setVolume(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>

  )
}

export default PlayerSearch