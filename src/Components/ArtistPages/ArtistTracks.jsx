import React, { useContext } from 'react'
import { AudioUrl } from '../../Context/AllContext'

const ArtistTracks = ({ index, album, name, artists, preview_url, id }) => {
    
    const allDataToPlayer = [
        name,
        album.images[0].url,
        preview_url, artists[0].name,
        id,
        artists[0].id
    ]

    const { setUrlForAudioTrack } = useContext(AudioUrl)
    const clickImg = () => {
        setUrlForAudioTrack(allDataToPlayer)
    }
    return (
        <div>
            <div className='main__content-top-artist-track-img-liked' onClick={clickImg}>
                <div className='index_track'>{index}</div>
                <img src={album.images[1].url} alt="Tranding" />
                <audio src={preview_url} id="audioTrack"></audio>
                <div className='main__content-trending-artist-track-title'>
                    <p>{name}</p>
                    <p>{artists[0].name}</p>
                </div>
            </div>
        </div>
    )
}

export default ArtistTracks