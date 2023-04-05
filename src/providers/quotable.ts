import {generateQueryStrFromObject, processFetchRequest} from '../utils';

const QUOTABLE_BASE_URL = 'https://api.quotable.io';
export const MINDFUL_TAGS = 'happy|happiness|mindfil|mindfulness|kind';

/**
 * Get list of quotes
 * @param {object=} params query params as object
 * @returns json response
 */
const getQuotes = async function (params: any) {
  let url = `${QUOTABLE_BASE_URL}/quotes`;
  if (params) {
    url += generateQueryStrFromObject(params);
  }

  return processFetchRequest(url);
};

const getRandomQuote = async function (params: any) {
  let url = `${QUOTABLE_BASE_URL}/random`;
  if (params) {
    url += generateQueryStrFromObject(params);
  }

  return processFetchRequest(url);
};

const getRandomMindfulQuote = async function () {
  return getRandomQuote({tags: MINDFUL_TAGS})
}

export default {
  getQuotes,
  getRandomQuote,
  getRandomMindfulQuote,
};