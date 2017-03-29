import {_, jquery} from 'vendor';
import RssFeedParser from './RssFeedParser';
import RssFeedEntryModel from '../RssFeedEntryModel';

export default class RssFormatParser extends RssFeedParser {

  parse(content: string): Array<RssFeedEntryModel> {
    let items = _.map(jquery(content).find('item'), (item) => {
      return this.parseItem(item);
    });
    return items;
  }

  parseItem(item: object): RssFeedEntryModel {
    item = jquery(item);
    let title = extractTextFromElement(item, 'title');
    let date = extractTextFromElement(item, 'pubDate');
    let link = extractTextFromElement(item, 'link');
    let desc = extractTextFromElement(item, 'description');
    return new RssFeedEntryModel().fromModel({
      title,
      articleLink: link,
      source: this.sourceKey,
      description: desc,
      publicationDate: parseDate(date)
    });
  }

}

function extractTextFromElement(item, propertyName) {
  return item.find(propertyName).text();
}

function parseDate(dateString) {
  return new Date(dateString);
}


