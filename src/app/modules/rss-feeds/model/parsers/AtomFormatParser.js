import {_, jquery} from 'vendor';
import RssFeedParser from './RssFeedParser';
import RssFeedEntryModel from '../RssFeedEntryModel';

export default class AtomFormatParser extends RssFeedParser {

  parse(content: string): Array<RssFeedEntryModel> {
    let items = _.map(jquery(content).find('entry'), (item) => {
      return this.parseItem(item);
    });
    return items;
  }

  parseItem(item: Object): RssFeedEntryModel {
    item = jquery(item);
    let title = extractTextFromElement(item, 'title');
    let date = extractTextFromElement(item, 'updated');
    let link = extractTextFromElementAttribute(item, 'link', 'href');
    let desc = extractTextFromElement(item, 'summary');
    return new RssFeedEntryModel().fromModel({
      title,
      articleLink: link,
      source: this.sourceKey,
      description: desc,
      publicationDate: parseDate(date)
    });
  }

}

function extractTextFromElementAttribute(item, propertyName, attrName) {
  return item.find(propertyName).attr(attrName);
}

function extractTextFromElement(item, propertyName) {
  return item.find(propertyName).text();
}

function parseDate(dateString) {
  return new Date(dateString);
}


