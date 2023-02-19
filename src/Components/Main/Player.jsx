import React from 'react'
import { faPause, faPlay, faVolumeDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Player = ({ name, audioElem, isPlaying, setIsPlaying }) => {
  const [currentSong, setCurrentSong] = React.useState([0])
  const clickRef = React.useRef()
  const PlayPause = () => {
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

  return (
    <>
      {!name ? (<div></div>) : (
        <div className="player">
          <div className="music-player">
            <div className="song-bar">
              <div className="song-infos">
                <div className="image-container">
                  <img src={name[0]} alt="" />
                </div>
                <div className="song-description">
                  <p className="title">
                    {name[1]}
                  </p>
                  <p className="artist">{name[2]}</p>
                </div>
              </div>
            </div>
            <div className="progress-controller">
              <div className="control-buttons">
                <a href="/#" onClick={PlayPause}>
                  {!isPlaying ? <FontAwesomeIcon icon={faPlay} /> : <FontAwesomeIcon icon={faPause} />}

                  <audio src={name[3]} ref={audioElem} onTimeUpdate={onPlaying}></audio>
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
                <div className="progress-bar">
                  <div className="progressVolume"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Player