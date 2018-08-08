import CoreCombatLogParser from 'Parser/Core/CombatLogParser';

import DamageDone from 'Parser/Core/Modules/DamageDone';

import RakeBleed from './Modules/Normalizers/RakeBleed';
import ComboPointsFromAoE from './Modules/Normalizers/ComboPointsFromAoE';

import Abilities from './Modules/Abilities';
import AlwaysBeCasting from './Modules/Features/AlwaysBeCasting';
import CooldownThroughputTracker from './Modules/Features/CooldownThroughputTracker';
import SpellUsable from './Modules/Features/SpellUsable';
import EnergyCapTracker from './Modules/Features/EnergyCapTracker';
import Checklist from './Modules/Features/Checklist/Module';

import RakeUptime from './Modules/Bleeds/RakeUptime';
import RipUptime from './Modules/Bleeds/RipUptime';
import FerociousBiteEnergy from './Modules/Spells/FerociousBiteEnergy';
import RakeSnapshot from './Modules/Bleeds/RakeSnapshot';
import RipSnapshot from './Modules/Bleeds/RipSnapshot';

import ComboPointTracker from './Modules/ComboPoints/ComboPointTracker';
import ComboPointDetails from './Modules/ComboPoints/ComboPointDetails';

import SavageRoarUptime from './Modules/Talents/SavageRoarUptime';
import MoonfireUptime from './Modules/Talents/MoonfireUptime';
import SavageRoarDmg from './Modules/Talents/SavageRoarDmg';
import MoonfireSnapshot from './Modules/Talents/MoonfireSnapshot';
import Predator from './Modules/Talents/Predator';
import Bloodtalons from './Modules/Talents/Bloodtalons';
import BrutalSlashHitCount from './Modules/Talents/BrutalSlashHitCount';

import PredatorySwiftness from './Modules/Spells/PredatorySwiftness';
import ThrashHitCount from './Modules/Spells/ThrashHitCount';
import SwipeHitCount from './Modules/Spells/SwipeHitCount';

import SoulOfTheArchdruid from '../Shared/Modules/Items/SoulOfTheArchdruid';

class CombatLogParser extends CoreCombatLogParser {
  static specModules = {
    // Normalizers
    rakeBleed: RakeBleed,
    comboPointsFromAoE: ComboPointsFromAoE,

    // FeralCore
    damageDone: [DamageDone, { showStatistic: true }],

    // Features
    alwaysBeCasting: AlwaysBeCasting,
    abilities: Abilities,
    cooldownThroughputTracker: CooldownThroughputTracker,
    ferociousBiteEnergy: FerociousBiteEnergy,
    spellUsable: SpellUsable,
    energyCapTracker: EnergyCapTracker,
    checklist: Checklist,

    // bleeds
    rakeUptime: RakeUptime,
    ripUptime: RipUptime,
    rakeSnapshot: RakeSnapshot,
    ripSnapshot: RipSnapshot,
    moonfireSnapshot: MoonfireSnapshot,

    // spells
    predatorySwiftness: PredatorySwiftness,
    thrashHitCount: ThrashHitCount,
    swipeHitCount: SwipeHitCount,

    // talents
    savageRoarUptime: SavageRoarUptime,
    moonfireUptime: MoonfireUptime,
    savageRoarDmg: SavageRoarDmg,
    predator: Predator,
    bloodtalons: Bloodtalons,
    brutalSlashHitCount: BrutalSlashHitCount,

    // resources
    comboPointTracker: ComboPointTracker,
    comboPointDetails: ComboPointDetails,

    // items
    soulOfTheArchdruid : SoulOfTheArchdruid,
  };
}

export default CombatLogParser;
