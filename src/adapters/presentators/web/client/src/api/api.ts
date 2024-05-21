import { ILocation, IPosition, IWether } from "../Types";

function get_base_path() {
  const url = new URL(window.location.href)
  const BasePath = (url.port !== '80') ? `${url.protocol}//${url.hostname}:${url.port}` : `${url.protocol}//${url.hostname}`;
  return BasePath;//"http://192.168.77.106:8080";
}

export const getLocationOptions = async (searchValue: string) => {
  const path = get_base_path() + "/location/find?name=" + searchValue
  const data: ILocation[] = await fetch(path, { method: "GET" }).then(res => res.json())
  return data
}

export const getWether = async (position: IPosition) => {
  const path = get_base_path() + "/wether?" + `lat=${position.lat}&lon=${position.lon}`
  const wether: IWether[] = await fetch(path).then(res => res.json())
  return wether
}