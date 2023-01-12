import { User } from "../generated/types";

/**
 * This function checks if a user has values for all possible properties.
 * @param user The user to be checked.
 * @returns True if user has values for all possible properties, else false.
 */
 export function isRequiredUser(user?: User): user is Required<User> {
    return (
        user !== undefined &&
        user.username !== undefined &&
        user.password !== undefined &&
        user.roles !== undefined
    )
}