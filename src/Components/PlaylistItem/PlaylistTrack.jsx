import React, { useContext, useEffect, useState } from 'react'
import { AudioUrl, TokenContext } from '../../Context/AllContext';
import { useParams } from 'react-router-dom';
import { Loading } from '../Loader/Loading';

import style from '../../UsedFrequently/Main.module.css'
import axios from 'axios';
import PlayerSearch from '../Search/PlayerSearch';
import PlaylistTrackMore from './PlaylistTrackMore';

const PlaylistTrack = () => {
  const { accessToken } = useContext(TokenContext)
  const { urlForAudioTrack } = useContext(AudioUrl)
  const [loading, setloading] = useState(true)
  const [state, setstate] = useState([]);
  const { id } = useParams();

  const audioElem = React.useRef()

  const [isPlaying, setIsPlaying] = React.useState(false)

  React.useEffect(() => {
    if (isPlaying) {
      audioElem?.current?.play()
    }
    else {
      audioElem?.current?.pause()
    }
  }, [isPlaying]);

  useEffect(() => {
    axios.get(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
      .then(e => setstate(e.data.items))
      .catch(e => console.log(e))
    setloading(false)
  }, []);

 

  return (
    <>
      {
        loading ?
          <Loading /> :
          <div className={style.main}>
            <h1 className={style.playlistTrackTitle}>Треки</h1>
            {
              state.map((item, index) => {
                
                return (
                  <div className='parent'>
                    <PlaylistTrackMore {...item} key={index} index={index}/>
                  </div>
                )
              })
            }
          </div>
      }
      <PlayerSearch
        name={urlForAudioTrack}
        audioElem={audioElem}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </>
  )
}

export default PlaylistTrack