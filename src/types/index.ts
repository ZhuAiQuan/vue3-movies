/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-01 14:23:22
 * @LastEditTime: 2021-07-15 13:26:05
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
  showDate: number[]
}
type Role = '导演' | string;
export interface Actors {
  avatarAddress: string;
  name: string;
  role: Role;
}

export interface CinemasInfo {
  address: string
  cinemaId: number
  cityId: number
  cityName: string
  district: {
    districtId: number
    name: string
  }
  districtId: number
  districtName: string
  eTicketFlag: number
  gpsAddress: string
  latitude: number
  logoUrl: string
  longitude: number
  lowPrice: number
  name: string
  phone: string
  telephones: string[]
  Distance: number
  businessTime: string
  isVisited: number
  notice: string
  seatFlag: number
  ticketTypes: TickerTypes[] | null
  services: Services[]
}
interface TickerTypes {
  id: number
  name: string
}
export interface Services {
  description: string
  name: string
}

export interface Schedules {
  advanceStopMins: number
  endAt: number
  filmLanguage: string
  hallName: string
  imagery: string
  isOnsell: boolean
  marketPrice: number
  maxSalePrice: number
  minSalePrice: number
  salePrice: number
  scheduleId: number
  showAt: number
}

export interface FilmInfo {
  filmId: number
  grade: string
  category: string
  runtime: number
  director: string
  actors: Actors[]
  name: string
  premiereAt: number
  showDate: number[]
}

export interface SchedulesTabs {
  key: number
  title: string
}