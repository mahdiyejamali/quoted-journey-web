import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';

import { Fab } from '@mui/material';
import { Download, Favorite, FavoriteBorder, MusicNote, MusicOff, Palette } from '@mui/icons-material';

import { CUSTOM_QUOTES_GENRE, FAVORITE_QUOTES_GENRE, getQuotesList, QuoteGenre } from '@/providers/quotable';
import hooks from '@/hooks';
import { selectColor, selectFontClassName, selectFontSize, selectFontStyles, selectQuoteGenre, selectText, selectTextShadowState, setText, TEXT_SHADOW } from '@/store/slices/quoteSlice';
import { selectSrcImage } from '@/store/slices/themeSlice';
import QuoteSideBar from '@/components/QuoteSideBar';
import AudioPlayer from './AudioPlayer';
import dynamic from 'next/dynamic';
import { useImageSize } from 'react-image-size';
import { selectQuotes } from '@/store/slices/customQuoteSlice';
import useFavorite from '@/hooks/useFavorites';
import { addFavorite, removeFavorite } from '@/store/slices/favoritesSlice';

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
    left: 5%;
    left: 5%;
    display: flex;
    width: 100%;
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
    // const [handleImageUpload] = hooks.useUploadImage(downloadElementRef, createCanvasProps);

    /** Fetch quotes list by genre */
    const customQuotes = useSelector(selectQuotes);
    const [quotesList, setQuotesList] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const {favoriteQuotes, isFavoriteSaved} = useFavorite();
    const fetchData = useCallback(async (quoteGenre: QuoteGenre) => {
        try {
            let response;
            if (quoteGenre == FAVORITE_QUOTES_GENRE) {
                response = favoriteQuotes
            } else if (quoteGenre == CUSTOM_QUOTES_GENRE) {
                response = customQuotes
            } else {
                response =  await getQuotesList(quoteGenre);
            }
                    
            setQuotesList(response);
            setCurrentIndex(0);

            dispatch(setText(response[0]));
            setIsMounted(true);
        } catch (e) {
            console.error('fetchData', e)
        }
    }, [quoteGenre, customQuotes, dispatch]);
  
    useEffect(() => {
        fetchData(quoteGenre);
    }, [quoteGenre, fetchData]);

    useEffect(() => {
        dispatch(setText(quotesList[currentIndex]));
        setIsMounted(true);
    }, [currentIndex, quotesList, dispatch]);

    /** Handle next/prev/enter functionalities */
    const onNext = useCallback((index: number) => {
        if (quotesList.length <= 1) return;

        setIsMounted(false);
        setTimeout(() => {
            const nextIndex = index < quotesList.length - 1 ? index + 1 : 0;
            setCurrentIndex(nextIndex)
        }, 850);
    }, [quotesList.length])

    const onPrev = useCallback((index: number) => {
        if (quotesList.length <= 1) return;

        setIsMounted(false);
        setTimeout(() => {
            const prevIndex = index > 0 ? index - 1 : quotesList.length - 1;
            setCurrentIndex(prevIndex)
        }, 850);
    }, [quotesList.length])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key == 'ArrowUp') {
                onNext(currentIndex);
            } else if (e.key == 'ArrowDown') {
                onPrev(currentIndex);
            } else if (e.key == 'ArrowLeft') {
                onPrev(currentIndex);
            } else if (e.key == 'ArrowRight') {
                onNext(currentIndex);
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [currentIndex, onNext, onPrev]);

    /** Handle toggle/toast functionality */
    const toggleQuoteSideBar = () => {
        setIsQuoteSideBarOpen(!isQuoteSideBarOpen)
    };

    /** Handle favorite functionality */
    const isFavorite = isFavoriteSaved(currentQuote);
    const onPressFavorite = () => {
        if (isFavorite) {
            dispatch(removeFavorite(currentQuote))
        } else {
            dispatch(addFavorite(currentQuote))
        }
    }

    return (
        <div onClick={() => onNext(currentIndex)}>
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
                <Fab size="medium" style={{minWidth: 48}} aria-label="settings" onClick={(event) => {
                    event.stopPropagation()
                    toggleQuoteSideBar();
                }}>
                    <Palette />
                </Fab>

                <Fab size="medium" style={{minWidth: 48, marginLeft: 20}} aria-label="download" onClick={(event) => {
                    event.stopPropagation();
                    downloadElement();
                }}>
                    <Download />
                </Fab>

                <Fab size="medium" style={{minWidth: 48, marginLeft: 20}} aria-label="like" onClick={(event) => {
                    event.stopPropagation();
                    // handleSaveImage();
                    onPressFavorite();
                }}>
                    {isFavorite ? <Favorite /> : <FavoriteBorder />}
                </Fab>

                <AudioPlayer renderButton={(musicState, toggleMusic) => {
                    return (
                        <Fab size="medium" style={{minWidth: 48, marginLeft: 20}} aria-label="sound" onClick={(event) => {
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
