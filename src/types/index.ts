/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-01 14:23:22
 * @LastEditTime: 2021-07-06 13:36:46
 * @LastEditors: zaq
 * @Reference: 
 */
export interface Response {
  data: unknown
  msg: string
  status: number
}
export interface Geo {
  cityId: number
  isHot: number
  name: string
  pinyin: string
}
export interface MoviesData {
  poster: string;
  name: string;
  filmType: {
    name: string;
    type: number;
  };
  actors: Actors[];
  director: string;
  category: string;
  filmId: number;
  premiereAt: number;
  grade: string;
  nation: string;
  runtime: number;
  isPresale: boolean;
  isSale: boolean;
  language: string;
  photos: string[];
  synopsis: string;
  timeType: number;
  videoId: number;
}
type Role = '导演';
export interface Actors {
  avatarAddress: string;
  name: string;
  role?: Role;
}