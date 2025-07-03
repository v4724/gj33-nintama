/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Data type for a promotional link
export interface PromoLink {
  href: string;
  text: string;
}

// Data structure for user-submitted promotion data
export interface PromoStall {
  id: string;
  name: string;
  promoUser: string;
  promoAvatar: string;
  promoHTML: string;
  promoLinks: PromoLink[];
}


// Unified data structure for a single stall, combining all sources of info.
// This is the final object used by the application logic.
export interface StallData {
  id: string;
  name: string;
  coords: {
    top: string;
    left: string;
    width: string;
    height: string;
  };
  // Official data from event site
  circleImg?: string;
  circleLink?: string;
  // User-submitted promo data
  promoUser?: string;
  promoAvatar?: string;
  promoHTML?: string;
  promoLinks?: PromoLink[];
}

// Data from official event site master list
export interface DefaultStall {
  id: string;
  num: number;
  desk?: number;
  circleTitle: string;
  circleImg: string;
  links: string;
}

// Data for locating the start of a stall column on the map
export interface LocateStall {
  id: string;
  num: number;
  coords: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
}
