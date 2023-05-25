import { processFetchRequest } from '../utils';
import { affirmations } from "../constants/affirmations"
import { useSelector } from 'react-redux';
import { selectQuotes } from '@/store/slices/customQuoteSlice';

export interface QuoteResponse {
  content: string;
  author?: string;
}

export const CUSTOM_QUOTES_GENRE = 'My Quotes';
export const QUOTE_GARDEN_GENRES = [
  CUSTOM_QUOTES_GENRE,
  'affirmations',
  'inspirational',
  'life',
  'motivational',
  'peace',
] as const;

export type QuoteGardenGenre = typeof QUOTE_GARDEN_GENRES[number];

interface QuoteGardenParams {
  author?: string;
  genre?: string;
  query?: string;
  page?: number;
  limit?: number;
}

export interface QuoteGardenResponse {
  data: {
    quoteText: string;
    quoteAuthor?: string;
    quoteGenre?: string,
  }[]
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export const getRandomQuote = async function (genre: QuoteGardenGenre | CUSTOM_QUOTES_GENRE = "life", customQuotes?: string[]): Promise<QuoteResponse> {
  if (genre == CUSTOM_QUOTES_GENRE) {
    let content = 'Your quotes list is empty.'
    
    if (customQuotes?.length) {
      let randomIndex = getRandomInt(0, customQuotes.length);
      content = customQuotes[randomIndex];
    }
    
    return {content};
  }

  const response: QuoteGardenResponse = await processFetchRequest(`/api/quotes?genre=${genre}`);
  
  if (!response) {
    let randomIndex = getRandomInt(0, affirmations.length);
    return {content: affirmations[randomIndex]}
  }

  let {data = []} = response;
  let randomIndex = getRandomInt(0, data.length);
  
  return {content: data?.[randomIndex]?.quoteText, author: data?.[randomIndex]?.quoteAuthor};
}
