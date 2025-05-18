import store from "@/store/store";
import "@i18n/i18n";
import { App as AntdApp, ConfigProvider } from "antd";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import "../styles/globals.css";

export const persistor = persistStore(store);

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
  <ConfigProvider
    theme={{
      token: {
        fontSize: 16,
      },
    }}
  >
    {/* SessionProvider cấu hình để sử dụng next-auth */}
    <SessionProvider session={session}>
      <Provider store={store}>
        <AntdApp>
          <Component {...pageProps} />
        </AntdApp>
      </Provider>
    </SessionProvider>
  </ConfigProvider>
);

export default App;
