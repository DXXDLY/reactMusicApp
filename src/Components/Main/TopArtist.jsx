import React, { useContext } from 'react'
import axios from 'axios';
import Img from './ImgTopArtists';
import { Link } from 'react-router-dom';
import { LoaderContext } from './Main.tsx';
import { TokenContext } from '../../Context/AllContext';

const TopArtist = () => {
    const { accessToken } = useContext(TokenContext);
    const [artists, setArtists] = React.useState([])
    const { setLoading } = useContext(LoaderContext)
    React.useEffect(() => {
        if (!accessToken) return
        const fetchData = async () => {
            await axios.get('https://api.spotify.com/v1/browse/new-releases', {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            })
                .then(playlistResponse => {
                    setArtists(playlistResponse.data.albums.items)
                })
        }
        fetchData()
        setLoading(false)
        // eslint-disable-next-line
    }, [accessToken])

    return (
        <div className="main__content-top-artist">
            <div className="main__content-top-artist-title">
                <p>Top Artist</p>
                <span><Link to="/artist">See all</Link></span>
            </div>
            <div className="main__content-top-artist-track">
                <div className="main__content-top-artist-track-title">
                    {
                        artists.slice(0, 3).map((item, index) => {
                            return (
                                <Img {...item} key={index} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default TopArtist