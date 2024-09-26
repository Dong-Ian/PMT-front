import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const isLoggedInState = atom({
  key: "isLoggedInState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const tokenState = atom({
  key: "tokenState",
  default: { accessToken: "", refreshToken: "" },
  effects_UNSTABLE: [persistAtom],
});
