import React from 'react';

import { Putro } from 'CONTRIBUTORS';
import SpellLink from 'common/SpellLink';
import SPELLS from 'common/SPELLS';
import ITEMS from 'common/ITEMS';
import ItemLink from 'common/ItemLink';

export default [
  {
    date: new Date('2018-07-30'),
    changes: <React.Fragment>Updates GCD for <SpellLink id={SPELLS.HARPOON.id} /> and updates cast efficiency for a few spells. Adds a <SpellLink id={SPELLS.BIRDS_OF_PREY_TALENT.id} /> module into the tooltip for <SpellLink id={SPELLS.COORDINATED_ASSAULT.id} />.</React.Fragment>,
    contributors: [Putro],
  },
  {
    date: new Date('2018-07-30'),
    changes: <React.Fragment>Adds average targets hit for <SpellLink id={SPELLS.CHAKRAMS_TALENT.id} />, <SpellLink id={SPELLS.WILDFIRE_BOMB.id} />, <SpellLink id={SPELLS.BUTCHERY_TALENT.id} /> and <SpellLink id={SPELLS.CARVE.id} />.</React.Fragment>,
    contributors: [Putro],
  },
  {
    date: new Date('2018-07-30'),
    changes: <React.Fragment>Adds <SpellLink id={SPELLS.STEEL_TRAP_TALENT.id} /> to Traits and Talents list, and adds a check/suggestion whether casting <SpellLink id={SPELLS.WILDFIRE_BOMB.id} /> was the right choice for the player.</React.Fragment>,
    contributors: [Putro],
  },
  {
    date: new Date('2018-07-30'),
    changes: <React.Fragment>Adds two modules for <SpellLink id={SPELLS.MONGOOSE_BITE_TALENT.id} /> to track its efficiency, and also checks for <SpellLink id={SPELLS.SERPENT_STING_SV.id} /> casts without <SpellLink id={SPELLS.VIPERS_VENOM_TALENT.id} /> buff up during <SpellLink id={SPELLS.MONGOOSE_FURY.id} />.</React.Fragment>,
    contributors: [Putro],
  },
  {
    date: new Date('2018-07-24'),
    changes: <React.Fragment>Implements better <SpellLink id={SPELLS.SERPENT_STING_SV.id} /> handling, aswell as <SpellLink id={SPELLS.VIPERS_VENOM_TALENT.id} /> support. </React.Fragment>,
    contributors: [Putro],
  },
  {
    date: new Date('2018-07-23'),
    changes: 'Survival analyzer updated to be 8.0.1 compatible',
    contributors: [Putro],
  },
  {
    date: new Date('2018-04-22'),
    changes: <React.Fragment>Implements the checklist for Survival. Fixes a display bug with <SpellLink id={SPELLS.ASPECT_OF_THE_EAGLE.id} />.</React.Fragment>,
    contributors: [Putro],
  },
  {
    date: new Date('2018-04-10'),
    changes: <React.Fragment>Adds a <SpellLink id={SPELLS.ASPECT_OF_THE_EAGLE.id} /> module to provide suggestions with poor usage, and also updates Way of the Mok'Nathal module to be more accurate when displaying refreshes.</React.Fragment>,
    contributors: [Putro],
  },
  {
    date: new Date('2018-04-05'),
    changes: <React.Fragment>Added tracking for <SpellLink id={SPELLS.ON_THE_TRAIL_DAMAGE.id} icon /> and Lacerate to help identify when you're casting this too much. Added additional refreshing information into Way of the Mok'Nathal module, aswell as average time remaining on <SpellLink id={SPELLS.MONGOOSE_FURY.id} icon /> upon using <SpellLink id={SPELLS.FURY_OF_THE_EAGLE_TRAIT.id} icon /> and other minor behind the scenes updates. </React.Fragment>,
    contributors: [Putro],
  },
  {
    date: new Date('2018-02-20'),
    changes: <React.Fragment>Spring cleaning in many modules. Added icons to Focus Usage modules and elsewhere around the analyzer and added support for Caltrops.</React.Fragment>,
    contributors: [Putro],
  },
  {
    date: new Date('2018-02-14'),
    changes: <React.Fragment>Added a module for <SpellLink id={SPELLS.FURY_OF_THE_EAGLE_TRAIT.id} />.</React.Fragment>,
    contributors: [Putro],
  },
  {
    date: new Date('2018-02-12'),
    changes: <React.Fragment>Added modules for Mortal Wounds and merged <SpellLink id={SPELLS.CARVE.id} /> and <SpellLink id={SPELLS.BUTCHERY_TALENT.id} />.</React.Fragment>,
    contributors: [Putro],
  },
  {
    date: new Date('2018-02-12'),
    changes: <React.Fragment>Added support for the most prominent traits into the listbox <SpellLink id={SPELLS.ASPECT_OF_THE_SKYLORD_TRAIT.id} />, <SpellLink id={SPELLS.EAGLES_BITE_TRAIT.id} />, <SpellLink id={SPELLS.ECHOES_OF_OHNARA_TRAIT.id} />, <SpellLink id={SPELLS.TALON_BOND_TRAIT.id} />, <SpellLink id={SPELLS.TALON_STRIKE_TRAIT.id} />. </React.Fragment>,
    contributors: [Putro],
  },
  {
    date: new Date('2018-02-11'),
    changes: <React.Fragment>Added support for <SpellLink id={SPELLS.ASPECT_OF_THE_BEAST_TALENT.id} />, <SpellLink id={SPELLS.SERPENT_STING_TALENT.id} />, A Murder of Crows, Dragonsfire Grenade, Throwing Axes into the Talents/Trait listbox.</React.Fragment>,
    contributors: [Putro],
  },
  {
    date: new Date('2018-02-11'),
    changes: <React.Fragment>Added a preliminary Talents and Traits list which will include damage information about various talents and traits as they get implemented. Implemented modules for <SpellLink id={SPELLS.STEEL_TRAP_TALENT.id} />, Explosive Trap, Caltrops and added prepull handling for all three. </React.Fragment>,
    contributors: [Putro],
  },
  {
    date: new Date('2018-02-05'),
    changes: <React.Fragment>Added additional information to the <ItemLink id={ITEMS.CALL_OF_THE_WILD.id} /> module, to show cooldown reduction on the various affected spells. </React.Fragment>,
    contributors: [Putro],
  },
  {
    date: new Date('2018-02-02'),
    changes: <React.Fragment>Added a module for tracking <SpellLink id={SPELLS.SPITTING_COBRA_TALENT.id} />, and ensure cast efficiency works properly for the talent even if precast. </React.Fragment>,
    contributors: [Putro],
  },
  {
    date: new Date('2018-02-02'),
    changes: <React.Fragment>Added support for <ItemLink id={ITEMS.BUTCHERS_BONE_APRON.id} />, <ItemLink id={ITEMS.FRIZZOS_FINGERTRAP.id} />, <ItemLink id={ITEMS.HELBRINE_ROPE_OF_THE_MIST_MARAUDER.id} />, <ItemLink id={ITEMS.NESINGWARYS_TRAPPING_TREADS.id} />, <ItemLink id={ITEMS.UNSEEN_PREDATORS_CLOAK.id} />.</React.Fragment>,
    contributors: [Putro],
  },
  {
    date: new Date('2018-01-31'),
    changes: <React.Fragment>Added a module for tracking Way of the Mok'Nathal. </React.Fragment>,
    contributors: [Putro],
  },
  {
    date: new Date('2018-01-30'),
    changes: <React.Fragment>Added two statistic modules for <SpellLink id={SPELLS.MONGOOSE_FURY.id} /></React.Fragment>,
    contributors: [Putro],
  },
  {
    date: new Date('2018-01-30'),
    changes: 'Added a focus usage chart to track what you\'re spending your focus on',
    contributors: [Putro],
  },
  {
    date: new Date('2018-01-18'),
    changes: <React.Fragment>Added support for <SpellLink id={SPELLS.HUNTER_SV_T20_2P_BONUS.id} />, <SpellLink id={SPELLS.HUNTER_SV_T20_4P_BONUS.id} />, <SpellLink id={SPELLS.HUNTER_SV_T21_2P_BONUS.id} />, <SpellLink id={SPELLS.HUNTER_SV_T21_4P_BONUS.id} />.</React.Fragment>,
    contributors: [Putro],
  },
  {
    date: new Date('2018-01-17'),
    changes: 'Initial support of survival.',
    contributors: [Putro],
  },
];
