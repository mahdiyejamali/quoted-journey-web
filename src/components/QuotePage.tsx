import NextImage from 'next/image'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import shortid from 'shortid';

import { Fab } from '@mui/material';
import { Download, Favorite, MusicNote, MusicOff, Settings } from '@mui/icons-material';

import quotable from '@/providers/quotable';
import hooks from '@/hooks';
import { selectColor, selectFontClassName, selectFontSize, selectFontStyles, selectQuoteGenre, selectText, selectTextShadowState, setText, TEXT_SHADOW } from '@/store/slices/quoteSlice';
import { selectSrcImage } from '@/store/slices/themeSlice';
import QuoteSideBar from '@/components/QuoteSideBar';
import AudioPlayer from './AudioPlayer';

const BackgroundImageWrapper = styled.div`
    z-index: -100;
    position: relative;
    width: 100vw;
    height: 100vh;
`;

const MainButtonsWrapper = styled.div`
    position: absolute;
    bottom: 10%;
    left: 10%;
    display: flex;
    width: 60%;
`;

const QuoteWrapper = styled.div`
    .quote {
        opacity: 0;
        transform: translateY(15px);
        transition: opacity 1s ease, transform 1s ease;
    }
    
    .quote.in.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .quote-text {
        position: absolute;
        z-index: -1;
        top: 30%;
        left: 20%;
        right: 20%;
        transform: translate(0%, 50%);
        white-space: pre-wrap;
    }
`;

export default function QuotePage() {
    const dispatch = useDispatch();
    const backgroundSrcImage = useSelector(selectSrcImage);
    const quoteGenre = useSelector(selectQuoteGenre);
    const currentQuote = useSelector(selectText);
    const textColor = useSelector(selectColor);
    const fontSize = useSelector(selectFontSize);
    const fontClassName = useSelector(selectFontClassName);
    const fontStyles = useSelector(selectFontStyles);
    const textShadowState = useSelector(selectTextShadowState);
    const textShadow = textShadowState ? TEXT_SHADOW : '';

    const [isQuoteSideBarOpen, setIsQuoteSideBarOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const hasTransitionedIn = hooks.useMountTransition(isMounted, 1000);

    const createCanvasProps = {
        backgroundSrcImage,
        fontStyles,
        fontSize,
        textColor,
        textShadowState,
        currentQuote,
    };
    const [downloadElementRef, downloadElement] = hooks.useHtml2Canvas(createCanvasProps);
    const [handleImageUpload, saveImageToFirestore] = hooks.useUploadImage(downloadElementRef, createCanvasProps);

    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {
        const response = await quotable.getRandomQuote(quoteGenre);
        const author = response?.author ? `\n\n--${response?.author}` : ''
        dispatch(setText(`${response.content}${author}`));
        setIsMounted(true);
    }

    const toggleQuoteSideBar = () => {
        setIsQuoteSideBarOpen(!isQuoteSideBarOpen)
    };

    const handleSaveImage = async () => {
        const imageUrl = await handleImageUpload();
    };

    return (
        <div
            onClick={() => {
                setIsMounted(false);
                setTimeout(() => {
                    fetchData();
                }, 850);
            }}
        >
            <div ref={downloadElementRef}>
                <BackgroundImageWrapper className="w-64 h-32 relative">
                    <NextImage key={shortid.generate()} style={{objectFit: 'cover'}} src={backgroundSrcImage} alt="background image" fill />
                </BackgroundImageWrapper>

                {(hasTransitionedIn || isMounted) && <QuoteWrapper>
                    <div
                        className={`${fontClassName} quote ${hasTransitionedIn && 'in'} ${isMounted && 'visible'} quote-text`}
                        style={{fontSize: `${fontSize}px`, color: textColor, textShadow}}
                    >
                        {currentQuote}
                    </div>
                </QuoteWrapper>}
            </div>

            <MainButtonsWrapper>
                <Fab aria-label="settings" onClick={(event) => {
                    event.stopPropagation()
                    toggleQuoteSideBar();
                }}>
                    <Settings />
                </Fab>

                <Fab style={{marginLeft: 20}} aria-label="download" onClick={(event) => {
                    event.stopPropagation();
                    downloadElement();
                }}>
                    <Download />
                </Fab>

                <AudioPlayer renderButton={(musicState, toggleMusic) => {
                    return (
                        <Fab style={{marginLeft: 20}} aria-label="sound" onClick={(event) => {
                            event.stopPropagation();
                            toggleMusic();
                        }}>
                            {musicState ? <MusicOff /> : <MusicNote />}
                        </Fab>
                    )
                }} />

                <Fab style={{marginLeft: 20}} aria-label="like" onClick={(event) => {
                    event.stopPropagation();
                    handleSaveImage();
                }}>
                    <Favorite />
                </Fab>
            </MainButtonsWrapper>

            <QuoteSideBar isOpen={isQuoteSideBarOpen} toggleSideBar={toggleQuoteSideBar} />
        </div>
  )
}
