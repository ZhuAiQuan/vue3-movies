/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-14 09:32:31
 * @LastEditTime: 2021-07-14 14:43:39
 * @LastEditors: zaq
 * @Reference:
 */
import { cimemaDetail } from "@/api/geolocation";
import { cinemaShowFilms, schedules } from '@/api/films';
import type { CinemasInfo, MoviesData, Schedules } from "@/types";
import { Toast } from "vant";
import { reactive, toRefs } from "vue";

interface Info {
  cinema: CinemasInfo;
  films: MoviesData[];
  schedules: Schedules[]
}

export default function useData() {
  const info: Info = reactive({
    cinema: {
      address: "",
      cinemaId: 0,
      cityId: 0,
      cityName: "",
      district: {
        districtId: 0,
        name: "",
      },
      districtId: 0,
      districtName: "",
      eTicketFlag: 0,
      gpsAddress: "",
      latitude: 0,
      logoUrl: "",
      longitude: 0,
      lowPrice: 0,
      name: "",
      phone: "",
      telephones: [],
      Distance: 0,
      businessTime: "",
      isVisited: 0,
      notice: "",
      seatFlag: 0,
      ticketTypes: [],
      services: [],
    },
    films: [],
    schedules: []
  });

  function getData(id: string) {
    cimemaDetail(id).then((res) => {
      if (!res.data.status) {
        info.cinema = (res.data.data as { cinema: CinemasInfo }).cinema;
      } else Toast.fail(res.data.msg);
    });
  }

  function showFilms(id: string) {
    cinemaShowFilms(id).then(res => {
      if (!res.data.status) {
        info.films = (res.data.data as { films: MoviesData[] }).films
      } else Toast.fail(res.data.msg);
    })
  }

  function getSchedules(filmId: number, cinemaId: string, date: number) {
    schedules(filmId, cinemaId, date).then(res => {
      if (!res.data.status) {
        info.schedules = (res.data.data as { schedules: Schedules[] }).schedules
      } else Toast.fail(res.data.msg);
    })
  }

  return {
    ...toRefs(info),
    getData,
    showFilms,
    getSchedules,
  };
}
