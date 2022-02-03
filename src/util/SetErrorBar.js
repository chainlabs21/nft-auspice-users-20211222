import I_chkWhite from "../img/icons/I_chkWhite.svg";
import I_xWhite from "../img/icons/I_xWhite.svg";

export default function SetErrorBar(str = "copied", type = "pc") {
  /*
  if (document.getElementsByClassName("errBar")[0]) return;

  let errBar = document.createElement("div");
  errBar.className = "errBar";
  errBar.style.width = "660px";
  if (type === "mobile") errBar.style.width = "91.2vw";
  errBar.style.height = "48px";
  if (type === "mobile") errBar.style.height = "12vw";

  errBar.style.background = "rgba(0,0,0,0.7)";
  errBar.style.color = "#fff";
  errBar.style.display = "flex";
  errBar.style.justifyContent = "space-between";
  errBar.style.zIndex = "100";

  let leftBox = document.createElement("span");
  leftBox.style.display = "flex";
  leftBox.style.alignItems = "center";
  leftBox.style.gap = "10px";

  let errText = document.createElement("p");
  errText.innerText = str;

  let checkIconBox = document.createElement("span");
  checkIconBox.style.width = "20px";
  if (type === "mobile") checkIconBox.style.width = "5.6vw";
  checkIconBox.style.height = "20px";
  if (type === "mobile") checkIconBox.style.height = "5.6vw";
  checkIconBox.style.border = "2px solid #fff";
  checkIconBox.style.borderRadius = "50%";
  checkIconBox.style.display = "flex";
  checkIconBox.style.justifyContent = "center";
  checkIconBox.style.alignItems = "center";
  checkIconBox.style.marginRight = "10px";
  if (type === "mobile") checkIconBox.style.marginRight = "2.4vw";

  let checkIcon = document.createElement("img");
  checkIcon.src = I_chkWhite;
  checkIcon.style.width = "10px";
  if (type === "mobile") checkIconBox.style.marginRight = "2.8vw";

  let exitIcon = document.createElement("img");
  exitIcon.src = I_xWhite;
  exitIcon.style.width = "14px";
  if (type === "mobile") exitIcon.style.width = "4vw";
  exitIcon.style.cursor = "pointer";

  checkIconBox.append(checkIcon);
  leftBox.append(checkIconBox);

  errBar.style.display = "flex";
  errBar.style.padding = "0 20px";
  errBar.style.alignItems = "center";
  errBar.style.fontWeight = "400";
  errBar.style.borderRadius = "10px";

  errBar.style.position = "fixed";
  errBar.style.top = "0px";
  errBar.style.left = "50%";
  errBar.style.transform = "translate(-50%,0)";

  errBar.style.fontFamily = "NotosansMedium";

  leftBox.append(errText);
  errBar.append(leftBox);
  errBar.append(exitIcon);

  let errBarApear;

  errBarApear = errBar.animate([{ transform: "translate(-50%,98px)" }], {
    duration: 400,
    fill: "forwards",
    easing: "ease-in-out",
  });

  if (type === "mobile")
    errBarApear = errBar.animate([{ transform: "translate(-50%,78px)" }], {
      duration: 400,
      fill: "forwards",
      easing: "ease-in-out",
    });

  errBarApear.play();

  errBarApear.onfinish = errBarDisapear;

  function errBarDisapear() {
    errBar.animate([{ transform: "translate(-50%,0px)" }], {
      delay: 5400,
      duration: 400,
      fill: "forwards",
      easing: "ease-in-out",
    }).onfinish = removeErrBar;
  }

  function removeErrBar() {
    errBar.remove();
  }

  exitIcon.addEventListener("click", function () {
    errBar.animate([{ transform: "translate(-50%,0px)" }], {
      delay: 0,
      duration: 400,
      fill: "forwards",
      easing: "ease-in-out",
    }).onfinish = removeErrBar;
  });

  document.body.append(errBar);
  */
  alert(str);
}
