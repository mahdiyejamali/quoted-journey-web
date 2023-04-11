
import { selectMusicState, setMusicState } from '@/store/slices/themeSlice';
import React, { ReactNode, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface AudionPlayerProps {
    renderButton: (musicState: boolean, toggleMusic: () => void) => ReactNode
}

export default function AudioPlayer(props: AudionPlayerProps) {
  const dispatch = useDispatch();
  const musicState = useSelector(selectMusicState);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
      dispatch(setMusicState(!musicState));
  }

  useEffect(() => {
    if (musicState) {
        audioRef?.current?.play();
    } else {
        audioRef?.current?.pause();
    }
  }, [musicState]);

  return (
    <div>
        {props.renderButton(musicState, toggleMusic)}
        <audio ref={audioRef} loop>
            <source src="/bg-music-1.mp3" type="audio/mpeg" />
        </audio>
    </div>
  );
};
