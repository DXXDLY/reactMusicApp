import React from 'react'
import NavItem from './TheNavItem'
import TheNavLogo from './TheNavLogo'

const TheNav = () => {
    const navContent = [{
        id: 1,
        ulName: "nav__list",
        liName: "nav__list-item",
        name: {
            1: 'home',
            2: 'search',
            3: 'folder_open',
            4: 'person'
        },
        navTwo: {
            ulName: "nav__list",
            liName: "nav__list-item",
            name: {
                1: 'favorite',
                2: 'star_rate',
                3: 'folder_open',
            }
        },
        navThree: {
            ulName: "nav__list-bottom",
            liName: "nav__list-item",
            name: {
                1: 'settings'
            }
        }
    }]
    return (
        <>
            <nav className="nav">
                <TheNavLogo />
                {
                    navContent.map(post => (
                        <NavItem
                            {...post}
                            key={post.id}
                        />
                    ))
                }
            </nav>
        </>
    )
}

export default TheNav