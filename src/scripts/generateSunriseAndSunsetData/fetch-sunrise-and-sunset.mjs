import fetch from 'node-fetch';
import { saveFile, getDirName } from './utils.mjs';

// 抓取資料的函式
const fetchData = async ({ authorizationKey }) => {
  return fetch(
    `https://opendata.cwa.gov.tw/api/v1/rest/datastore/A-B0062-001?Authorization=${authorizationKey}&downloadType=WEB&format=JSON`,
  )
    .then((response) => response.json())
    .then((data) => data);
};

// 資料處理的函式
async function processData(rawData) {
  if (
    !rawData ||
    !rawData.records ||
    !rawData.records.locations ||
    !rawData.records.locations.location
  ) {
    throw new Error('資料結構無效： unable to locate dataset.locations.location in rawData');
  }

  const locations = rawData.records.locations.location;

  const data = locations.map((location) => {
    // 使用 CountyName 作為 locationName
    const locationName = location.CountyName;

    if (!locationName) {
      console.warn('未找到 locationName，跳過這個地點');
      return null;
    }

    // 處理 time 資料
    const time = location.time.map((timeData) => {
      return {
        dataTime: timeData.Date,
        sunrise: timeData.SunRiseTime,
        sunset: timeData.SunSetTime,
      };
    });

    return {
      locationName,
      time,
    };
  });

  // 過濾掉可能為 null 的項目
  return data.filter((location) => location !== null);
}

// 主函式：抓取並處理資料
async function main({ authorizationKey }) {
  try {
    const __dirname = getDirName();
    const rawData = await fetchData({ authorizationKey });

    // 過濾資料
    const data = await processData(rawData);

    // 儲存過濾後的資料
    await saveFile({
      filePath: `${__dirname}/A-B0062-001.json`,
      data,
    });

    console.log('Successfully download and create filtered sunrise-sunset.json');
  } catch (error) {
    console.error('[fetch-and-filter-sunrise-sunset] error', error);
  }
}

export default main;
