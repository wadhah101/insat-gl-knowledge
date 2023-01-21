import { Contributor } from "@site/data/Contributors.interface";

import data from "./contributors.json";
import blacklist from "./contributors.blacklisted.json";

/**
 * This is just a file for dev purposes, the real contributor list gets generated within the deployment pipeline
 */
export const CONTRIBUTORS: Contributor[] = data;

export const BLACKLISTED_CONTRIBUTORS: string[] = blacklist;
