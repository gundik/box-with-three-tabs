import {expect} from '../../testHelper';
import FileInfoLoaderModel from '../../../src/app/modules/file-info-loader/model/FileInfoLoaderModel';
import LogFileEntry from '../../../src/app/modules/file-info-loader/model/LogFileEntry';

var resultSet = [
  new LogFileEntry('a', '/a/b/c'),
  new LogFileEntry('a', '/a/b/c'),
  new LogFileEntry('a', '/a/b/x'),
  new LogFileEntry('a', '/a/b/x'),
  new LogFileEntry('a', '/a/b/x'),
  new LogFileEntry('b', '/a')
];

describe('File Info Loader Model Spec', () => {

  it('Should fill model properly', () => {
    // when
    var {hostsWithMostTraffic, mostRequestedFiles} = FileInfoLoaderModel.createFromResult(resultSet);

    // then
    expect(hostsWithMostTraffic.length).to.equal(2);
    expect(hostsWithMostTraffic).to.deep.equal([
      {value: 'a', count: 5}, {value: 'b', count: 1}
    ]);
    expect(mostRequestedFiles.length).to.equal(3);
    expect(mostRequestedFiles).to.deep.equal([
      {value: '/a/b/x', count: 3}, {value: '/a/b/c', count: 2}, {value: '/a', count: 1}
    ]);
  });

})
