import nunjucks from 'nunjucks';
import path from 'path';

/**
 * Interface for an addon.
 */
export interface Addon {
  /**
   * Filter collections provided by the addon.
   */
  filterCollections: FilterCollection[];
  /**
   * Presets provided by the addon.
   */
  presets: Preset[];
}

/**
 * Interface for a filter collection.
 */
export interface FilterCollection {
  /**
   * Name of the filter collection.
   */
  name: string;
  /**
   * Filters included in the filter collection.
   */
  filters: Filter[];
}

/**
 * Interface for a filter.
 */
export interface Filter {
  /**
   * Name of the filter
   */
  name: string;
  /**
   * Function executed by the filter.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function: (...args: any[]) => any;
}

/**
 * Interface for a preset.
 */
export interface Preset {
  /**
   * Name of the preset.
   */
  name: string;
  /**
   * Filter collections used by the preset.
   */
  filterCollections: FilterCollection[];
  /**
   * Globals provided by the preset.
   */
  globals: Global[];
  /**
   * Path to the directory of the templates used by the preset.
   */
  templatesDir: string;
  /**
   * Tests provided by the preset.
   */
  tests: Test[];
}

/**
 * Interface for a global.
 */
export interface Global {
  /**
   * Name of the global.
   */
  name: string;
  /**
   * Value of the global.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
}

/**
 * Interface for a test.
 */
export interface Test {
  /**
   * Name of the test.
   */
  name: string;
  /**
   * Function executed by the test.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function: (first: any, second: any) => boolean;
}

const filterCollections: FilterCollection[] = [];
const presets: Preset[] = [];

/**
 * This function loads an addon by its name.
 * @param addonName The name of the addon to be loaded.
 */
async function loadAddon(addonName: string): Promise<void> {
  console.log(`loading addon "${addonName}"`);
  const resolve_paths = require.main?.paths ?? [];
  let cwd_path = process.cwd();
  while (cwd_path !== '/') {
    resolve_paths.push(cwd_path + '/node_modules');
    cwd_path = path.dirname(cwd_path);
  }
  const addon_path = require.resolve(addonName, {
    paths: require.main?.paths,
  });
  console.log(`addon path: ${addon_path}`);
  const addon = (await import(addon_path)).default as Addon;
  filterCollections.push(
    ...addon.filterCollections.map(fc => {
      return {
        ...fc,
        name: addonName + ':filter_collection:' + fc.name,
      };
    }),
  );
  presets.push(
    ...addon.presets.map(p => {
      return {
        ...p,
        name: addonName + ':preset:' + p.name,
      };
    }),
  );
  return;
}

/**
 * This function activates a filter collection by its name.
 * @param filterCollectionName The name of the filter collection to be activated.
 * @param env The nunjucks environment into which the filters should be loaded.
 */
export async function activateFilterCollection(
  filterCollectionName: string,
  env: nunjucks.Environment,
) {
  let filterCollection = filterCollections.find(fc => fc.name === filterCollectionName);
  if (!filterCollection) {
    await loadAddon(filterCollectionName.split(':')[0]);
    filterCollection = filterCollections.find(fc => fc.name === filterCollectionName);
    if (!filterCollection)
      throw new Error(`Could not find filter collection "${filterCollectionName}"`);
  }
  filterCollection.filters.forEach(f => {
    env.addFilter(f.name, f.function);
  });
}

/**
 * This function returns a preset by its name.
 * @param presetName The name of the Preset.
 */
export async function loadPreset(presetName: string) {
  let preset = presets.find(p => p.name === presetName);
  if (!preset) {
    await loadAddon(presetName.split(':')[0]);
    preset = presets.find(p => p.name === presetName);
    if (!preset) throw new Error(`Could not find preset "${presetName}`);
  }
  return preset;
}

/**
 * This function activates a preset.
 * @param preset The Preset to be activated.
 * @param env The nunjucks environment the filters, tests and globals of the preset
 * should be loaded into.
 */
export async function activatePreset(preset: Preset, env: nunjucks.Environment) {
  preset.filterCollections.forEach(fc => {
    fc.filters.forEach(f => {
      env.addFilter(f.name, f.function);
    });
  });
  preset.globals.forEach(g => {
    env.addGlobal(g.name, g.value);
  });
  preset.tests.forEach(t => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (env as any).addTest(t.name, t.function);
  });
  env.addGlobal('templateDir', preset.templatesDir);
}
