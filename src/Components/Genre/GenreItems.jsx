import React from 'react'

const GenreItems = (props) => {
    const a = props?.item?.images[0]?.url
  return (
    <div className="genre_Items">
        <div className="genre_Img">
            <img src={a} alt="" />
        </div>
    </div>
  )
}

export default GenreItems