import Image from 'next/image'
import { useEffect, useState } from 'react';
import quotable from '@/providers/quotable';
import hooks from '@/hooks';
import { Fab } from '@mui/material';
import { Edit, Favorite } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { selectColor, selectFontClassName, selectFontSize, selectText, selectTextShadow, setText, TEXT_SHADOW } from '@/store/slices/quoteSlice';
import SideBar from '@/components/SideBar';
  
export default function QuotePage() {
    const dispatch = useDispatch();
    const currentQuote = useSelector(selectText);
    const textColor = useSelector(selectColor);
    const fontSize = useSelector(selectFontSize);
    const fontClassName = useSelector(selectFontClassName);
    const textShadowStatus = useSelector(selectTextShadow);
    const textShadow = textShadowStatus ? TEXT_SHADOW : '';

    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
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

    const toggleSideBar = () => {
        setIsSideBarOpen(!isSideBarOpen)
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
            <div 
                className="w-64 h-32 relative"
                style={{
                    zIndex: -100,
                    position: 'relative',
                    width: '100vw',
                    height: '100vh'
                }}
            >
                <Image style={{objectFit: 'cover'}} src="/bg-1.jpg" alt="background image" fill />
            </div>

            <div className='main-page-buttons'>
                <Fab aria-label="edit" onClick={(event) => {
                    event.stopPropagation()
                    toggleSideBar();
                }}>
                    <Edit />
                </Fab>

                <Fab style={{marginLeft: 20}} aria-label="like" onClick={(event) => event.stopPropagation()}>
                    <Favorite />
                </Fab>
            </div>
            
            
            {(hasTransitionedIn || isMounted) && <div
                className={`${fontClassName} quote ${hasTransitionedIn && 'in'} ${isMounted && 'visible'} quote-text`}
                style={{fontSize: `${fontSize}px`, color: textColor, textShadow}}
            >{currentQuote}</div>}

            <SideBar isOpen={isSideBarOpen} toggleSideBar={toggleSideBar} />
        </div>
  )
}
