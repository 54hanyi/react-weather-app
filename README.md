1. **專案名稱與簡介**：

   - 專案名稱：天氣應用程式
   - 簡介：此專案是一個天氣應用程式，提供台灣各地的天氣資料，包括日出日落時間、氣溫、降雨機率等資訊，使用者可以選擇特定地區並查看當地的天氣狀況。

2. **技術堆疊**：

   - **前端框架**：React
   - **狀態管理**：React Hooks（`useState`、`useEffect`、`useMemo` 等）
   - **CSS 處理**：Emotion（`@emotion/styled`）用於樣式定義
   - **天氣 API**：使用中央氣象局開放資料 API 抓取天氣資料(https://opendata.cwa.gov.tw/dist/opendata-swagger.html)
   - **PWA 支援**：使用 `serviceWorkerRegistration` 進行 PWA 註冊，提供離線使用的能力
   - **工具庫**：
     - `node-fetch`：用於伺服器端抓取天氣資料
     - `dotenv`：用於環境變數管理（API 金鑰）
     - `dayjs`：用於日期時間的處理
   - **其他技術**：
     - 使用 `normalize.css` 標準化不同瀏覽器的預設樣式
     - `fs` 模組與 `path` 用於檔案的讀寫和路徑管理
     - `Intl.DateTimeFormat` 用於日期格式化

3. **專案展示**：

   - 使用 GitHub Pages 部署，提供應用程式的預覽。

4. **功能描述**：

   - 從中央氣象局 API 抓取台灣各地的天氣資料。
   - 顯示各地區的天氣資訊，包括日出、日落時間、氣溫、降雨機率等。
   - 提供地區選擇，使用者可以查看特定地區的天氣。
   - 支援日夜模式切換，根據日出日落自動改變主題樣式。

5. **架構概述**：

   - **目錄結構**：
     - `components/`：包含可重用的 UI 元件，例如 WeatherIcon。
     - `views/`：包含主要的 UI 視圖，例如 WeatherCard、WeatherSetting。
     - `utils/`：工具函式，例如檔案讀寫操作、幫助函式。
     - `hooks/`：自定義 Hook（如 `useWeatherAPI`），用於抓取天氣資料。
   - **狀態管理**：
     - 使用 React 的 `useState` 和 `useEffect` 管理天氣資料及地區的選擇。
     - 使用 `useMemo` 進行計算優化，減少不必要的重新渲染。

6. **挑戰與解決方案**：

   - **資料抓取延遲與重試機制**：抓取天氣資料時可能會遇到網絡延遲，通過適當的錯誤處理和使用者提示（例如顯示 Loading 圖示）來解決。
   - **日夜模式切換**：根據日出日落時間來自動切換主題，通過 `useEffect` 和 `useMemo` 實現動態主題改變。

7. **未來規劃**：
   - 加入更多的天氣指標，例如紫外線指數、空氣品質等。
   - 優化使用者介面，加入更多互動效果和視覺增強。
   - 增加多語言支持。
