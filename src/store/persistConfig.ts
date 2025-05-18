import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Chỉ persist state của auth
};

export default persistConfig;
