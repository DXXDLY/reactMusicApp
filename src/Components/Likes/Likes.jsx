import React, { useContext, useEffect } from 'react'
import { AudioUrl, TokenContext } from '../../Context/AllContext'
import { Loading } from '../Loader/Loading'

import PlayerSearch from '../Search/PlayerSearch'
import LikedTrack from './LikedTrack'
import style from '../../UsedFrequently/Main.module.css'
import axios from 'axios'

const Likes = () => {
  const [likedSong, setLikedSong] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const { accessToken } = useContext(TokenContext)
  const { urlForAudioTrack } = useContext(AudioUrl)

  const audioElem = React.useRef()

  useEffect(() => {
    if (accessToken)
      axios
        .get(
          `https://api.spotify.com/v1/me/tracks`,
          {
            headers: {
              Authorization: 'Bearer ' + accessToken,
            },
          },
        )
        .then((e) => {
          setLikedSong(e.data.items)
        })
        .catch(err => {
          console.log(err)
        })
    setLoading(false)
  }, [accessToken])

  const [isPlaying, setIsPlaying] = React.useState(false)

  React.useEffect(() => {
    if (isPlaying) {
      audioElem?.current?.play()
    }
    else {
      audioElem?.current?.pause()
    }
  }, [isPlaying]);
  
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={style.main}>
          <div className="main__content-title_liked">
            <div className="liked__title2">
              <h1>Любимые треки</h1>
            </div>
          </div>
          <div className="parent">
            <div className="popular_track">
              <div className="main__content-trending-artist-title">
                {likedSong.map((item, index) => {
                  return (
                    <LikedTrack
                      {...item}
                      key={index}
                      index={index}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
      <PlayerSearch
        name={urlForAudioTrack}
        audioElem={audioElem}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </>

  )
}

export default Likes