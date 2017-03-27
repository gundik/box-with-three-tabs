import {_} from 'vendor';
import {LogFileEntry} from './LogFileEntry';

const HOSTS_WITH_MOST_TRAFFIC_EXTRACT_COUNT = 5;
const MOST_REQUESTED_FILES_EXTRACT_COUNT = 5;

export class FileInfoLoaderModel {

  static createFromResult(resultSet: Array<LogFileEntry>) {
    let hostsWithMostTraffic = extractHostsWithMostTraffic(resultSet);
    let mostRequestedFiles = extractMostRequestedFiles(resultSet);
    return new FileInfoLoaderModel(hostsWithMostTraffic, mostRequestedFiles);
  }

  constructor(hostsWithMostTraffic: Array<FileInfoLoaderItemModel>, mostRequestedFiles: Array<FileInfoLoaderItemModel>) {
    this.hostsWithMostTraffic = hostsWithMostTraffic;
    this.mostRequestedFiles = mostRequestedFiles;
  }

}

export class FileInfoLoaderItemModel {

  constructor(value, count) {
    this.value = value;
    this.count = count;
  }

}

function extractHostsWithMostTraffic(resultSet: Array<LogFileEntry>) {
  return _(resultSet)
    .countBy('hostName')
    .map((value, key) => {
      return {value: key, count: value}
    })
    .orderBy(['count'], ['desc'])
    .slice(0, HOSTS_WITH_MOST_TRAFFIC_EXTRACT_COUNT)
    .map((item) => {
      return new FileInfoLoaderItemModel(item.value, item.count);
    })
    .value();
}

function extractMostRequestedFiles(resultSet: Array<LogFileEntry>) {
  return _(resultSet)
    .filter((item) => item.isResourceRequest())
    .countBy('requestedFilePath')
    .map((value, key) => {
      return {value: key, count: value}
    })
    .orderBy(['count'], ['desc']).slice(0, MOST_REQUESTED_FILES_EXTRACT_COUNT)
    .map((item) => {
      return new FileInfoLoaderItemModel(item.value, item.count);
    }).value();
}
