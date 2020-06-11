export const ScreenPath = {
    LOGIN: { path: "/", id: "login", name: "ログイン画面" },
    MAIN: { path: "/main", id: "main", name: "メイン画面" },
  };

export const apiURLs = {
  LOGIN: 'http://localhost:8000/api/v1/rest-auth/login/',
  GETDBRESULTS: 'http://localhost:8000/api/v1/shakas/get_user_result/',
  POSTMESSAGE: 'http://localhost:8000/api/v1/shakas/set_point/',
}

