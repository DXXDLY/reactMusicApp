import React, { useContext } from 'react'
import { AudioUrl } from '../../Context/AllContext'

const GenreTrackSearch = ({ track }) => {
  const { setUrlForAudioTrack } = useContext(AudioUrl)
  const a = track.album.name
  const b = track.album.images[0].url
  const c = track.preview_url
  const d = track.artists[0].name
  const e = track.id
  const f = track.artists[0].id
  const final = [a, b, c, d, e, f]

  const clickImg = () => {
    setUrlForAudioTrack(final)
  }

  return (
    <>
      <div className="searchResult" onClick={clickImg}>
        <div className="searchResult__img">
          <img className='imageSearch' src={track.album.images[0].url} alt="imgTracks" />
        </div>
        <div className="searchResult__title">
          <p>{track.album.name}</p>
        </div>
        <audio src={track.preview_url}></audio>
      </div>
    </>
  )
}

export default GenreTrackSearch