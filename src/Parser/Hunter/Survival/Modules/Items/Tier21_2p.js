import React from 'react';

import SPELLS from 'common/SPELLS';
import SpellIcon from 'common/SpellIcon';
import SpellLink from 'common/SpellLink';
import { formatPercentage } from 'common/format';
import Analyzer from 'Parser/Core/Analyzer';
import ItemDamageDone from 'Interface/Others/ItemDamageDone';
import HIT_TYPES from 'Parser/Core/HIT_TYPES';
import calculateEffectiveDamage from 'Parser/Core/calculateEffectiveDamage';

//It's a 100% increase to critical strike damage, which is already a 100% modifier, making it effectively only hit 50% harder than a crit otherwise would.
const T21_2P_CRIT_DMG_BONUS = 0.5;

/**
 * Flanking Strike has a 50% chance to increase the critical strike chance of your next Raptor Strike by 100% and the critical strike damage of Raptor Strike by 100% within the next 20 sec.
 */
class Tier21_2p extends Analyzer {
  bonusDmg = 0;
  applications = 0;
  flankingStrikeCasts = 0;
  totalRaptorStrikes = 0;
  buffedRaptorStrikes = 0;

  constructor(...args) {
    super(...args);
    this.active = this.selectedCombatant.hasBuff(SPELLS.HUNTER_SV_T21_2P_BONUS.id);
  }

  on_byPlayer_cast(event) {
    const spellId = event.ability.guid;
    if (spellId === SPELLS.FLANKING_STRIKE_TALENT.id) {
      this.flankingStrikeCasts += 1;
    }
    if (spellId === SPELLS.RAPTOR_STRIKE.id) {
      this.totalRaptorStrikes += 1;
    }
  }

  on_byPlayer_applybuff(event) {
    const spellId = event.ability.guid;
    if (spellId !== SPELLS.HUNTER_SV_T21_2P_BONUS_BUFF.id) {
      return;
    }
    this.applications++;
  }

  on_byPlayer_damage(event) {
    if (!this.isApplicable(event)) {
      return;
    }
    this.buffedRaptorStrikes++;
    this.bonusDmg += calculateEffectiveDamage(event, T21_2P_CRIT_DMG_BONUS);
  }

  isApplicable(event) {
    const spellId = event.ability.guid;
    if (spellId !== SPELLS.RAPTOR_STRIKE.id) {
      return false;
    }
    if (!this.selectedCombatant.hasBuff(SPELLS.HUNTER_SV_T21_2P_BONUS_BUFF.id, event.timestamp)) {
      return false;
    }
    if (event.hitType !== HIT_TYPES.CRIT && event.hitType !== HIT_TYPES.BLOCKED_CRIT) {
      return false;
    }
    return true;
  }

  item() {
    return {
      id: `spell-${SPELLS.HUNTER_SV_T21_2P_BONUS.id}`,
      icon: <SpellIcon id={SPELLS.HUNTER_SV_T21_2P_BONUS.id} />,
      title: <SpellLink id={SPELLS.HUNTER_SV_T21_2P_BONUS.id} icon={false} />,
      result: (
        <dfn data-tip={`The damage shown here only accounts for the added crit damage, and not what the increased crit chance theoretically contributed with. </br>
          Your utilization of tier 21 2 piece:
        <ul>
          <li> Flanking strike casts: ${this.flankingStrikeCasts}.</li>
          <li> Tier procs:  ${this.applications}.</li>
          <li> Procs in % of casts:  ${formatPercentage(this.applications / this.flankingStrikeCasts)}%</li>
        </ul> `}>
          Buffed raptor strikes: {formatPercentage(this.buffedRaptorStrikes / this.totalRaptorStrikes)}%<br />
          <ItemDamageDone amount={this.bonusDmg} />
        </dfn>
      ),
    };
  }
}

export default Tier21_2p;
