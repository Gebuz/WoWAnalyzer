import React from 'react';

import ITEMS from 'common/ITEMS';
import SPELLS from 'common/SPELLS';

import Analyzer from 'Parser/Core/Analyzer';
import RESOURCE_TYPES from 'Game/RESOURCE_TYPES';
import SpellLink from 'common/SpellLink';

class DenialOfHalfGiants extends Analyzer {
  durationPerCp = 0.2;
  totalValue = 0;

  constructor(...args) {
    super(...args);
    this.active = this.selectedCombatant.hasWrists(ITEMS.DENIAL_OF_THE_HALF_GIANTS.id);
  }

  on_byPlayer_spendresource(event) {
    if (event.resourceChangeType !== RESOURCE_TYPES.COMBO_POINTS.id) return;
    if (!this.selectedCombatant.hasBuff(SPELLS.SHADOW_BLADES.id)) return;

    const spent = event.resourceChange;

    this.totalValue += spent * this.durationPerCp;
  }

  item() {
    return {
      item: ITEMS.DENIAL_OF_THE_HALF_GIANTS,
      result: <React.Fragment>{this.totalValue.toFixed(1)} seconds added to <SpellLink id={SPELLS.SHADOW_BLADES.id} />.</React.Fragment>,
    };
  }
}

export default DenialOfHalfGiants;
