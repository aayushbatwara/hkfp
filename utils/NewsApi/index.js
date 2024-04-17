import axios from "axios";
import { parseString } from 'react-native-xml2js'; // XML parsing library

// Endpoints
export const newsApiKey = "d536f983b77e4d68bd227bf0d9b89474";
const apiBaseUrl = "https://newsapi.org/v2";
const country = "us";
const breakingNewsUrl = `${apiBaseUrl}/top-headlines?country=${country}&apiKey=${newsApiKey}`;
const recommendedNewsUrl = `${apiBaseUrl}/top-headlines?country=${country}&category=business&apiKey=${newsApiKey}`;

const discoverNewsUrl = (discover) =>
  `${apiBaseUrl}/top-headlines?country=${country}&category=${discover}&apiKey=${newsApiKey}`;


const searchNewsUrl = (query) =>
  `${apiBaseUrl}/everything?q=${query}&apiKey=${newsApiKey}`;

const newsApiCall = async (endpoints, params) => {
  const options = {
    method: "GET",
    url: endpoints,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

// export const fetchBreakingNews = async () => {
//   const result = await handleFetchFeed();
//   return result;
// };
export const fetchTodaysNews = async () => {
  const result = await handleFetchFeed();

  const today = new Date(); // Get the current date

  const filteredArticles = result.articles.filter((item) => {
    const itemDate = new Date(item.publishedAt);
    return (itemDate.getDate() === today.getDate());
  });

  result.articles = filteredArticles
  return result;
};


export const fetchNotTodaysNews = async () => {
  const result = await handleFetchFeed();

  const today = new Date(); // Get the current date

  const filteredArticles = result.articles.filter((item) => {
    const itemDate = new Date(item.publishedAt);
    return (itemDate.getDate() != today.getDate());
  });

  result.articles = filteredArticles
  return result;
};


export const fetchDiscoverNews = async (discover) => {
  return await newsApiCall(discoverNewsUrl(discover));
};


export const fetchSearchNews = async (query) => {
  const endpoint = searchNewsUrl(query);
  return await newsApiCall(endpoint);
};

const handleFetchFeed = async () => {
  try {
    const response = await fetch('https://www.hongkongfp.com/feed/');
    const data = await response.text();
    jsonData = await parseRSS(data);
    
    return jsonData;
    } catch (error) {
    console.log('Error fetching RSS feed:', error);
  }
};

const parseRSS = (xmlData) => {
  return new Promise((resolve, reject) => {

  parseString(xmlData, (err, result) => {
    if (err) {
      console.log('Error parsing RSS:', err);
    } else {
      const items = result?.rss?.channel[0]?.item || [];
      const articles = items.map((item) => {
        const url = item.link[0];
        const urlToImage = item.description[0].match(/<img[^>]+src\s*=\s*['"]([^'"]+)['"][^>]*>/i)[1]
        const source = {id: 'HKFP', name: 'Hong Kong Free Press'};
        const author = item['dc:creator'][0]; 
        const description = "description";
        const publishedAt = item['pubDate'][0];
        const content = "Joe Mama";
        const title = item.title[0];
        return { url, urlToImage, source, author, title, description, publishedAt, content};
      });
      const status = "ok";
      const totalResults = items.length
      const jsonData = { status, totalResults, articles };
      resolve(jsonData);
    }
  });
});
};
