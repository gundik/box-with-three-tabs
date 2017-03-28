import _ from 'lodash';
import fileContent from './assets/varnish.log';
import {expect} from '../../testHelper';
import {LogFileParser, extractFirstUrlFromString} from '../../../src/app/modules/file-info-loader/model/LogFileParser';
import {LogFileEntry} from '../../../src/app/modules/file-info-loader/model/LogFileEntry';

const fileContentFirstLine = fileContent.substring(0, 217).trim();

describe('Log File Parser Spec', () => {
  it('Should extract first url from log line', () => {
    // when
    let urlString = extractFirstUrlFromString(fileContentFirstLine);

    // then
    expect(urlString).to.equal('http://www.vgtv.no/data/js/flash/flowplayer.pseudostreaming-3.2.7.swf');
  });

  it('Should parse single line of the log file', () => {
    // given
    expect('85.164.152.30 - - [23/May/2012:14:01:05 +0200] "GET' +
      ' http://www.vgtv.no/data/js/flash/flowplayer.pseudostreaming-3.2.7.swf HTTP/1.1" 304 0 "-" "Mozilla/5.0' +
      ' (Windows NT 6.1; WOW64; rv:12.0) Gecko/20100101 Firefox/12.0"').to.equal(fileContentFirstLine);
    let hostNameExpected = 'www.vgtv.no';
    let requestedFilePathExpected = '/data/js/flash/flowplayer.pseudostreaming-3.2.7.swf';
    let requestedFileNameExpected = 'flowplayer.pseudostreaming-3.2.7.swf';

    // when
    let parsedLine = LogFileParser.parseLine(fileContentFirstLine);

    // then
    expect(parsedLine).to.have.deep.property('hostName', hostNameExpected);
    expect(parsedLine).to.have.deep.property('requestedFilePath', requestedFilePathExpected);
    expect(parsedLine).to.have.deep.property('requestedFileName', requestedFileNameExpected);
    assertDeepEqualOnLogFileEntry(parsedLine);
  });

  it('Should parse log file', () => {
    // given
    let totalEntriesCount = 18;
    let notValidEntriesCount = 1;
    let expectedEntriesCount = totalEntriesCount;
    let expectedResourceEntriesCount = totalEntriesCount - notValidEntriesCount;

    // when
    let logFileEntries = LogFileParser.parse(fileContent);
    let logFileResourceEntries = _.filter(logFileEntries, (item: LogFileEntry) => item.isResourceRequest());

    // then
    expect(logFileEntries.length).to.equal(expectedEntriesCount);
    expect(logFileResourceEntries.length).to.equal(expectedResourceEntriesCount);
    logFileResourceEntries.forEach((logFileEntry) => {
      assertDeepEqualOnLogFileEntry(logFileEntry);
    });
  });

  function assertDeepEqualOnLogFileEntry(logFileEntry: LogFileEntry) {
    function provideAssertionMessage(propertyName) {
      return `Assertion error for property ${propertyName} for entry: ${JSON.stringify(logFileEntry)}`
    }
    expect(logFileEntry).to.have.property('hostName').and.not.equal('', provideAssertionMessage('hostName'));
    expect(logFileEntry).to.have.property('requestedFilePath')
      .and.not.equal('', provideAssertionMessage('requestedFilePath'));
    expect(logFileEntry).to.have.property('requestedFileName')
      .and.not.equal('', provideAssertionMessage('requestedFileName'));
  }

})
