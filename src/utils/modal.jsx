import React from 'react'

const Modal = ({open}) => {
    if(!open) return null
    console.log('Успешно удалено')
  return (
    <div className='deleteTrackText'>Успешно удалено</div>
  )
}

export default Modal