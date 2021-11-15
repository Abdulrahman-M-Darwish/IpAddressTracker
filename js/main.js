let locationObj = {};
const map = L.map("map").setView([0, 0], 1);
const btn = document.querySelector(".close");
let input = document.querySelector(".input");

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

let pointerIcon = L.icon({
  iconUrl: "./../images/icon-location.svg",
  iconSize: [46, 56], // size of the icon
  iconAnchor: [23, 28], // point of the icon which will correspond to marker's location
});

let marker = L.marker([0, 0], { icon: pointerIcon }).addTo(map);

marker.setLatLng([50, -50]);

async function getLocation(ip = "") {
  let req = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_iPnOS5R3cEsOo5iVXNazuVZUKs9Z2&ipAddress=${ip}`
  );
  let res = await req.json();
  locationObj = {
    ip: res.ip,
    isp: res.isp,
    city: res.location.city,
    country: res.location.country,
    lat: res.location.lat,
    lng: res.location.lng,
    zipCode: res.location.postalCode,
    timezone: res.location.timezone,
  };
  setLocation(locationObj);
  console.log(res);
}

function setLocation(data) {
  map.flyTo([data.lat, data.lng], 15);
  marker.setLatLng([data.lat, data.lng]);
  document.querySelector(".ip").textContent = data.ip;
  document.querySelector(
    ".location"
  ).textContent = `${data.country} ${data.city}, ${data.zipCode}`;
  document.querySelector(".time").textContent = `UTC${data.timezone}`;
  document.querySelector(".isp").textContent = data.isp;
}

document.querySelector(".search").style.height =
  177 + document.querySelector("ul").clientHeight / 2 + "px";

window.addEventListener("resize", () => {
  document.querySelector(".search").style.height =
    177 + document.querySelector("ul").clientHeight / 2 + "px";
  console.log(document.querySelector("ul").clientHeight);
});

btn.addEventListener("click", () => {
  btn.classList.toggle("open");
  if (btn.classList.contains("open")) {
    document.querySelector(".search").style.height = "0px";
    document.querySelector(".search").style.overflow = "hidden";
    document.querySelector(".search").style.paddingTop = "0";
  } else {
    document.querySelector(".search").style.height =
      177 + document.querySelector("ul").clientHeight / 2 + "px";
    document.querySelector(".search").style.overflow = "visible";
    document.querySelector(".search").style.paddingTop = "24px";
  }
});

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  getLocation(input.value);
  input.value = "";
});

window.addEventListener("load", () => getLocation());
