/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-07-07 09:40:50
 * @LastEditTime: 2021-07-07 10:58:34
 * @LastEditors: zaq
 * @Reference:
 */
import { getMessage } from "../../api/message";
import { reactive, onMounted } from "vue";

interface Responsed {
  extra: string;
  data: {
    content: string;
    description: string;
    title: string;
  };
}
export interface MessageInfo {
  id: number;
  url: string;
  src: string;
}
interface Content {
  list: MessageInfo[];
}

export default function useData() {
  const content: Content = reactive({
    list: [],
  });

  function getData() {
    getMessage().then((res) => {
      if (!res.data.status) {
        const child = (res.data.data as Responsed).data.content;

        content.list = child
          .substring(3, child.length - 4)
          .split("</a>")
          .map((item) => {
            let start: number;
            let last: number;
            let id = 0;
            let url = "";
            let src = "";
            if (item.includes("filmId:")) {
              start = item.indexOf("filmId:") + 8;
              last = item.substring(start).indexOf(`'})`);
              id = +item.substring(start, start + last);
            } else {
              start = item.indexOf(`{url:'`) + 6;
              last = item.substring(start).indexOf(`'})`);
              url = item.substring(start, start + last).trim();
            }
            start = item.indexOf('src="') + 5;
            last = item.substring(start).indexOf('" style');
            src = item.substring(start, start + last);
            return {
              id,
              url,
              src,
            };
          });
      }
    });
  }
  onMounted(() => {
    getData();
  });

  return {
    content,
  };
}
