import React from 'react';

import SPELLS from 'common/SPELLS';
import SpellIcon from 'common/SpellIcon';
import RACES from 'Game/RACES';
import Analyzer from 'Parser/Core/Analyzer';
import HIT_TYPES from 'Parser/Core/HIT_TYPES';
import CritEffectBonus from 'Parser/Core/Modules/Helpers/CritEffectBonus';
import StatisticBox from 'Interface/Others/StatisticBox';
import ItemDamageDone from 'Interface/Others/ItemDamageDone';
import ItemHealingDone from 'Interface/Others/ItemHealingDone';
import ROLES from 'Game/ROLES';

export const CRIT_EFFECT = 0.02;

class MightOfTheMountain extends Analyzer {
  static dependencies = {
    critEffectBonus: CritEffectBonus,
  };

  damage = 0;
  healing = 0;

  constructor(...args) {
    super(...args);
    this.active = this.selectedCombatant.race && this.selectedCombatant.race === RACES.Dwarf;
    if (!this.active) {
      return;
    }

    this.critEffectBonus.hook(this.getCritEffectBonus.bind(this));
  }

  isApplicableHeal(event) {
    const abilities = this.owner.constructor.abilitiesAffectedByHealingIncreases;
    if (abilities.length > 0 && !abilities.includes(event.ability.guid)) {
      // When this isn't configured, assume everything is affected
      return false;
    }
    if (event.hitType !== HIT_TYPES.CRIT) {
      return false;
    }
    return true;
  }
  isApplicableDamage(event) {
    const abilities = this.owner.constructor.abilitiesAffectedByDamageIncreases;
    if (abilities.length > 0 && !abilities.includes(event.ability.guid)) {
      // When this isn't configured, assume everything is affected
      return false;
    }
    if (event.hitType !== HIT_TYPES.CRIT) {
      return false;
    }
    if (event.targetIsFriendly) {
      // Friendly fire does not get increased
      return false;
    }
    return true;
  }

  getCritEffectBonus(critEffectModifier, event) {
    if (!this.isApplicableHeal(event)) {
      return critEffectModifier;
    }

    return critEffectModifier + CRIT_EFFECT;
  }

  on_byPlayer_heal(event) {
    if (!this.isApplicableHeal(event)) {
      return;
    }

    const amount = event.amount;
    const absorbed = event.absorbed || 0;
    const overheal = event.overheal || 0;
    const raw = amount + absorbed + overheal;
    const rawNormalPart = raw / this.critEffectBonus.getBonus(event);
    const rawContribution = rawNormalPart * CRIT_EFFECT;

    const effectiveHealing = Math.max(0, rawContribution - overheal);

    this.healing += effectiveHealing;
  }
  on_byPlayer_damage(event) {
    if (!this.isApplicableDamage(event)) {
      return;
    }

    const amount = event.amount;
    const absorbed = event.absorbed || 0;
    const raw = amount + absorbed;
    const rawNormalPart = raw / this.critEffectBonus.getBonus(event);
    const rawContribution = rawNormalPart * CRIT_EFFECT;

    this.damage += rawContribution;
  }

  statistic() {
    let value;
    switch (this.selectedCombatant.spec.role) {
      case ROLES.HEALER:
        value = <ItemHealingDone amount={this.healing} />;
        break;
      case ROLES.DPS:
        value = <ItemDamageDone amount={this.damage} />;
        break;
      default:
        value = (
          <React.Fragment>
            <ItemHealingDone amount={this.healing} /><br />
            <ItemDamageDone amount={this.damage} />
          </React.Fragment>
        );
        break;
    }

    return (
      <StatisticBox
        icon={<SpellIcon id={SPELLS.MIGHT_OF_THE_MOUNTAIN.id} />}
        value={value}
        label="Racial contribution"
        tooltip={`The racial contributed ${this.owner.formatItemDamageDone(this.damage)} and ${this.owner.formatItemHealingDone(this.healing)}.`}
      />
    );
  }
}

export default MightOfTheMountain;
