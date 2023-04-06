import Image from 'next/image'
import { useEffect, useState } from 'react';
import quotable from '@/providers/quotable';
import hooks from '@/hooks';

export default function QuotePage() {
    const [currentQuote, setCurrentQuote] = useState('');
    const [isMounted, setIsMounted] = useState(false);
    const hasTransitionedIn = hooks.useMountTransition(isMounted, 1000);

    async function fetchData() {
        const response = await quotable.getRandomMindfulQuote();
        setCurrentQuote(`${response.content}\n\n--${response.author}`);
        setIsMounted(true);
    }

    return (
        <div
            onClick={() => {
                setIsMounted(false);
                setTimeout(() => {
                    fetchData();
                }, 1000);
            }}
        >
            <div 
                className="w-64 h-32 relative"
                style={{
                    zIndex: -1,
                    position: 'relative',
                    width: '100vw',
                    height: '100vh'
                }}
            >
                <Image style={{objectFit: 'cover'}} src="/bg-1.jpg" alt="background image" fill />
            </div>
            {(hasTransitionedIn || isMounted) && <div
                className={`quote ${hasTransitionedIn && 'in'} ${isMounted && 'visible'} quote-text`}
            >{currentQuote}</div>}
        </div>
  )
}
