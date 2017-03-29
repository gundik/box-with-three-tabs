export default class RssFeedParser {

  constructor(sourceKey: string) {
    this.sourceKey = sourceKey;
  }

  parse(content: string) {
    throw new Error('parse(sourceKey: string, content: string) method should be implemented in child class.');
  }

}
