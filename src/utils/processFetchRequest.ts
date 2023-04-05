/**
 * Global network request handler
 * @param {RequestInfo} url url to fetch
 * @param {RequestInit=} options fetch options
 * @returns json response
 */
const processFetchRequest = async (url: any, options?: any) => {
    const response = await fetch(url, options);  
    if (response.ok) {
      return response.json();
    }
    throw response.json();
  };
  
  export default processFetchRequest;