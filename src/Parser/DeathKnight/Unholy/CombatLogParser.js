import CoreCombatLogParser from 'Parser/Core/CombatLogParser';
import DamageDone from 'Parser/Core/Modules/DamageDone';

import ColdHeart from 'Parser/DeathKnight/Shared/Items/ColdHeart';
import TaktheritrixsShoulderpads from './Modules/Items/TaktheritrixsShoulderpads';
import Tier20_2p from './Modules/Items/Tier20_2p';
import ColdHeartEfficiency from './Modules/Items/ColdHeartEfficiency';
import Tier21_2p from './Modules/Items/Tier21_2p';
import Tier21_4p from './Modules/Items/Tier21_4p';

import Abilities from './Modules/Features/Abilities';
import AlwaysBeCasting from './Modules/Features/AlwaysBeCasting';
import CooldownThroughputTracker from './Modules/Features/CooldownThroughputTracker';
import VirulentPlagueUptime from './Modules/Features/VirulentPlagueUptime';
import FesteringStrike from './Modules/Features/FesteringStrike';
import Checklist from './Modules/Features/Checklist';
import ScourgeStrikeEfficiency from './Modules/Features/ScourgeStrikeEfficiency';
import ClawingShadowsEfficiency from './Modules/Features/ClawingShadowsEfficiency';
import Apocalypse from './Modules/Features/Apocalypse';
import DarkTransformationAndWounds from './Modules/Features/DarkTransformationAndWounds';
import VirulentPlagueEfficiency from './Modules/Features/VirulentPlagueEfficiency';


import RunicPowerDetails from './Modules/RunicPower/RunicPowerDetails';
import RunicPowerTracker from './Modules/RunicPower/RunicPowerTracker';

import UnholyFrenzy from './Modules/Talents/UnholyFrenzy';

import RuneTracker from './Modules/Features/RuneTracker';
import RuneDetails from '../Shared/RuneDetails';

//Azerite Traits
import BoneSpikeGraveyard from '../Shared/Spells/AzeriteTraits/BoneSpikeGraveyard';

class CombatLogParser extends CoreCombatLogParser {
  static specModules = {
    // Core
    damageDone: [DamageDone, { showStatistic: true }],

    // Features
    abilities: Abilities,
    alwaysBeCasting: AlwaysBeCasting,
    cooldownThroughputTracker: CooldownThroughputTracker,
    virulentPlagueUptime: VirulentPlagueUptime, 
    festeringStrike: FesteringStrike,
    checklist: Checklist,
    scourgeStrikeEfficiency: ScourgeStrikeEfficiency,
    clawingShadowsEfficiency: ClawingShadowsEfficiency,
  	apocalypse: Apocalypse,
	  darkTransformationAndWounds: DarkTransformationAndWounds,
	  virulentPlagueEfficiency: VirulentPlagueEfficiency,

    // RunicPower
    runicPowerTracker: RunicPowerTracker,
    runicPowerDetails: RunicPowerDetails,

    // talents
    unholyFrenzy: UnholyFrenzy,

    // items
    coldHeart: ColdHeart,
    taktheritrixsShoulderpads: TaktheritrixsShoulderpads,
    tier20_2p: Tier20_2p,
    coldHeartEfficiency: ColdHeartEfficiency,
    tier21_2p: Tier21_2p,
    tier21_4p: Tier21_4p,

    //RuneTracker
    runeTracker: RuneTracker,
    runeDetails: RuneDetails,

    //AzeriteTraits
    boneSpikeGraveyard: BoneSpikeGraveyard,
  };
}

export default CombatLogParser;
	
