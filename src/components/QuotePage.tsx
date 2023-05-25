import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Fab } from '@mui/material';
import { Download, Favorite, MusicNote, MusicOff, Palette } from '@mui/icons-material';

import { getRandomQuote } from '@/providers/quotable';
import hooks from '@/hooks';
import { selectColor, selectFontClassName, selectFontSize, selectFontStyles, selectQuoteGenre, selectText, selectTextShadowState, setText, TEXT_SHADOW } from '@/store/slices/quoteSlice';
import { selectSrcImage } from '@/store/slices/themeSlice';
import QuoteSideBar from '@/components/QuoteSideBar';
import AudioPlayer from './AudioPlayer';
import dynamic from 'next/dynamic';
import { useImageSize } from 'react-image-size';
import { selectQuotes } from '@/store/slices/customQuoteSlice';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: transparent;
  justify-content: center;
  align-items: center;
  display: flex;
`;
const BackgroundImage = dynamic(() => import("./BackgroundImage"), {
    ssr: false,
    loading: () => <p>...</p>,
});

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
        z-index: 1;
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

    const customQuotes = useSelector(selectQuotes);

    const [dimensions, { loading, error }] = useImageSize(backgroundSrcImage);
    const createCanvasProps = {
        backgroundSrcImage,
        fontStyles,
        fontSize,
        textColor,
        textShadowState,
        currentQuote,
        imageSize: {
            width: dimensions?.width ? dimensions.width / 1.5 : 0, 
            height: dimensions?.height ? dimensions.height / 1.5 : 0
        },
    };
    const [downloadElementRef, downloadElement] = hooks.useHtml2Canvas(createCanvasProps);
    const [handleImageUpload] = hooks.useUploadImage(downloadElementRef, createCanvasProps);

    const fetchData = useCallback(async () => {
        const response = await getRandomQuote(quoteGenre, customQuotes);
        const author = response?.author ? `\n\n--${response?.author}` : '';
        dispatch(setText(`${response.content}${author}`));
        setIsMounted(true);
    }, [dispatch, quoteGenre]);

    useEffect(() => {
        fetchData();
    }, [fetchData])

    const toggleQuoteSideBar = () => {
        setIsQuoteSideBarOpen(!isQuoteSideBarOpen)
    };

    const showToastMessage = (message: string) => {
        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    const handleSaveImage = async () => {
        showToastMessage('Saving quote to your favorites...');
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
            <ToastContainer />
            <Wrapper ref={downloadElementRef}>
                {(hasTransitionedIn || isMounted) && <QuoteWrapper>
                    <div
                        className={`${fontClassName} quote ${hasTransitionedIn && 'in'} ${isMounted && 'visible'} quote-text`}
                        style={{fontSize: `${fontSize}px`, color: textColor, textShadow}}
                    >
                        {currentQuote}
                    </div>
                </QuoteWrapper>}

                <BackgroundImage />
            </Wrapper>

            <MainButtonsWrapper>
                <Fab aria-label="settings" onClick={(event) => {
                    event.stopPropagation()
                    toggleQuoteSideBar();
                }}>
                    <Palette />
                </Fab>

                <Fab style={{marginLeft: 20}} aria-label="download" onClick={(event) => {
                    event.stopPropagation();
                    downloadElement();
                }}>
                    <Download />
                </Fab>

                <Fab style={{marginLeft: 20}} aria-label="like" onClick={(event) => {
                    event.stopPropagation();
                    handleSaveImage();
                }}>
                    <Favorite />
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
            </MainButtonsWrapper>

            <QuoteSideBar isOpen={isQuoteSideBarOpen} toggleSideBar={toggleQuoteSideBar} />
        </div>
  )
}
