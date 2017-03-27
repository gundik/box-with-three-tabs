import {_, urlParse} from 'vendor';
import {LogFileEntry} from './LogFileEntry';

const URL_REGEX_STRING = 'https?:\/\/\\S+';

export class LogFileParser {

  static parse(content: string): Array<LogFileEntry> {
    return _(content.trim())
      .split(/\r?\n/g)
      .map((line) => LogFileParser.parseLine(line))
      .value();
  }

  static parseLine(line: string): LogFileEntry {
    let url = extractFirstUrlFromString(line);
    let {hostname, pathname} = extractUrlParts(url);
    return new LogFileEntry(hostname, pathname);
  }

}

export function extractFirstUrlFromString(line: string = ''): string {
  let result = new RegExp(URL_REGEX_STRING, 'gi').exec(line);
  return result ? result[0] : '';
}

function extractUrlParts(url: string) {
  return urlParse(url);
}



