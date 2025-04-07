# ⛅ 專案名稱：天氣應用程式

提供台灣各地天氣資訊，包含氣溫、降雨機率與日出日落時間，支援主題切換與離線瀏覽！

---

## 🔎 專案背景與動機

此專案旨在提供一個即時且使用者友善的天氣查詢平台，使用者可以快速查詢全台各地區的天氣資訊。  
除了基本的氣象數據，應用程式還結合了「日夜模式切換」與「PWA 離線支援」，提升使用體驗。  
透過這個專案，我希望強化 API 串接、資料格式轉換、動態樣式變化與 React hooks 的實戰運用能力。

---

## 🧪 使用技術與堆疊

- **React**  
  建立 SPA 架構，使用 Functional Component 撰寫 UI。

- **React Hooks**  
  使用 `useState`, `useEffect`, `useMemo` 管理狀態與效能優化。

- **Emotion (`@emotion/styled`)**  
  採用 CSS-in-JS 方案撰寫元件樣式，強化樣式模組化與維護性。

- **中央氣象局開放資料 API**  
  天氣資料來源，提供全台各地氣溫、降雨機率、日出日落時間等（[官方 Swagger 文件](https://opendata.cwa.gov.tw/dist/opendata-swagger.html)）。

- **PWA (Progressive Web App)**  
  使用 `serviceWorkerRegistration` 提供離線快取與應用緩存功能，支援離線使用。

- **dotenv**  
  管理 API 金鑰等環境變數，提升安全性與可配置性。

- **dayjs**  
  輕量級的日期處理函式庫，處理日出日落時間、轉換時間格式等用途。

- **node-fetch**  
  用於伺服器端的 API 呼叫，支援抓取遠端天氣資料。

- **fs / path 模組**  
  處理本地端檔案操作與路徑管理，應用於伺服器端預處理。

- **Intl.DateTimeFormat**  
  提供多語系日期格式顯示與在地化支援。

- **normalize.css**  
  統一不同瀏覽器預設樣式行為，保持樣式一致性。

## 🧩 功能亮點

- ✅ **天氣查詢介面**：支援使用者選擇地區並即時查詢當地天氣
- ✅ **氣象資訊顯示**：包含氣溫、降雨機率、日出與日落時間
- ✅ **日夜模式切換**：根據地區的日出日落時間，自動切換應用程式主題風格
- ✅ **離線支援**：透過 PWA 註冊服務，使用者可在無網路時繼續使用最後查詢結果
- ✅ **自訂 Hook 管理資料抓取**：整合 `useWeatherAPI` 處理資料請求與轉換

---

## 🧱 專案架構簡介

📁 /components
└─ 可重用元件，例如 WeatherIcon、SunriseText 等

📁 /views
└─ 頁面視圖，如 WeatherCard、WeatherSetting，顯示地區資訊與表單

📁 /hooks
└─ 自訂 hook，如 useWeatherAPI 處理資料抓取與狀態控制

📁 /utils
└─ 工具模組，如 API 管理、資料格式轉換、地區列表等

📁 /assets
└─ 圖示與靜態資源

📁 /serviceWorker
└─ PWA 註冊模組

.env // API 金鑰與環境變數

---

## ⚙️ 開發過程中的挑戰與解決

- 💡 **資料抓取延遲與失敗處理：**  
  針對 API 資料請求建立 loading 狀態與錯誤處理提示，讓使用者清楚掌握查詢狀況。

- 💡 **日夜主題切換邏輯：**  
  根據地區回傳的日出日落時間，使用 `useEffect` 計算是否進入夜晚，並動態變更主題樣式。

- 💡 **PWA 註冊與測試困難：**  
  導入 `serviceWorkerRegistration` 並逐步測試離線快取功能，處理版本控制與資源快取問題。

---

## 🎓 學習收穫

- 🔹 熟悉串接開放氣象資料並處理資料清洗與欄位對應
- 🔹 實作日出日落時間影響主題變化的應用邏輯
- 🔹 強化自訂 hook 與效能優化技巧（useMemo / useEffect 整合）
- 🔹 學會建構基本 PWA 架構並測試離線能力
- 🔹 練習 Emotion 的 styled components 用法，實現元件化樣式設計

---

## 🚀 線上展示與原始碼連結

- 🔗 [👉 線上 Try ](https://54hanyi.github.io/react-weather-app/)
- 🧑‍💻 [GitHub 原始碼](https://github.com/54hanyi/react-weather-app)
