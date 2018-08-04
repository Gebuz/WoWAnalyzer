import React from 'react';
import Analyzer from 'Parser/Core/Analyzer';
import ExpandableStatisticBox from 'Interface/Others/ExpandableStatisticBox';
import { STATISTIC_ORDER } from 'Interface/Others/StatisticBox';

import SPELLS from 'common/SPELLS/index';
import SpellIcon from 'common/SpellIcon';
import SpellLink from 'common/SpellLink';

import { formatPercentage } from 'common/format';

const MS_BUFFER = 100;

class SpiritBombSoulConsume extends Analyzer {

  /* Feed The Demon talent is taken in defensive builds. In those cases you want to generate and consume souls as quickly
   as possible. So how you consume your souls down matter. If you dont take that talent your taking a more balanced
   build meaning you want to consume souls in a way that boosts your dps. That means feeding the souls into spirit
   bomb as efficiently as possible (cast at 4+ souls) for a dps boost and have soul cleave absorb souls as little as
   possible since it provides no extra dps.
*/
  constructor(...args) {
    super(...args);
    this.active = this.selectedCombatant.hasTalent(SPELLS.SPIRIT_BOMB_TALENT.id) && !this.selectedCombatant.hasTalent(SPELLS.FEED_THE_DEMON_TALENT.id);
  }

  castTimestamp = 0;
  castSoulsConsumed = 0;
  cast = 0;

  soulsConsumedByAmount = Array.from({length: 6}, x => 0);

  on_byPlayer_cast(event) {
    const spellId = event.ability.guid;
    if (spellId !== SPELLS.SPIRIT_BOMB_TALENT.id) {
      return;
    }
    if(this.cast > 0) {
      this.countHits();
    }
    this.castTimestamp = event.timestamp;
    this.cast += 1;
  }

  on_byPlayer_removebuffstack(event) {
    const spellId = event.ability.guid;
    if (spellId !== SPELLS.SOUL_FRAGMENT_STACK.id) {
      return;
    }
    if (event.timestamp - this.castTimestamp < MS_BUFFER) {
      this.castSoulsConsumed += 1;
    }
  }

  on_byPlayer_removebuff(event) {
    const spellId = event.ability.guid;
    if (spellId !== SPELLS.SOUL_FRAGMENT_STACK.id) {
      return;
    }
    if (event.timestamp - this.castTimestamp < MS_BUFFER) {
      this.castSoulsConsumed += 1;
    }
  }

  countHits() {
    if (!this.soulsConsumedByAmount[this.castSoulsConsumed]) {
      this.soulsConsumedByAmount[this.castSoulsConsumed] = 1;
      this.castSoulsConsumed = 0;
      return;
    }
    this.soulsConsumedByAmount[this.castSoulsConsumed] += 1;
    this.castSoulsConsumed = 0;
  }

  on_finished() {
    this.countHits();
  }

  suggestions(when) {
    const totalGoodCasts = this.soulsConsumedByAmount[4] + this.soulsConsumedByAmount[5];
    const totalCasts = Object.values(this.soulsConsumedByAmount).reduce((a, b) => a+b, 0);
    const percentGoodCasts = totalGoodCasts / totalCasts;

    when(percentGoodCasts).isLessThan(0.90)
      .addSuggestion((suggest, actual, recommended) => {
        return suggest(<React.Fragment>Try to cast <SpellLink id={SPELLS.SPIRIT_BOMB_TALENT.id} /> at 4 or 5 souls. </React.Fragment>)
          .icon(SPELLS.SPIRIT_BOMB_TALENT.icon)
          .actual(`${formatPercentage(percentGoodCasts)}% of casts at 4+ souls.`)
          .recommended(`>${formatPercentage(recommended)}% is recommended`)
          .regular(recommended - 0.05)
          .major(recommended - 0.15);
      });
  }

  statistic() {
    const totalGoodCasts = this.soulsConsumedByAmount[4] + this.soulsConsumedByAmount[5];
    const totalCasts = Object.values(this.soulsConsumedByAmount).reduce((a, b) => a+b, 0);
    const percentGoodCasts = totalGoodCasts / totalCasts;

    return (
      <ExpandableStatisticBox
        icon={<SpellIcon id={SPELLS.SPIRIT_BOMB_TALENT.id} />}
        value={`${formatPercentage(percentGoodCasts)} %`}
        label="Good Spirit Bomb casts"
      >
        <table className="table table-condensed">
          <thead>
            <tr>
              <th>Stacks</th>
              <th>Casts</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(this.soulsConsumedByAmount).map((castAmount, stackAmount) => (
              <tr key={stackAmount}>
                <th>{stackAmount}</th>
                <td>{castAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ExpandableStatisticBox>
    );
  }
  statisticOrder = STATISTIC_ORDER.CORE(6);

}

export default SpiritBombSoulConsume;
