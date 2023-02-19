import React from 'react'
import { faCompress, faDesktop, faHeart, faListUl, faPause, faPlay, faRandom, faStepBackward, faStepForward, faUndoAlt, faVolumeDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const PlayerGenre = ({ name, audioElem, isPlaying, setIsPlaying }) => {
  const [currentSong, setCurrentSong] = React.useState([0])
  const clickRef = React.useRef()
  React.useEffect(() => {
    if (isPlaying) {
        audioElem.current.play()
    }
    else {
        audioElem.current.pause()
    }
}, [isPlaying]);
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

  return (
    <div className="player">
      <div className="music-player">
        <div className="song-bar">
          <div className="song-infos">
            <div className="image-container">
              <img src={name[1]} alt="" />
            </div>
            <div className="song-description">
              <p className="title">
                {name[0]}
              </p>
              <p className="artist">{name[3]}</p>
            </div>
          </div>
          <div className="icons">
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
            <span>0:49</span>
            <div className="progress-bar" onClick={checkWidth} ref={clickRef}>
              <div className="progress" style={{ width: `${currentSong.progress + '%'}` }}></div>
            </div>
            <span>3:15</span>
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
  )
}

export default PlayerGenre