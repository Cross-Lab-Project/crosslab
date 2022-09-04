import { fail } from "assert"

export interface CompareOptions<_T> {
    [k: string]: any
}

export function isCompareOption<T>(object: boolean | CompareOptions<T> | undefined): object is CompareOptions<T> {
    return object != undefined && typeof object != "boolean"
}

export function updateCompareOptions<P,T extends CompareOptions<P>>(defaultOptions: T, options?: Partial<T> | boolean): T {
    const compareOptions = defaultOptions

    if (options != undefined) {
        if (typeof options == "boolean") {
            for (const key in compareOptions) {
                const defOption = compareOptions[key]
                if (defOption == undefined) {
                    fail("undefined value in default options for key: " + key)
                } if (!isCompareOption(defOption)) {
                    (compareOptions[key] as boolean) = options
                } else {
                    compareOptions[key] = updateCompareOptions(defOption, options)
                }
            }
        } else {
            for (const key in options) {
                const defOption = compareOptions[key]
                const setOption = options[key]
                if (setOption != undefined) {
                    if (typeof setOption == "boolean") {
                        if (defOption == undefined) {
                            fail("undefined value in default options for key: " + key)
                        } else {
                            (compareOptions[key] as boolean) = setOption
                        }
                    } else {
                        if (!isCompareOption(defOption) || !isCompareOption(setOption)) fail("types not matching for key: " + key)
                        compareOptions[key] = updateCompareOptions(defOption, setOption)
                    }
                }
            }
        }
    }

    return compareOptions
}