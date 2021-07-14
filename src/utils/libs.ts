/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-07 14:40:35
 * @LastEditTime: 2021-07-08 14:49:50
 * @LastEditors: zaq
 * @Reference:
 */
// import Cookies from 'js-cookie';
import { setCookies, getCookies } from "./cookies";
import config from "../config";
export const TOKEN = "token";

export function SetToken(value: string) {
  setCookies(TOKEN, value, config.expires);
}
export function GetToken() {
  return getCookies(TOKEN);
}

function rad(d: number) {
  return (d * Math.PI) / 180.0;
}

// 根据经纬度计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
export function getDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
) {
  var radLat1 = rad(lat1);
  var radLat2 = rad(lat2);
  var a = radLat1 - radLat2;
  var b = rad(lng1) - rad(lng2);
  var s =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(a / 2), 2) +
          Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)
      )
    );
  s = s * 6378.137; // EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000; //输出为公里

  var distance = s;
  var distance_str = "";

  if (Number(distance) >= 1) {
    distance_str = distance.toFixed(1) + "km";
  } else {
    distance_str = (distance * 1000).toFixed(2) + "m";
  }
  return distance_str;
}
