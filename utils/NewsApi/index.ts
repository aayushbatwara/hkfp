import { parseString } from 'react-native-xml2js'; // XML parsing library


//Category:Articles HashMap
class Categories extends Map<string, number>{
  constructor(){
    super()
  }
  put(key: string) { 
    let returnValue = this.get(key) || 0; 
    this.set(key, returnValue += 1); 

  }
  sortByValue() {
    // Convert the map entries to an array of [key, value] pairs
    const entries = Array.from(this.entries());

    // Sort the array based on the values (second element in each pair)
    entries.sort((a, b) => a[1] - b[1]);

    //Delete existing map
    this.clear()

    // Set the entries in the sorted order
    for (const [key, value] of entries) {
      this.set(key, value);
    }
  }

  returnTopCategories(): string[] {
    this.sortByValue();
    const topCategories = Array.from(this.keys()).slice(-5);
    return topCategories.reverse();
  }
  returnRegularCategories(): string[] {
    let someCategories: string[] = ["Hong Kong", "China", "Taiwan", "USA", "India", "Russia"];
    for (let index = 0; index < someCategories.length; index++) {
      const element = someCategories[index];
      if (!(this.has(element))) delete someCategories[index]
    }
    return someCategories;
  }

}

export interface Article {
  url: string;
  urlToImage: string;
  source: {
    id: string;
    name: string;
  };
  author: string;
  description: string;
  publishedAt: string;
  content: string;
  title: string;
  categories: string[];
}
export interface Feed{
  status: string;
  articles: Article[]; 
  totalResults: number; 
  topCategories: string[]
}

let feed: Feed | null; 

export const fetchRawData = async (): Promise<Feed | undefined> => { // Added return type
  const result = await handleFetchFeed();
  return result;
};

const handleFetchFeed = async (): Promise<Feed | undefined> => { // Added return type
  if (feed != null) {
    console.log("should but will not read from cache");
    // return feed;
  }
  try {
    console.log("fetching data");
    const response = await fetch('https://www.hongkongfp.com/feed/');
    const data = await response.text();
    feed = await parseRSS(data);
    console.log("Number of articles fetched: ", feed.totalResults);
    return feed;
  } catch (error) {
    console.log('Error fetching RSS feed:', error);
    return undefined; // Return undefined in case of error
  }
};

const parseRSS = (xmlData: string): Promise<Feed> => { // Added return type
  return new Promise((resolve, reject) => {
    parseString(xmlData, (err: any, result: any) => {
      if (err) {
        console.log('Error parsing RSS:', err);
      } else {
        const items = result?.rss?.channel[0]?.item || [];
        let myCategories = new Categories();
        const articles = items.map((item: any) => {
          const url = item.link[0];
          const urlToImage = item.description[0].match(/<img[^>]+src\s*=\s*['"]([^'"]+)['"][^>]*>/i)[1];
          const source = { id: 'HKFP', name: 'Hong Kong Free Press' };
          const author = item['dc:creator'][0];
          const description = "description";
          const publishedAt = item['pubDate'][0];
          const content = "Joe Mama";
          const title = item.title[0];
          const categories = item['category'];
          item['category'].forEach((categoryItem: string) => { // Added type for categoryItem
            myCategories.put(categoryItem);
          });
          return { url, urlToImage, source, author, title, description, publishedAt, content, categories };
        });
        const status = "ok";
        const totalResults = items.length;
        // const topCategories:string[] = myCategories.returnTopCategories()
        const topCategories:string[] = myCategories.returnRegularCategories();
        const jsonData: Feed = { status, totalResults, articles, topCategories};
        resolve(jsonData);
      }
    });
  });
};