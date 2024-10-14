import { useState, useEffect, useCallback } from 'react';

const fetchCurrentWeather = async ({ authorizationKey, locationName }) => {
  try {
    const response = await fetch(
      `https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${authorizationKey}&format=JSON`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // // 列出所有可用的 CountyName 以便進行排查
    // data.records.Station.forEach((station) => {
    //   console.log('Available CountyName:', station.GeoInfo?.CountyName);
    // });

    // 使用 find() 方法找到第一個符合縣市名稱的觀測站
    const station = data.records.Station.find(
      (station) => station.GeoInfo?.CountyName === locationName,
    );

    if (!station) {
      console.error(`Station not found for: ${locationName}`);
      throw new Error(`Current weather data is unavailable for location: ${locationName}`);
    }

    // 解構所需的天氣資料
    const {
      ObsTime: { DateTime: observationTime },
      StationName: stationName,
      WeatherElement: { AirTemperature: temperature, WindSpeed: windSpeed, Weather: description },
    } = station;

    return {
      observationTime: observationTime || 'N/A',
      locationName: `${locationName} (${stationName})` || 'Unknown Location',
      temperature: temperature !== undefined ? temperature : 'N/A',
      windSpeed: windSpeed !== undefined ? windSpeed : 'N/A',
      description: description || 'N/A',
    };
  } catch (error) {
    console.error('Error fetching current weather:', error);
    return {
      observationTime: 'N/A',
      locationName: 'Unknown',
      temperature: 'N/A',
      windSpeed: 'N/A',
      description: 'N/A',
    };
  }
};

const fetchWeatherForecast = async ({ authorizationKey, cityName }) => {
  try {
    const response = await fetch(
      `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${authorizationKey}&locationName=${cityName}&format=JSON`,
    );

    if (!response.ok) {
      throw new Error(`網路錯誤！ Status: ${response.status}`);
    }

    const data = await response.json();

    // 檢查 location 資料是否存在
    const locationData = data.records?.location?.find((loc) => loc.locationName === cityName);

    if (!locationData) {
      throw new Error(`Weather forecast data is unavailable for city: ${cityName}`);
    }

    // 遍歷 weatherElement，提取需要的數據
    const weatherElements = locationData.weatherElement.reduce((neededElements, item) => {
      if (['Wx', 'PoP', 'CI'].includes(item.elementName)) {
        neededElements[item.elementName] = item.time?.[0]?.parameter || {};
      }
      return neededElements;
    }, {});

    return {
      description: weatherElements.Wx?.parameterName || 'N/A', // 天氣描述，例如 "晴時多雲"
      weatherCode: weatherElements.Wx?.parameterValue || 'N/A', // 天氣代碼，例如 "2"
      rainPossibility: weatherElements.PoP?.parameterName || 'N/A', // 降雨機率，例如 "10"
      comfortability: weatherElements.CI?.parameterName || 'N/A', // 舒適度描述，例如 "舒適"
    };
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    // 返回安全的預設值
    return {
      description: 'N/A',
      weatherCode: 'N/A',
      rainPossibility: 'N/A',
      comfortability: 'N/A',
    };
  }
};

const useWeatherAPI = ({ locationName, cityName, authorizationKey }) => {
  const [weatherElement, setWeatherElement] = useState({
    observationTime: new Date(),
    locationName: '',
    temperature: 0,
    windSpeed: 0,
    description: '',
    weatherCode: 0,
    rainPossibility: 0,
    comfortability: '',
    isLoading: true,
  });

  const fetchWeather = useCallback(async () => {
    setWeatherElement((prevState) => ({
      ...prevState,
      isLoading: true,
    }));

    const [currentWeather, weatherForecast] = await Promise.all([
      //locationName 是給「觀測」天氣資料拉取 API 用的地區名稱
      fetchCurrentWeather({ authorizationKey, locationName }),
      // cityName 是給「預測」天氣資料拉取 API 用的地區名稱
      fetchWeatherForecast({ authorizationKey, cityName }),
    ]);

    setWeatherElement({
      ...currentWeather,
      ...weatherForecast,
      isLoading: false,
    });
  }, [authorizationKey, cityName, locationName]);

  // 說明：一旦 locationName 或 cityName 改變時，fetchWeather 就會改變，此時 useEffect 內的函式就會再次執行，拉取最新的天氣資料
  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  return [weatherElement, fetchWeather];
};

export default useWeatherAPI;
