import React from 'react'
import images from '../../assets/img/cil-album.svg'
import styles from './Modules/TheNavLogo.module.css'

const TheNavLogo = () => {
  return (
    <div className={styles.nav__logo}>
      <img src={images} alt="logo" />
    </div>
  )
}

export default TheNavLogo