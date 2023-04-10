import Image from 'next/image'
import { useEffect, useState } from 'react';
import quotable from '@/providers/quotable';
import hooks from '@/hooks';
import { Fab } from '@mui/material';
import { Edit, Favorite } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { selectColor, selectFontClassName, selectFontSize, selectText, selectTextShadow, setText, TEXT_SHADOW } from '@/store/slices/quoteSlice';
import QuoteSideBar from '@/components/QuoteSideBar';
import styled from '@emotion/styled';
import { selectSrcImage } from '@/store/slices/themeSlice';

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
    const currentQuote = useSelector(selectText);
    const textColor = useSelector(selectColor);
    const fontSize = useSelector(selectFontSize);
    const fontClassName = useSelector(selectFontClassName);
    const textShadowStatus = useSelector(selectTextShadow);
    const textShadow = textShadowStatus ? TEXT_SHADOW : '';

    const [isQuoteSideBarOpen, setIsQuoteSideBarOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const hasTransitionedIn = hooks.useMountTransition(isMounted, 1000);

    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {
        const response = await quotable.getRandomMindfulQuote();
        dispatch(setText(`${response.content}\n\n--${response.author}`));
        setIsMounted(true);
    }

    const toggleQuoteSideBar = () => {
        setIsQuoteSideBarOpen(!isQuoteSideBarOpen)
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
            <BackgroundImageWrapper className="w-64 h-32 relative">
                <Image style={{objectFit: 'cover'}} src={backgroundSrcImage} alt="background image" fill />
            </BackgroundImageWrapper>

            <MainButtonsWrapper>
                <Fab aria-label="edit" onClick={(event) => {
                    event.stopPropagation()
                    toggleQuoteSideBar();
                }}>
                    <Edit />
                </Fab>

                <Fab style={{marginLeft: 20}} aria-label="like" onClick={(event) => event.stopPropagation()}>
                    <Favorite />
                </Fab>
            </MainButtonsWrapper>
            
            
            {(hasTransitionedIn || isMounted) && <QuoteWrapper>
                <div
                    className={`${fontClassName} quote ${hasTransitionedIn && 'in'} ${isMounted && 'visible'} quote-text`}
                    style={{fontSize: `${fontSize}px`, color: textColor, textShadow}}
                >
                    {currentQuote}
                </div>
            </QuoteWrapper>}

            <QuoteSideBar isOpen={isQuoteSideBarOpen} toggleSideBar={toggleQuoteSideBar} />
        </div>
  )
}
