import nunjucks from "nunjucks";

export interface Addon {
    filterCollections: FilterCollection[]
    presets: Preset[]
}

export interface FilterCollection {
    name: string
    filters: Filter[]
}

export interface Filter {
    name: string
    function: (...args: any[]) => any
}

export interface Preset {
    name: string,
    filterCollections: FilterCollection[],
    globals: Global[],
    templatesDir: string,
    tests: Test[]
}

export interface Global {
    name: string
    value: any
}

export interface Test {
    name: string
    function: (first: any, second: any) => boolean
}

const filterCollections: FilterCollection[] = []
const presets: Preset[] = []

async function loadAddon(addonName: string): Promise<void> {
    console.log(`loading addon "${addonName}"`)
    const addon = (await import(require.resolve(addonName, {
        paths: require.main?.paths
    }))).default as Addon
    filterCollections.push(...addon.filterCollections.map(fc => {
        return {
            ...fc,
            name: addonName + ":filter_collection:" + fc.name
        }
    }))
    presets.push(...addon.presets.map(p => {
        return {
            ...p,
            name: addonName + ":preset:" + p.name
        }
    }))
    return
}

export async function activateFilterCollection(filterCollectionName: string, env: nunjucks.Environment) {
    let filterCollection = filterCollections.find(fc => fc.name === filterCollectionName)
    if (!filterCollection) {
        await loadAddon(filterCollectionName.split(":")[0])
        filterCollection = filterCollections.find(fc => fc.name === filterCollectionName)
        if (!filterCollection)
            throw new Error(`Could not find filter collection "${filterCollectionName}"`)
    }
    filterCollection.filters.forEach(f => {
        env.addFilter(f.name, f.function)
    })
}

export async function activatePreset(presetName: string, env: nunjucks.Environment) {
    let preset = presets.find(p => p.name === presetName)
    if (!preset) {
        await loadAddon(presetName.split(":")[0])
        preset = presets.find(p => p.name === presetName)
        if (!preset)
            throw new Error(`Could not find preset "${presetName}`)
    }
    preset.filterCollections.forEach(fc => {
        fc.filters.forEach(f => {
            env.addFilter(f.name, f.function)
        })
    })
    preset.globals.forEach(g => {
        env.addGlobal(g.name, g.value)
    })
    preset.tests.forEach(t => {
        // @ts-ignore this function is available but its typing is not
        env.addTest(t.name, t.function)
    })
    env.addGlobal("templateDir", preset.templatesDir)
}