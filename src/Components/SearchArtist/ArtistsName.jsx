import React from 'react'

const ArtistsName = ({ name,images }) => {
    return (
        <>
            <img className="card__img" src={images[0]?.url} alt="1" />
            <div className="card__title">
                <span>{name}</span>
            </div>
        </>
    )
}

export default ArtistsName