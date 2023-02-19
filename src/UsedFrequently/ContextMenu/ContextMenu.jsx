import React, { useContext, useEffect, useState } from 'react'
import style from './ContextMenu.module.css'
import { trackToMyPlaylist } from '../../pages/Home'
import axios from 'axios'
const ContextMenu = ({ x, y, closeMenu, code, preview }) => {
  const accessToken = code
  const { trackPlaylist } = useContext(trackToMyPlaylist)
  const [setResult, setSetResult] = useState([]);
  useEffect(() => {
    axios.post(
      `https://api.spotify.com/v1/playlists/${trackPlaylist[0]?.id}/tracks`,
      '',
      {
        params: {
          'uris': `spotify:track:${preview}`
        },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        }
      }
    ).then(e => {
      setSetResult(e.data)
    })
  }, [])
  const result = () => {
    console.log(setResult)
  }
  return (
    <div
      onClick={() => closeMenu()}
      className={style.absolute}
      style={{ top: `${y}px`, left: `${x}px` }}
    >
      <p>Добавить в плейлист</p>
      {
        trackPlaylist.map(item => {
          return (
            <div>
              <ul>
                <li className={style.menu__li} onClick={result}>{item.name} </li>
              </ul>
            </div>
          )
        })
      }
    </div>
  )
}

export default ContextMenu