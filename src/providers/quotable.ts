import { processFetchRequest } from '../utils';
import { affirmations } from "../constants/affirmations"

export interface QuoteResponse {
  content: string;
  author?: string;
}

export const CUSTOM_QUOTES_GENRE = 'My Quotes';
export const FAVORITE_QUOTES_GENRE = 'Favorites';
export const QUOTE_GARDEN_GENRES = [
  CUSTOM_QUOTES_GENRE,
  FAVORITE_QUOTES_GENRE,
  'affirmations',
  'inspirational',
  'life',
  'motivational',
  'peace',
] as const;

export type QuoteGenre = typeof QUOTE_GARDEN_GENRES[number];

interface QuoteGardenParams {
  author?: string;
  genre?: string;
  query?: string;
  page?: number;
  limit?: number;
}

interface QuoteGardenResponse {
  data: QuoteGardenData[]
}
interface QuoteGardenData {
  quoteText: string;
  quoteAuthor?: string;
  quoteGenre?: string,
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export const createQuoteText = (quoteObj: QuoteResponse) => {
  const author = quoteObj?.author ? `\n\n--${quoteObj?.author}` : '';
  return `${quoteObj.content}${author}`;
}

export const getQuotesList = async function (genre: QuoteGenre = 'life', customQuotes?: string[]): Promise<string[]> {
  const LIMIT = 100;

  if (genre == CUSTOM_QUOTES_GENRE) {
    if (customQuotes) {
      return customQuotes;
    } else {
      return ['Your custom quotes list is empty.']
    }
  }

  const response: QuoteGardenResponse = await processFetchRequest(`/api/quotes?genre=${genre}`);
  let quotesByGenre = response?.data;

  if (!quotesByGenre) {
    quotesByGenre = affirmations;
  }

  const shuffledQuotes = quotesByGenre.sort(() => 0.5 - Math.random());
  const quotes = shuffledQuotes.slice(0, LIMIT)
    .map(item => createQuoteText({content: item?.quoteText, author: item?.quoteAuthor}));

  return quotes;
}
