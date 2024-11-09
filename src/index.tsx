import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import App from "./App";
import { RecoilRoot } from "recoil";

const theme = createTheme({
  /** Mantine 테마 오버라이드 설정 */
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <RecoilRoot>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </RecoilRoot>
);
