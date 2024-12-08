import maxmind, { Reader, CityResponse } from 'maxmind';
import { getClientIp } from 'request-ip';
import isLocalhost from 'is-localhost-ip'
import path from 'path';
import type { NextRequest } from 'next/server';

let lookup: Reader<CityResponse>;

export async function GetIpAddress(req: NextRequest | any) {
  // Cloudflare
  // if (req.headers['cf-connecting-ip']) {
  //   return String(req.headers['cf-connecting-ip']);
  // }

  let clientIp: string | null = null;
  try {
    clientIp = getClientIp(req); // Casting here because request-ip doesn't have types for NextRequest
  } catch (error) {
    console.log("Error obtaining IP with request-ip:", error);
  }

  if (!clientIp) {
    clientIp = req.headers['x-forwarded-for'] || req.headers['remote-addr'] || '127.0.0.1';
  }
  console.log("IP obtained:", clientIp);
  return clientIp as string;
}

export async function GetLocation(ip: string) {
  if (await isLocalhost(ip)) {
    return;
  }

  if (!lookup) {
    const dbPath = path.join(process.cwd(), 'public/geoip/GeoLite2-City.mmdb');
    lookup = await maxmind.open<CityResponse>(dbPath);

    const result = lookup.get(ip);
    console.log(result)
  }
} 