/*
 * Copyright 2023 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import fs from 'fs';
import { Package } from '@manypkg/get-packages';
import {
  BackstagePackageJson as BackstagePackageJsonActual,
  PackageRole,
} from '@backstage/cli-node';
import { promisify } from 'util';

export const readFile = promisify(fs.readFile);
export const writeFile = promisify(fs.writeFile);

export type BackstagePackageJson = BackstagePackageJsonActual & {
  description?: string;
  backstage: {
    role: PackageRole;
  };
};

export function isBackstagePackage(
  packageJson: Package['packageJson'],
): packageJson is BackstagePackageJson {
  return (
    packageJson &&
    packageJson.hasOwnProperty('backstage') &&
    (packageJson as any)?.backstage?.role !== 'undefined'
  );
}
