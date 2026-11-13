/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { hubEn, hubHi, hubMr } from "./translations_parent_guides_hub";
import { g1En, g1Hi, g1Mr } from "./translations_guide_abacus_vedic";
import { g2En, g2Hi, g2Mr } from "./translations_guide_school_confuse";
import { g3En, g3Hi, g3Mr } from "./translations_guide_finger_counting";
import { g4En, g4Hi, g4Mr } from "./translations_guide_silly_mistakes";
import { g5En, g5Hi, g5Mr } from "./translations_guide_ideal_age";

export const parentGuidesEn = {
  ...hubEn,
  ...g1En,
  ...g2En,
  ...g3En,
  ...g4En,
  ...g5En,
};

export const parentGuidesHi: { [K in keyof typeof parentGuidesEn]: string } = {
  ...hubHi,
  ...g1Hi,
  ...g2Hi,
  ...g3Hi,
  ...g4Hi,
  ...g5Hi,
};

export const parentGuidesMr: { [K in keyof typeof parentGuidesEn]: string } = {
  ...hubMr,
  ...g1Mr,
  ...g2Mr,
  ...g3Mr,
  ...g4Mr,
  ...g5Mr,
};
