import React from 'react'
import stylePlaylist from './Playlist.module.css'

const PlaylistItem = ({ name, description }) => {
  return (
    <div className={stylePlaylist.card__type__category}>
        <div className={stylePlaylist.namePlaylist}>
          <h3 style={{ color: "black" }}>{name}</h3>
          <h5 style={{ color: "black" }}>{description}</h5>
        </div>
    </div>
  )
}

export default PlaylistItem