import apiKey from "./apiKey";
import baseURL from "./baseURL";

export default function (url: string, queryString: string = "") {
  return baseURL + url + "?" + "api_key=" + apiKey + queryString;
}
