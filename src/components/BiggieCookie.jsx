"use client"

import React from 'react';
import Image from 'next/image';
import { useCookieContext, baseBuildingCps } from '@/utils/cookieProvider';

function BiggieCookie() {
  const { cookies, setCookies, upgrades } = useCookieContext();

  const handleClick = () => {
    const additionalCookies = upgrades.cursor * baseBuildingCps.cursor;
    setCookies(cookies + 1 + additionalCookies);
  };

  return (
    <button onClick={handleClick} className="transition-all hover:scale-105 active:scale-95">
      <Image src="/biggiecookie.webp" alt="Click this cookie" width={384} height={384} />
    </button>
  );
}

export default BiggieCookie;