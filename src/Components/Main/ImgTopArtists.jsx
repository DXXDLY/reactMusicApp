import React from 'react'
import { useNavigate } from 'react-router-dom'

const Img = ({images,artists}) => {
  const navigate = useNavigate()
  const ToTopArtist = () => {
    navigate(`/artist/${artists[0]?.id}`)
  }
  return (
    <div className='main__content-top-artist-track-img-first' onClick={ToTopArtist}>
            <img src={images[0]?.url} alt="image" />
            <p>{artists[0]?.name}</p>
        </div>
  )
}

export default Img