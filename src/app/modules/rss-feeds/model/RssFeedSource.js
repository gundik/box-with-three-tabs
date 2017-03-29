import RssFeedParser from './parsers/RssFeedParser';

const PROXY_URL = 'http://localhost:9090/feeds';

export default class RssFeedSource {

  constructor(key: string, url: string, ParserClazz: RssFeedParser) {
    this.key = key.replace(/\W/g, '');
    this.url = url;
    this.parser = new ParserClazz(this.key);
  }

  getUrl() {
    let url = this.url.split('//')[1];
    let pathStartIndex = url.indexOf('/');
    let pathString = pathStartIndex >= 0 ? url.substring(pathStartIndex) : '';
    let proxyRssProviderKey = this.key.toLowerCase();
    return `${PROXY_URL}/${proxyRssProviderKey}${pathString}`;
  }

  parse(content: string) {
    return this.parser.parse(content);
  }

}
