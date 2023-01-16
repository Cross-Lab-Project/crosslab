import { exit } from "process";

/**
 * This function capitalizes the first letter of a string.
 * @param string The string in which to capitalize the first letter.
 * @returns The string with its first letter capitalized.
 */
export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function die(reason: string): string {
    console.error(reason)
    exit(1)
}