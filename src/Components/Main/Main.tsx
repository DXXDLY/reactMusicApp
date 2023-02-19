import React, { createContext } from 'react'
import MainContentBg from './MainContentBg'
import TrandingTrack from './TrandingTrack'
import Player from './Player'
import style from '../../UsedFrequently/Main.module.css'
import { Loading } from '../Loader/Loading'

type TProps = {
    code: string;
};

export const LoaderContext = createContext({
})
const Main: React.FC<TProps> = () => {
    const [img, setImg] = React.useState('')
    const [loading, setLoading] = React.useState(true);
    const [isPlaying, setIsPlaying] = React.useState(false)
    const audioElem = React.useRef<HTMLAudioElement>(null)

    const clickImg = (name) => {
        setImg(name)
    }

    React.useEffect(() => {
        if (isPlaying) {
            audioElem?.current?.play()
        }
        else {
            audioElem?.current?.pause()
        }
    }, [isPlaying]);

    const treandingInfo = [
        {
            img: 'https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/30/26/71/302671c8-548f-29f1-84aa-ddb3c94292d7/07UMGIM03315.rgb.jpg/400x400cc.jpg',
            title: 'Give It to',
            subtitle: 'Timbaland',
            audio: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/4f/55/a8/4f55a886-e6a0-0c77-044b-1dbb441693d8/mzaf_16214498975616758761.plus.aac.ep.m4a",
            time: '2:34'
        },
        {
            img: 'https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/c6/8c/ca/c68ccacb-cdd5-b765-53e1-eeca394770ac/196589735607.jpg/400x400cc.jpg',
            title: 'People',
            subtitle: 'Libianca',
            audio: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview123/v4/c8/64/61/c86461d8-031d-aad0-bc3b-90c3af1ddb3b/mzaf_10512065774457514652.plus.aac.ep.m4a",
            time: '1:21'
        },
        {
            img: 'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/62/93/13/6293132e-20ff-67ab-3d1f-96bb6797a6ba/196589564955.jpg/400x400cc.jpg',
            title: 'Kill Bill',
            subtitle: 'SZA',
            audio: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/b3/a8/f8/b3a8f80e-1ee4-fa97-b46f-de255f4ef06a/mzaf_11000406095139762500.plus.aac.ep.m4a",
            time: '2:02'
        },
        {
            img: 'https://is4-ssl.mzstatic.com/image/thumb/Music125/v4/dd/1f/7a/dd1f7a8d-eb5d-2508-3ba5-2de3739a1437/886444186797.jpg/400x400cc.jpg',
            title: 'Another Lov',
            subtitle: 'Tom Odell',
            audio: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/e2/18/b7/e218b7c2-5650-2e40-7a63-5c4ca08018fe/mzaf_3776950118914761382.plus.aac.ep.m4a",
            time: '3:12'
        },
        {
            img: 'https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/b2/af/f2/b2aff242-703a-2d9d-7146-bbf487fe9a49/5059449090122.png/400x400cc.jpg',
            title: 'Rush',
            subtitle: 'Ayra Starr',
            audio: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/74/b4/ce/74b4cefd-7bb0-27f1-70d8-d8ce05a720ef/mzaf_14315726628197405332.plus.aac.ep.m4a",
            time: '1:22'
        },
    ]
    return (
        <>
            <LoaderContext.Provider value={{ setLoading }}>
                <main className={style.main}>
                    <div className={style.main__content}>
                        <h1 className={style.title_main__content}>Главная</h1>
                        <MainContentBg />
                        {loading ? (<Loading />) : (
                            <div className={style.main__content_trending}>
                                <p>В тренде</p>
                                <div className="noflex-oneblock">
                                    <div className={style.main__content_trending_artist_title}>
                                        {
                                            treandingInfo.map((item, index) => {
                                                return (
                                                    <div key={index}>
                                                        <TrandingTrack
                                                            {...item}
                                                            index={index}
                                                            onClick={clickImg}
                                                        />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </LoaderContext.Provider>
            <Player
                name={img}
                audioElem={audioElem}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
            />
        </>
    )
}

export default Main