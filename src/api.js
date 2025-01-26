import axios from "axios";
import { LANGUAGE_VERSIONS } from "./constants";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
  baseURL: "http://127.0.0.1:8000/api/",
  baseURL: "https://beiverilog.sumathi.dev/api/",
});
const BASE_URLS = {
  default: "https://emkc.org/api/v2/piston",
  verilog: "https://beiverilog.sumathi.dev/api/",
};

const getAPIInstance = (language) => {
  const baseURL =
    language === "verilog" ? BASE_URLS.verilog : BASE_URLS.default;
  return axios.create({
    baseURL: baseURL,
  });
};
export const executeCode = async (language, sourceCode) => {
  // const response = await API.post("/execute", {
  const API = getAPIInstance(language);
  const endpoint = language === "verilog" ? "/compile/" : "/execute";
  const response = await API.post(endpoint, {
    language: language,
    version: LANGUAGE_VERSIONS[language],
    files: [
      {
        content: sourceCode,
      },
    ],
    code: sourceCode,
  });
  return response.data;
};
