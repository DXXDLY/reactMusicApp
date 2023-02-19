import React from 'react'
import { Link } from 'react-router-dom'

const NavItem = ({ ulName, liName, name, navTwo, navThree }) => {
  return (
    <>
      <ul className={ulName}>
        <li className={liName}><Link to='/'><span className="material-symbols-outlined">{name[1]}</span></Link></li>
        <li className={liName}><Link to='search'><span className="material-symbols-outlined">{name[2]}</span></Link></li>
        <li className={liName}><Link to='artist'><span className="material-symbols-outlined">{name[4]}</span></Link></li>
        <li className={navTwo.liName}><Link to='playlist'><span className="material-symbols-outlined">{navTwo.name[3]}</span></Link></li>

      </ul>
      <ul className={navTwo.ulName}>
        <li className={navTwo.liName}><Link to='likes'><span className="material-symbols-outlined">{navTwo.name[1]}</span></Link></li>
        <li className={navTwo.liName}><span className="material-symbols-outlined"></span></li>
        <li className={navTwo.liName}><span className="material-symbols-outlined"></span></li>
      </ul>
      <div className={navThree.ulName}>
        <li className={navThree.liName}><Link to={'/setting'}><span className="material-symbols-outlined">{navThree.name[1]}</span></Link></li>
      </div>
    </>

  )
}

export default NavItem