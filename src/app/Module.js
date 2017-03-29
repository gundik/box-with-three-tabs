import dom from './apis/dom';

export class Module {

  constructor(element) {
    this.$element = element;
  }

  getElement() {
    return this.$element;
  }

  load() {
    throw new Error('load() should be implemented in child class');
  }

  unload() {

  }

  renderContent(content: string) {
    dom.setHtmlContent(this.$element, content);
  }

  render(templateFunction, context) {
    let content = templateFunction(context);
    this.renderContent(content);
  }

}
