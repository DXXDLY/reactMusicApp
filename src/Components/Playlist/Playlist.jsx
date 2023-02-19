import React, { useEffect, useState, useContext } from 'react'
import { trackToMyPlaylist } from '../../pages/Home'
import { TokenContext } from '../../Context/AllContext'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd } from '@fortawesome/free-solid-svg-icons'

import stylePlaylist from './Playlist.module.css'
import PlaylistItem from './PlaylistItem'
import style from '../../UsedFrequently/Main.module.css'

// import { motion } from "framer-motion"

import axios from 'axios'

const Playlist = () => {
    const { setTrackPlaylist } = useContext(trackToMyPlaylist)
    const { accessToken } = useContext(TokenContext)
    const [getPlaylistUser, setGetPlaylistUser] = useState([])
    const [createPlaylist, setCreatePlaylist] = useState([]);
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')

    const userID = '312v3d7uo3ksdd3vdejlndglrc4a'

    useEffect(() => {
        axios.post(
            `https://api.spotify.com/v1/users/${userID}/playlists`,
            {
                'name': `${name}`,
                'description': `${description}`,
                'public': false
            },
            {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                },
            }
        ).then(e => {
            setCreatePlaylist(e.data)
        }).catch(e => {
            console.log(e)
        })

    }, [name, description])
    useEffect(() => {
        axios.get('https://api.spotify.com/v1/me/playlists', {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        }).then(e => {
            setGetPlaylistUser(e.data.items.slice(0, 1))
        }).catch(e => {
            console.log(e)
        })
    }, [])

    const onClickCreatePlaylist = () => {
        if (name.length == 0) {
            alert('Введите название')
        }
        if (description.length == 0) {
            alert('Введите описание')
        }
        alert(`Плейлист создан \n Название: ${name}` )
    }

    setTrackPlaylist(getPlaylistUser)

    return (
        <div className={style.main}>
            <div className={style.main__content}>
                <div>
                    <h1>Плейлисты</h1>
                </div>
                <div className={stylePlaylist.create_playlist_title}>
                    <h4>Создать плейлист</h4>
                </div>
                <div className={stylePlaylist.playlist_create_main}>
                    <div className={stylePlaylist.create_playlist}>
                        <div className={stylePlaylist.create_playlist__button} onClick={onClickCreatePlaylist}>
                            <FontAwesomeIcon icon={faAdd} />
                        </div>
                    </div>
                    <div className={stylePlaylist.formPlaylist}>
                        <input
                            type="text"
                            id="text"
                            className="text"
                            placeholder="Name"
                            value={name}
                            onInput={e => setName(e.target.value)}
                        />
                        <input
                            type="text"
                            id="text"
                            className="text"
                            placeholder="description"
                            value={description}
                            onInput={e => setDescription(e.target.value)}
                        />
                    </div>
                </div>
                <div className={stylePlaylist.playlist}>
                    <h2>Мои плейлисты</h2>
                    <div style={{ display: 'flex' }}>
                        {getPlaylistUser.map((item, index) => {
                            return (
                                <Link to={'/playlistitem/' + item?.id} key={index}>
                                    <PlaylistItem
                                        {...item}
                                    />
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Playlist