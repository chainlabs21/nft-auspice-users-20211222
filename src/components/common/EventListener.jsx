import axios from "axios";
import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { API } from "../../config/api";
import { setMobile } from "../../reducers/commonSlice";

export default function EventListener() {
  const dispatch = useDispatch();

  function handleResize() {
    if (window.innerWidth > 1280) dispatch(setMobile(false));
    else dispatch(setMobile(true));
  }

  useEffect(() => {
    if (window.innerWidth > 1280) dispatch(setMobile(false));
    else dispatch(setMobile(true));

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setInterval(() => {
      let token_sec = localStorage.getItem("token");
      axios.defaults.headers.get.token = token_sec;
      axios.defaults.headers.post.token = token_sec;

      axios.get(API.API_GET_PUSH).then((res) => {
        console.log(res);

        res.data.pushes.rows.map((v, i) => {
          toast.success(v.content, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          axios.delete(`${API.API_GET_PUSH}/${v.id}`);
        });
      });
    }, 5000);
  }, []);

  return <Fragment />;
}
