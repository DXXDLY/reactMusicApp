import axios from 'axios';
import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Loading } from '../Loader/Loading';
import { TokenContext } from '../../Context/AllContext';

import style from '../../UsedFrequently/Main.module.css'
import GenreItems from './GenreItems';

const GenreTemplate = () => {
    const { accessToken } = useContext(TokenContext)
    const [loading, setLoading] = React.useState(true);
    const [pageData, setPageData] = React.useState('');
    const [data, setData] = React.useState('');
    const { id } = useParams();

    let navigate = useNavigate();

    React.useEffect(() => {
        setData('');
        setLoading(true);
        if (accessToken)
            Promise.all([
                axios
                    .get(
                        `https://api.spotify.com/v1/browse/categories/${id}/playlists?limit=50`,
                        {
                            headers: {
                                Authorization: 'Bearer ' + accessToken,
                            },
                        },
                    )
                    .then((e) => {
                        setData(
                            e.data.playlists.items
                        );
                    })
                    .catch(err => {
                        if (err.response.status === 404) {
                            const isConfirmed = window.confirm(`'Причина ошибки: ' ${err}`)
                            if (isConfirmed) {
                                navigate("/search")
                            } else {
                                navigate("/search")
                            }
                        }
                    }),
                axios
                    .get(`https://api.spotify.com/v1/browse/categories/${id}`, {
                        headers: {
                            Authorization: 'Bearer ' + accessToken,
                        },
                    })
                    .then((e) => {
                        setPageData(e.data);
                    }),
            ]).then(() => {
                setLoading(false);
            });
    }, [id, accessToken]);
    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className={style.main}>
                    <div className="page__wrapper">
                        <div className="genre__header">
                            <div className="genre__header_img">
                                <img src="" alt="" />
                            </div>
                            <h1>{pageData?.name}</h1>
                        </div>
                        <div className="genre__template">
                            <div className="parentTwo">
                                {data?.map((item, index) => {
                                    return (
                                        <Link
                                            key={index}
                                            to={'/genretrack/' + item?.uri?.split(':')[2]}
                                        >
                                            <GenreItems item={item} key={index} />
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default GenreTemplate