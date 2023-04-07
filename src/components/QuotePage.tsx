import Image from 'next/image'
import { useState } from 'react';
import quotable from '@/providers/quotable';
import hooks from '@/hooks';
import { Drawer, Fab, Slider } from '@mui/material';
import { Edit, Favorite } from '@mui/icons-material';
import ColorSelect from './ColorSelect';
  
const DEFAULT_FONT_SIZE = 21;
const DEFAULT_TEXT_COLOR = 'black';
export default function QuotePage() {
    const [currentQuote, setCurrentQuote] = useState('');
    const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);
    const [textColor, setTextColor] = useState(DEFAULT_TEXT_COLOR);

    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const hasTransitionedIn = hooks.useMountTransition(isMounted, 1000);

    async function fetchData() {
        const response = await quotable.getRandomMindfulQuote();
        setCurrentQuote(`${response.content}\n\n--${response.author}`);
        setIsMounted(true);
    }

    const onFontSizeChange = (_: any, value: number | number[]) => {
        setFontSize(value as number);
    }

    const onColorChange = (color: string) => setTextColor(color);

    const toggleSideBar = () => {
        setIsSideBarOpen(!isSideBarOpen)
    };

    return (
        <div
            onClick={() => {
                setIsMounted(false);
                setTimeout(() => {
                    fetchData();
                }, 800);
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
                className={`quote ${hasTransitionedIn && 'in'} ${isMounted && 'visible'} quote-text`}
                style={{fontSize: `${fontSize}px`, color: textColor}}
            >{currentQuote}</div>}

            <Drawer
                anchor='right'
                open={isSideBarOpen}
                onClose={(event) => {
                    // @ts-ignore
                    event.stopPropagation()
                    toggleSideBar();
                }}
                onClick={(event) => event.stopPropagation()}
            >
                <div style={{width: '400px'}}>
                    <div>
                        <Slider
                            min={15}
                            max={40}
                            defaultValue={DEFAULT_FONT_SIZE}
                            aria-label="font-size"
                            valueLabelDisplay="auto"
                            className='font-size-slider'
                            onChange={onFontSizeChange}
                        />
                    </div>
                    <div className='color-button-wrapper'>
                        <ColorSelect onChange={onColorChange} />
                    </div>
                </div>
            </Drawer>
        </div>
  )
}
