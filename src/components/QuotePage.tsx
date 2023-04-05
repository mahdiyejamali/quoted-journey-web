import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react';
import quotable from '@/providers/quotable';

export default function QuotePage() {
    const [currentQuote, setCurrentQuote] = useState('');
    // fetch Quotable
    useEffect(() => {
        async function fetchData() {
            const response = await quotable.getRandomMindfulQuote();
            setCurrentQuote(`${response.content}\n--${response.author}`);
        }
        fetchData();
    }, []);
    return (
        <div style={{alignContent: 'center', alignSelf: 'center', width: 400, height: 600}}>
            {currentQuote}
            <Image
                alt="Main Image"
                src={`https://source.unsplash.com/random/2000x3000?topics=Mindfulness&key=${Date.now()}`}
                width={2000}
                height={3000}
                layout="responsive"
            />
        </div>
  )
}
