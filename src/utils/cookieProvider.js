"use client";

import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from "react";
import PropTypes from "prop-types";

const CookieContext = createContext();

export function useCookieContext() {
	return useContext(CookieContext);
}

export const baseBuildingCost = {
	cursor: 15,
	grandma: 100,
	farm: 1100,
	mine: 12000,
	factory: 130000,
	bank: 1400000,
	temple: 20000000,
	wizardTower: 330000000,
	shipment: 5100000000,
	alchemyLab: 75000000000,
	portal: 1000000000000,
	timeMachine: 14000000000000,
	antimatterCondenser: 170000000000000,
	prism: 2100000000000000,
	chancemaker: 26000000000000000,
	fractalEngine: 310000000000000000,
	javascriptConsole: 71000000000000000000,
	idleverse: 12000000000000000000000,
	cortexBaker: 1900000000000000000000000,
	you: 540000000000000000000000000,
};

export const baseBuildingCps = {
	cursor: 0.1,
	grandma: 1,
	farm: 8,
	mine: 47,
	factory: 260,
	bank: 1400,
	temple: 7800,
	wizardTower: 44000,
	shipment: 260000,
	alchemyLab: 1600000,
	portal: 10000000,
	timeMachine: 65000000,
	antimatterCondenser: 430000000,
	prism: 2900000000,
	chancemaker: 21000000000,
	fractalEngine: 150000000000,
	javascriptConsole: 1100000000000,
	idleverse: 8300000000000,
	cortexBaker: 64000000000000,
	you: 510000000000000,
};

export const calculateBuildingCost = (buildingType, count, baseBuildingCost) => {
	return baseBuildingCost[buildingType] * Math.pow(1.15, count);
};

export const calculateTotalCps = (upgrades, baseBuildingCps) => {
  return Object.keys(upgrades).reduce((totalCps, upgrade) => {
      if (upgrade === 'cursor') return totalCps; // Skip 'cursor' in CPS calculation
      const count = upgrades[upgrade];
      const cpsForUpgrade = baseBuildingCps[upgrade];
      return totalCps + (count * cpsForUpgrade);
  }, 0);
};

export function CookieProvider({ children }) {

	const [state, setState] = useState({
		cookies: 0,
		cps: 0,
		upgrades: {
			cursor: 0,
			grandma: 0,
			farm: 0,
			mine: 0,
			factory: 0,
			bank: 0,
			temple: 0,
			wizardTower: 0,
			shipment: 0,
			alchemyLab: 0,
			portal: 0,
			timeMachine: 0,
			antimatterCondenser: 0,
			prism: 0,
			chancemaker: 0,
			fractalEngine: 0,
			javascriptConsole: 0,
			idleverse: 0,
			cortexBaker: 0,
			you: 0,
		},
	});

	const memoCalculateBuildingCost = useCallback(
		(buildingType, count) => calculateBuildingCost(buildingType, count, baseBuildingCost),
		[]
	);

	const purchaseUpgrade = useCallback(
		(buildingType) => {
			setState((prevState) => {
				const currentCount = prevState.upgrades[buildingType];
				const cost = memoCalculateBuildingCost(buildingType, currentCount);

				if (prevState.cookies >= cost) {
					const newUpgrades = {
						...prevState.upgrades,
						[buildingType]: currentCount + 1,
					};

					return {
						...prevState,
						cookies: prevState.cookies - cost,
						cps: calculateTotalCps(newUpgrades, baseBuildingCps),
						upgrades: newUpgrades,
					};
				}

				return prevState;
			});
		},
		[memoCalculateBuildingCost]
	);

	const contextValue = useMemo(
		() => ({
			...state,
			setCookies: (value) => setState((prevState) => ({ ...prevState, cookies: value })),
			setCps: (value) => setState((prevState) => ({ ...prevState, cps: value })),
			purchaseUpgrade,
		}),
		[state, purchaseUpgrade]
	);

	useEffect(() => {
    const interval = setInterval(() => {
      setState((prevState) => {
        return {
          ...prevState,
          cookies: prevState.cookies + prevState.cps
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.cps]);

	return <CookieContext.Provider value={contextValue}>{children}</CookieContext.Provider>;
}

CookieProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
