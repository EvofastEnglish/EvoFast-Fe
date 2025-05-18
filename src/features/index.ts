import { combineReducers } from "@reduxjs/toolkit";
import aiTestReducer from "./aiTest";
import globalReducer from "./globalSlice";

const appReducers = { global: globalReducer, aiTest: aiTestReducer };

export const rootReducer = combineReducers(appReducers);
