"use client";

import React from "react";
import Image from "next/image";
import {
	useCookieContext,
	calculateBuildingCost,
	baseBuildingCost,
	baseBuildingCps,
} from "@/utils/cookieProvider";
import { numberToStringVersion } from "@/utils/utils";

const CookieShop = () => {
	const { cookies, purchaseUpgrade, upgrades } = useCookieContext();

	const buildingTypes = Object.keys(upgrades);

	const calculateColor = (cost, cookies) => {
		return cookies >= cost ? "text-green-500" : "text-red-500";
	};

	return (
		<div className="w-full p-4">
			{buildingTypes.map((type) => {
				const cost = calculateBuildingCost(type, upgrades[type], baseBuildingCost);
				const cps = baseBuildingCps[type];

				return (
					<button
						className={`${calculateColor(
							cost,
							cookies
						)} w-full flex justify-between items-center mb-2 font-bold`}
						disabled={cookies < cost}
						onClick={() => purchaseUpgrade(type)}
						key={type}
					>
						<div className="flex justify-start items-center gap-4">
							<Image
								src={`/buildings/${type.toLowerCase()}.webp`}
								width="64"
								height="64"
                className="w-16 h-16 object-scale-down"
								alt={type}
							/>
							<div className="flex flex-col justify-start items-start">
								<span className="text-xl">
									{type.charAt(0).toUpperCase() + type.slice(1)}
								</span>
								<span className="text-sm">
									Cost: {numberToStringVersion(cost, true)} cookies
								</span>
								<span className="text-sm">
									{numberToStringVersion(cps, false)} cps
								</span>
							</div>
						</div>

						<span className="text-2xl items">{upgrades[type]}</span>
					</button>
				);
			})}
		</div>
	);
};

export default CookieShop;
