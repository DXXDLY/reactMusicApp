import React from 'react'
import style from '../Module/TheSetting.module.css'
const TheSettingContent = ({ display_name, images, followers }) => {
    const logout = () => {
        window.localStorage.removeItem('token')
        window.location.reload()
    }
    return (
        <div className={style.mainProfileContent}>
            <h3>Фото профиля</h3>
            <div className={style.nameProfile}>
                <div className={style.imageProfile}>
                    <img src={images[0].url} alt="LogoProfile" />
                </div>
                <div className={style.exit} onClick={logout}>
                    <h2>Выход</h2>
                </div>
            </div>
            <div className={style.infoProfile}>
                <h3><span>Имя аккаунта : </span>{display_name}</h3>
                <h4><span>Подписчики : </span>{followers.total}</h4>
            </div>
        </div>
    )
}

export default TheSettingContent