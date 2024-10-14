import sunriseAndSunsetData from './sunrise-sunset.json';

export const getMoment = (locationName) => {
  // 嘗試找到對應地點的日出日落資料
  const location = sunriseAndSunsetData.find((data) => data.locationName === locationName);

  if (!location) {
    console.warn(`找不到 ${locationName} 的日出日落資料，使用預設值 "day"。`);
    return 'day';
  }

  const now = new Date();
  // 時間格式化轉成 "yyyy-mm-dd" 格式
  const nowDate = Intl.DateTimeFormat('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(now)
    .replace(/\//g, '-');

  // 嘗試找到對應日期的日出日落資料
  const locationDate = location.time.find((time) => time.dataTime === nowDate);

  if (!locationDate) {
    console.warn(`找不到 ${locationName} 在 ${nowDate} 的日出日落資料，使用預設值 "day"。`);
    return 'day';
  }

  const sunriseTimestamp = new Date(`${locationDate.dataTime} ${locationDate.sunrise}`).getTime();
  const sunsetTimestamp = new Date(`${locationDate.dataTime} ${locationDate.sunset}`).getTime();
  const nowTimeStamp = now.getTime();

  // 根據當前時間判斷是白天還是夜晚
  return sunriseTimestamp <= nowTimeStamp && nowTimeStamp <= sunsetTimestamp ? 'day' : 'night';
};

export const availableLocations = [
  {
    cityName: '宜蘭縣',
    locationName: '宜蘭縣',
    sunriseCityName: '宜蘭縣',
  },
  {
    cityName: '嘉義市',
    locationName: '嘉義市',
    sunriseCityName: '嘉義市',
  },
  {
    cityName: '屏東縣',
    locationName: '屏東縣',
    sunriseCityName: '屏東縣',
  },
  {
    cityName: '苗栗縣',
    locationName: '苗栗縣', // 銅鑼鄉
    sunriseCityName: '苗栗縣',
  },
  {
    cityName: '雲林縣',
    locationName: '雲林縣',
    sunriseCityName: '雲林縣',
  },
  {
    cityName: '臺東縣',
    locationName: '臺東縣',
    sunriseCityName: '臺東縣',
  },
  {
    cityName: '臺北市',
    locationName: '臺北市',
    sunriseCityName: '臺北市',
  },
  {
    cityName: '金門縣',
    locationName: '金門縣',
    sunriseCityName: '金門縣',
  },
  {
    cityName: '桃園市',
    locationName: '桃園市',
    sunriseCityName: '桃園市',
  },
  {
    cityName: '彰化縣',
    locationName: '彰化縣',
    sunriseCityName: '彰化縣',
  },
  {
    cityName: '嘉義縣',
    locationName: '嘉義縣', // 大林鎮
    sunriseCityName: '嘉義縣',
  },
  {
    cityName: '高雄市',
    locationName: '高雄市',
    sunriseCityName: '高雄市',
  },
  {
    cityName: '基隆市',
    locationName: '基隆市',
    sunriseCityName: '基隆市',
  },
  {
    cityName: '臺南市',
    locationName: '臺南市',
    sunriseCityName: '臺南市',
  },
  {
    cityName: '南投縣',
    locationName: '南投縣',
    sunriseCityName: '南投縣',
  },
  {
    cityName: '臺中市',
    locationName: '臺中市',
    sunriseCityName: '臺中市',
  },
  {
    cityName: '新竹縣',
    locationName: '新竹縣',
    sunriseCityName: '新竹縣',
  },
  {
    cityName: '花蓮縣',
    locationName: '花蓮縣',
    sunriseCityName: '花蓮縣',
  },
  {
    cityName: '連江縣',
    locationName: '連江縣',
    sunriseCityName: '連江縣',
  },
  {
    cityName: '澎湖縣',
    locationName: '澎湖縣',
    sunriseCityName: '澎湖縣',
  },
  {
    cityName: '新北市',
    locationName: '新北市',
    sunriseCityName: '新北市',
  },
];

export const findLocation = (cityName) => {
  return availableLocations.find((location) => location.cityName === cityName);
};
