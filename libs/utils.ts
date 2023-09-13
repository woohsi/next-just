import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type Geolocation = {
  ip: string
  city: string
  country_name: string
}

export const getGeolocation = async (ip: string): Promise<Geolocation> => {
  const res = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.IP_GEOLOCATION_API_KEY}&ip=${ip}&fields=city,country_name`)
  return res.json()
}

export const getLocation = async (ip: string): Promise<string> => {
  const geo = await getGeolocation(ip)
  return geo.city + ", " + geo.country_name
}