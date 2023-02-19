
import React from 'react'

const BgSlider = () => {
  const [count,setCount] = React.useState()
  const imagesList = [
    'https://sun9-84.userapi.com/impg/2cnyNtQuprTr6y5s-LNNVq8-1_oqUBvgdetfmA/8P7QikefKcM.jpg?size=2160x2160&quality=96&sign=848b00f07c25d68abe7887eda5911015&type=album', 
    'https://sun9-86.userapi.com/impg/TvqFTVb_3DvEEYLsxGiZqbL5XrZvTbXRMgevHA/ZMDJ8see6JI.jpg?size=1066x1280&quality=95&sign=e4d246fad188ea4c65bb3f6fec375d8d&type=album', 
    'https://sun9-18.userapi.com/impg/rIQDhEM48jnMIv7ZRO0F-u97iY5eE0V3311v3w/RJKzKgjjhdE.jpg?size=1920x1920&quality=95&sign=342df2665fde2163a7e8447be48b2214&type=album', 
    'https://sun9-18.userapi.com/impg/rIQDhEM48jnMIv7ZRO0F-u97iY5eE0V3311v3w/RJKzKgjjhdE.jpg?size=1920x1920&quality=95&sign=342df2665fde2163a7e8447be48b2214&type=album', 
    'https://sun9-16.userapi.com/impg/72VmOcL13wm5rCKAOMr9rpHTpjD4zrAMOc1UYw/vu0Hrp7Mu0A.jpg?size=1920x1920&quality=95&sign=1ce4bbcb1619b8960088e590dc38cd32&type=album',
    'https://sun7-16.userapi.com/impg/xWo8459HUuDJsseGox3YxF8MI_A8Wa_3_SRPog/i6jLVrSet0I.jpg?size=2560x1024&quality=96&sign=6b4b1947ff263b224de5b709d8684739&type=album',
  ]
  let iterable = 0
  React.useEffect(() => {
    setCount(imagesList[0])
    setInterval(() => {
      setCount(imagesList[iterable++])
      if(iterable >= imagesList.length) {
        iterable = 0 // eslint-disable-line
      }
    },4000)
  },[])
  return (
    <div className="bcg-artist">
      <img src={
        count
      } alt="#" />
    </div>
  )
}

export default BgSlider