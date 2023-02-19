import React, { createContext, useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AudioUrl, TokenContext } from '../Context/AllContext'

import PlaylistTrack from '../Components/PlaylistItem/PlaylistTrack'
import TheSearchTrack from '../Components/Search/TheSearchTrack'
import ArtistPages from '../Components/ArtistPages/ArtistPages'
import GenreTemplate from '../Components/Genre/GenreTemplate'
import TheSetting from '../Components/Setting/TheSetting'
import GenreTrack from '../Components/Genre/GenreTrack'
import Playlist from '../Components/Playlist/Playlist'
import Artist from '../Components/SearchArtist/Artist'
import TheNav from '../Components/TheNav/TheNav'
import Main from '../Components/Main/Main.tsx'
import Likes from '../Components/Likes/Likes'
import Track from '../Components/Track/Track'
import Login from '../Components/Login/Login'

export const trackToMyPlaylist = createContext()

const Home = ({ code }) => {

  const [accessToken, setAccessToken] = useState('');
  const [urlForAudioTrack, setUrlForAudioTrack] = useState([]);
  const [trackPlaylist, setTrackPlaylist] = useState([]);

  useEffect(() => {
    setAccessToken(code)
  }, [code]);

  return (
    <div className="wrapper__flex_main">
      <TokenContext.Provider value={{ accessToken }}>
        <AudioUrl.Provider value={{urlForAudioTrack, setUrlForAudioTrack}}>
          <TheNav />
          <trackToMyPlaylist.Provider value={{ trackPlaylist, setTrackPlaylist }}>
            <Routes>
              <Route path='/' element={<Main />} />
              <Route path='/login' element={<Login />} />
              <Route path='/search' element={<TheSearchTrack />} />
              <Route path='/likes' element={<Likes />} />
              <Route path='/artist' element={<Artist />} />
              <Route path="/genre/:id" element={<GenreTemplate />} />
              <Route path="/artist/:id" element={<ArtistPages />} />
              <Route path="/genretrack/:id" element={<GenreTrack />} />
              <Route path="/track/:id" element={<Track />} />
              <Route path="/playlist" element={<Playlist />} />
              <Route path="/playlistitem/:id" element={<PlaylistTrack />} />
              <Route path="/setting" element={<TheSetting />} />
            </Routes>
          </trackToMyPlaylist.Provider>
        </AudioUrl.Provider>
      </TokenContext.Provider>
    </div>
  )
}

export default Home