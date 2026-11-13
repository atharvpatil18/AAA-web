/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { labAbacusEn, labAbacusHi, labAbacusMr } from "./translations_lab_abacus";
import { labVedicEn, labVedicHi, labVedicMr } from "./translations_lab_vedic";
import { labSpeedEn, labSpeedHi, labSpeedMr } from "./translations_lab_speed";

export const interactiveLabsEn = {
  ...labAbacusEn,
  ...labVedicEn,
  ...labSpeedEn,
};

export const interactiveLabsHi: typeof interactiveLabsEn = {
  ...labAbacusHi,
  ...labVedicHi,
  ...labSpeedHi,
};

export const interactiveLabsMr: typeof interactiveLabsEn = {
  ...labAbacusMr,
  ...labVedicMr,
  ...labSpeedMr,
};
