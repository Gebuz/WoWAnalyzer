import React from 'react';

import Analyzer from 'parser/core/Analyzer';

import SPELLS from 'common/SPELLS';
import ItemDamageDone from 'interface/ItemDamageDone';
import { formatPercentage } from 'common/format';
import Enemies from 'parser/shared/modules/Enemies';
import Statistic from 'interface/statistics/Statistic';
import STATISTIC_ORDER from 'interface/others/STATISTIC_ORDER';
import BoringSpellValueText from 'interface/statistics/components/BoringSpellValueText';
import { DamageEvent } from 'parser/core/Events';

/**
 * Fire a shot that poisons your target, causing them to take (15% of Attack power) Nature damage instantly and an additional (60% of Attack power) Nature damage over 12 sec.
 *
 * Example log: https://www.warcraftlogs.com/reports/P9G8VRYNTn3Xpv21#fight=8&type=damage-done
 */

class SerpentSting extends Analyzer {
  static dependencies = {
    enemies: Enemies,
  };

  protected enemies!: Enemies;

  damage = 0;

  constructor(options: any) {
    super(options);
    this.active = this.selectedCombatant.hasTalent(SPELLS.SERPENT_STING_TALENT.id);
  }

  on_byPlayer_damage(event: DamageEvent) {
    const spellId = event.ability.guid;
    if (spellId !== SPELLS.SERPENT_STING_TALENT.id) {
      return;
    }
    this.damage += event.amount + (event.absorbed || 0);
  }
  get uptimePercentage() {
    return this.enemies.getBuffUptime(SPELLS.SERPENT_STING_TALENT.id) / this.owner.fightDuration;
  }

  statistic() {
    return (
      <Statistic
        position={STATISTIC_ORDER.OPTIONAL(13)}
        size="flexible"
        category={'TALENTS'}
      >
        <BoringSpellValueText spell={SPELLS.SERPENT_STING_TALENT}>
          <>
            <ItemDamageDone amount={this.damage} /><br />
            {formatPercentage(this.uptimePercentage)}% <small>uptime</small>
          </>
        </BoringSpellValueText>
      </Statistic>
    );
  }
}

export default SerpentSting;
