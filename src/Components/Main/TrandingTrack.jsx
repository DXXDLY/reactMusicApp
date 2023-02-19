
import React from 'react'

const TrandingTrack = ({ img, title, subtitle, audio, index, onClick, time }) => {
  const a = [img, title, subtitle, audio]
  const clickImg = () => {
    onClick(a)
  }
  return (
    <>
      <div className='trand'>
        <div className='main__content-top-artist-track-img' onClick={clickImg}>
          <div className='index_track'>{index}</div>
          <img src={img} alt="Tranding" />
          <audio src={audio} id="audioTrack"></audio>
          <div className='main__content-trending-artist-track-title'>
            <p>{title}</p>
            <p>{subtitle}</p>
          </div>
        </div>
        <div className='timeTrendTrack'>
          <div className="time">{time}</div>
        </div>
      </div>
    </>

  )
}

export default TrandingTrack