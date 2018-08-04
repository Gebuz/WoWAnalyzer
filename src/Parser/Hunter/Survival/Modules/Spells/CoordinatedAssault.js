import React from 'react';

import Analyzer from 'Parser/Core/Analyzer';

import SPELLS from 'common/SPELLS';
import { formatPercentage } from 'common/format';
import StatisticBox from 'Interface/Others/StatisticBox';
import SpellIcon from 'common/SpellIcon';
import { encodeTargetString } from 'Parser/Core/Modules/EnemyInstances';
import STATISTIC_ORDER from 'Interface/Others/STATISTIC_ORDER';
import SpellLink from 'common/SpellLink';

const BOP_ABILITIES = [
  SPELLS.RAPTOR_STRIKE.id,
  SPELLS.RAPTOR_STRIKE_AOTE.id,
  SPELLS.MONGOOSE_BITE_TALENT_AOTE.id,
  SPELLS.MONGOOSE_BITE_TALENT.id,
  SPELLS.CARVE.id,
  SPELLS.BUTCHERY_TALENT.id,
];
const EXTENSION_PER_CAST = 1500;
const MS_BUFFER = 100;

/**
 * You and your pet attack as one, increasing all damage you both deal by
 * 20% for 20 sec. While Coordinated Assault is active, Kill Command's
 * chance to reset is increased by 25%.
 *
 * Bird of Prey:
 * Attacking your pet's target with Raptor Strike, Mongoose Bite,
 * Carve or Butchery extends the duration of Coordinated Assault by
 * 1.5 sec.
 */

class CoordinatedAssault extends Analyzer {

  petTarget;
  playerTarget;
  coordinatedAssaultExtended = 0;
  wastedExtension = 0;
  timestampAoE = 0;
  targetsHitAoE = [];

  on_byPlayerPet_damage(event) {
    this.petTarget = encodeTargetString(event.targetID, event.targetInstance);
  }

  on_byPlayer_damage(event) {
    const spellId = event.ability.guid;
    if (!BOP_ABILITIES.includes(spellId) || !this.selectedCombatant.hasBuff(SPELLS.COORDINATED_ASSAULT.id)) {
      return;
    }
    this.playerTarget = encodeTargetString(event.targetID, event.targetInstance);
    if (spellId === SPELLS.CARVE.id || spellId === SPELLS.BUTCHERY_TALENT.id) {
      if (this.timestampAoE !== 0 && event.timestamp > this.timestampAoE + MS_BUFFER) {
        if (!this.targetsHitAoE.includes(this.petTarget)) {
          this.wastedExtension += EXTENSION_PER_CAST;
        } else {
          this.coordinatedAssaultExtended += EXTENSION_PER_CAST;
        }
        this.targetsHitAoE = [];
        this.timestampAoE = event.timestamp;
      }
      this.targetsHitAoE.push(this.playerTarget);
      return;
    }
    if (this.playerTarget !== this.petTarget) {
      this.wastedExtension += EXTENSION_PER_CAST;
      return;
    }
    this.coordinatedAssaultExtended += EXTENSION_PER_CAST;
  }

  get timeExtendedInSeconds() {
    return this.coordinatedAssaultExtended / 1000;
  }

  get extensionTimeLostInSeconds() {
    return this.wastedExtension / 1000;
  }

  get percentExtension() {
    return this.coordinatedAssaultExtended / (this.coordinatedAssaultExtended + this.wastedExtension);
  }

  get percentUptime() {
    return this.selectedCombatant.getBuffUptime(SPELLS.COORDINATED_ASSAULT.id) / this.owner.fightDuration;
  }

  get birdPercentEffectiveness() {
    return {
      actual: this.percentExtension,
      isLessThan: {
        minor: 1,
        average: 0.9,
        major: 0.8,
      },
      style: 'percent',
    };
  }

  suggestions(when) {
    if (this.selectedCombatant.hasTalent(SPELLS.BIRDS_OF_PREY_TALENT.id)) {
      when(this.birdPercentEffectiveness).addSuggestion((suggest, actual, recommended) => {
        return suggest(<React.Fragment>When talented into <SpellLink id={SPELLS.BIRDS_OF_PREY_TALENT.id} />, it's important to cast <SpellLink id={SPELLS.RAPTOR_STRIKE.id} />, <SpellLink id={SPELLS.MONGOOSE_BITE_TALENT.id} />, <SpellLink id={SPELLS.CARVE.id} /> or <SpellLink id={SPELLS.BUTCHERY_TALENT.id} /> on the same target as your pet is attacking.</React.Fragment>)
          .icon(SPELLS.BIRDS_OF_PREY_TALENT.icon)
          .actual(`${formatPercentage(actual)}% of abilities extending CA were used on your pets target`)
          .recommended(`${formatPercentage(recommended)}% is recommended`);
      });
    }
  }

  statistic() {
    let tooltipText = `Over the course of the encounter you had Coordinated Assault up for a total of ${(this.selectedCombatant.getBuffUptime(SPELLS.COORDINATED_ASSAULT.id) / 1000).toFixed(1)} seconds which is equivalent to ${formatPercentage(this.percentUptime)}% uptime.`;
    tooltipText += this.selectedCombatant.hasTalent(SPELLS.BIRDS_OF_PREY_TALENT.id) ? `<ul><li>You extended Coordinated Assault by ${this.timeExtendedInSeconds} seconds.</li><li>You lost out on ${this.extensionTimeLostInSeconds} seconds of Coordinated Assault by attacking a different target than your pet.</li></ul>` : ``;
    return (
      <StatisticBox
        icon={<SpellIcon id={SPELLS.COORDINATED_ASSAULT.id} />}
        value={`${formatPercentage(this.percentUptime)}%`}
        label="Coordinated Assault uptime"
        tooltip={tooltipText}
      />
    );
  }
  statisticOrder = STATISTIC_ORDER.CORE(11);
}

export default CoordinatedAssault;
