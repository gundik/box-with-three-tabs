import {_, moment} from 'vendor';

export default class RssFeedItemModel {

  constructor() {
    this.title = '';
    this.publicationDate = new Date();
    this.articleLink = '';
    this.description = '';
    this.source = '';
  }

  fromModel({title, publicationDate, articleLink, description, source}) {
    this.title = title;
    this.publicationDate = publicationDate;
    this.articleLink = articleLink;
    this.description = description;
    this.source = source;
    return this;
  }

  toViewModel() {
    let newItem = _.clone(this);
    newItem.publicationDate = moment(this.publicationDate).format('YYYY-MM-DD HH:mm:ss');
    newItem.description = this.description.replace(/(<([^>]+)>)/ig,'');
    return newItem;
  }

}
