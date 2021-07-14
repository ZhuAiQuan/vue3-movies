/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-13 16:17:48
 * @LastEditTime: 2021-07-13 17:06:59
 * @LastEditors: zaq
 * @Reference:
 */
import { reactive, toRefs } from "vue";
import { getAllCity } from "@/api/geolocation";
import type { Geo } from "@/types";

interface Citys {
  cities: Geo[];
  hotCities: Geo[];
  indexList: string[]
}

export default function useData() {
  const citys: Citys = reactive({
    cities: [],
    hotCities: [],
    indexList: []
  });

  function getData() {
    getAllCity().then((res) => {
      if (!res.data.status) {
        citys.cities = (res.data.data as { cities: Geo[] }).cities;
        citys.hotCities = citys.cities.filter((item) => item.isHot);
        citys.cities.forEach(item => {
          if (!citys.indexList.includes(item.pinyin[0].toLocaleUpperCase())) {
            citys.indexList.push(item.pinyin[0].toLocaleUpperCase())
          }
        })
        citys.indexList.sort()
      }
    });
  }

  return {
    ...toRefs(citys),
    getData,
  };
}
