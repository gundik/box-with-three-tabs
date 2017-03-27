import {_, jquery} from 'vendor';

export default {
  addClass,
  attachEvent,
  getElement,
  getElements,
  hide,
  removeClass,
  setHtmlContent,
  show
}

function getElement(selector: string, parentElement) {
  return getElements(selector, parentElement)[0];
}

function getElements(selector: string, parentElement) {
  return parentElement ? jquery.find(selector) : jquery(selector);
}

function attachEvent(element, eventName, callback) {
  jquery(element).bind(eventName, callback);
}

function addClass(element, className) {
  jquery(element).addClass(className);
}

function removeClass(element, className) {
  jquery(element).removeClass(className);
}

function show(element) {
  jquery(element).show();
}

function hide(element) {
  jquery(element).hide();
}

function setHtmlContent(element, content: string) {
  jquery(element).html(content);
}
