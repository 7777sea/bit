/** @flow */

import { getScopeComponent, addMany } from './api/consumer/index';
import type { AddProps } from './consumer/component-ops/add-components/add-components';
import { scopeList } from './api/scope/index';
// import Extension from './extensions/extension';
import HooksManager from './hooks';
import types from './extensions/types/type-factory';
import Command from './cli/command';
import Extension from './extensions/super-extension';
import type { LifeCycleInterface } from './extensions/hook-interfaces/lifecycle';
import type { AddHookInterface } from './extensions/hook-interfaces/add-command';

export type { LifeCycleInterface, AddHookInterface };

HooksManager.init();

export default {
  show: (scopePath: string, id: string, opts: Object) =>
    getScopeComponent({ scopePath, id, allVersions: opts && opts.versions }).then((c) => {
      if (Array.isArray(c)) {
        return c.map(v => v.toObject());
      }
      return c.toObject();
    }),
  list: (scopePath: string) =>
    scopeList(scopePath).then(listScopeResult => listScopeResult.map(result => result.id.toString())),
  addMany: async (components: AddProps[], alternateCwd?: string) => {
    return addMany(components, alternateCwd);
  },
  types,
  Extension,
  Command
  /**
   * Load extension programmatically
   */
  // loadExtension: async (args: BaseLoadArgsProps): Promise<Extension> => {
  //   const extension = await Extension.load(args);
  //   return Promise.resolve(extension);
  // }
};
