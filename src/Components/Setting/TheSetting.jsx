import React, { useContext, useEffect, useState } from 'react'
import { TokenContext } from '../../Context/AllContext'
import { Loading } from '../Loader/Loading'

import TheSettingContent from './Module/TheSettingContent'

import styleSetting from './Module/TheSetting.module.css'
import style from '../../UsedFrequently/Main.module.css'
import axios from 'axios'
const TheSetting = () => {
    const { accessToken } = useContext(TokenContext)
    const [profileContent, setProfileContent] = useState([])
    const [loader, setLoader] = useState(true)
    useEffect(() => {
        if (accessToken)
            axios.get('https://api.spotify.com/v1/me',
                {
                    headers: {
                        Authorization: 'Bearer ' + accessToken,
                    }
                }
            )
                .then((e) => {
                    setProfileContent(e.data)
                    setLoader(false)
                })
                .catch(err => {
                    console.log(err)
                })
    }, [accessToken])

    return (
        <>
            {
                loader ?
                    <Loading />
                    : (
                        <div className={style.main}>
                            <div className={styleSetting.setting_main}>
                                <h1 className={styleSetting.Title_SettingBlock}>Настройки Аккаунта</h1>
                            </div>
                            {
                                <TheSettingContent {...profileContent} />
                            }
                        </div>
                    )
            }
        </>

    )
}

export default TheSetting