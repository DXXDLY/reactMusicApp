import React, { useContext } from 'react'
import { AudioUrl, TokenContext } from '../../Context/AllContext'
import ContextMenu from '../../UsedFrequently/ContextMenu/ContextMenu'

const SearchResult = ({ name, album, preview_url, artists, id }) => {

  const { accessToken } = useContext(TokenContext)
  const { setUrlForAudioTrack } = useContext(AudioUrl)

  const allDataToPlayer = [
    name,
    album.images[0].url,
    preview_url, artists[0].name,
    id,
    artists[0].id
  ]

  const clickImg = () => {
    setUrlForAudioTrack(allDataToPlayer)
  }

  const initialContextMenu = {
    show: false,
    x: 0,
    y: 0,
  }

  const [contextMenu, setContextMenu] = React.useState(initialContextMenu);

  const closeMenu = () => setContextMenu(initialContextMenu)

  const handleContextMenu = (e) => {
    e.preventDefault()
    const { pageX, pageY } = e
    setContextMenu({ show: true, x: pageX, y: pageY })
  }

  // добавление трека

  return (
    <>
      {contextMenu.show && <ContextMenu x={contextMenu.x} y={contextMenu.y} closeMenu={closeMenu} code={accessToken} preview={id} />}
      <div className="searchResult" onClick={clickImg} onContextMenu={handleContextMenu}>
        <div className="searchResult__img">
          <img src={album.images[0].url} alt="searchResult" className='imageSearch' />
        </div>
        <div className="searchResult__title">
          <div className="heart">
          </div>
          <p>{name.slice(0, 11)}</p>
        </div>
        <audio src={preview_url}></audio>
      </div>
    </>
  )
}

export default SearchResult

