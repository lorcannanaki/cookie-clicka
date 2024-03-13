"use client"

import React from 'react'

import { useCookieContext } from '@/utils/cookieProvider.js'
import { numberToStringVersion } from '@/utils/utils.js'

export default function CookieCounter() {
  const { cookies, cps } = useCookieContext();

  return (
    <div className="w-full px-4 py-1 flex flex-col justify-center items-center text-white bg-black bg-opacity-50 backdrop-blur">
      <p className="text-2xl font-bold text-center">{numberToStringVersion(cookies, true)} cookies</p>
      <p className="text-base text-center">per second: {numberToStringVersion(cps)}</p>
    </div>
  );
}