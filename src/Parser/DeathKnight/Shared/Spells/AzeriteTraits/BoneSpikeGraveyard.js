import React from 'react';

import SPELLS from 'common/SPELLS';
import { formatNumber } from 'common/format';
import Analyzer from 'Parser/Core/Analyzer';
import TraitStatisticBox, { STATISTIC_ORDER } from 'Interface/Others/TraitStatisticBox';
import ItemDamageDone from 'Interface/Others/ItemDamageDone';
import ItemHealingDone from 'Interface/Others/ItemHealingDone';

/**
 * Bone Spike Graveyard
 * Casting DnD (or Defile) impales enemies for x damage and causes y healing
 * Healing and Damage have their own events, no other tracking necessary
 * Shared between Blood and Unholy
 * 
 * Example Report: https://www.warcraftlogs.com/reports/3H7pWyrJDnLB16jT/#fight=19&source=9
 */
class BoneSpikeGraveyard extends Analyzer{

  damage = 0;
  heal = 0;

  constructor(...args) {
    super(...args);
    this.active = this.selectedCombatant.hasTrait(SPELLS.BONE_SPIKE_GRAVEYARD.id);
    if (!this.active) {
      return;
    }
  }

  on_byPlayer_damage(event) {
    if (event.ability.guid !== SPELLS.BONE_SPIKE_GRAVEYARD_DAMAGE.id) {
      return;
    }

    this.damage += event.amount;
  }

  on_byPlayer_heal(event) {
    if (event.ability.guid !== SPELLS.BONE_SPIKE_GRAVEYARD_HEAL.id) {
      return;
    }

    this.heal += event.amount + (event.absorbed || 0);
  }

  statistic(){
    return (
      <TraitStatisticBox
        position={STATISTIC_ORDER.OPTIONAL()}
        trait={SPELLS.BONE_SPIKE_GRAVEYARD.id}
        value={(
          <React.Fragment>
            <ItemDamageDone amount={this.damage} /><br />
            <ItemHealingDone amount={this.heal} />
          </React.Fragment>
        )}
        tooltip={`${SPELLS.BONE_SPIKE_GRAVEYARD.name} did a total of ${formatNumber(this.damage)} damage and ${formatNumber(this.heal)} healing.`}
      />
    );
  }
}

export default BoneSpikeGraveyard; 