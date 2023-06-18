import axios from "axios";
import * as Config from "./Config";

export default function CallApi(endpoint, method = "GET", body) {
  return axios({
    url: `${Config.API_URL}/${endpoint}`,
    method: method,
    data: body,
  }).catch((err) => {
    console.log(err);
  });
}
