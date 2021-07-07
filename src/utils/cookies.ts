/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-07 15:29:25
 * @LastEditTime: 2021-07-07 15:54:48
 * @LastEditors: zaq
 * @Reference: 
 */
type Cookies = {
  [key: string]: string
}

export function setCookies(name: string, key: string, time: number) {
  const expires = new Date().setDate(new Date().getDate() + time);
  document.cookie = `${name}=${key}; expires=${new Date(expires)}`;
}

export function getCookies(name: string) {
  const cookies: Cookies = {}
  document.cookie.split('; ').forEach((item) => {
    const kv = item.split('=');
    cookies[kv[0]] = kv[1];
  });
  if (cookies.hasOwnProperty(name) && cookies[name]) return cookies[name]
  else return ''
}