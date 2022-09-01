import { config } from '../config'

/**
 * This function builds the url of an experiment using its id.
 * @param experimentId The id of the experiment.
 * @returns The url of the experiment.
 */
export function experimentUrlFromId(experimentId: string): string {
    return (
        config.BASE_URL +
        (config.BASE_URL.endsWith('/') ? '' : '/') +
        'experiments/' +
        experimentId
    )
}
