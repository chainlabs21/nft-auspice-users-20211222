import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMobile } from "../reducers/commonSlice";

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
  
  return <Fragment />;
}
