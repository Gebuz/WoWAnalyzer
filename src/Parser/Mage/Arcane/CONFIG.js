import React from 'react';

import { Sharrq } from 'CONTRIBUTORS';
import SPECS from 'Game/SPECS';
import Warning from 'common/Alert/Warning';

import CHANGELOG from './CHANGELOG';

export default {
  // The people that have contributed to this spec recently. People don't have to sign up to be long-time maintainers to be included in this list. If someone built a large part of the spec or contributed something recently to that spec, they can be added to the contributors list.
  contributors: [Sharrq],
  // The WoW client patch this spec was last updated to be fully compatible with.
  patchCompatibility: '8.0.1',
  // Explain the status of this spec's analysis here. Try to mention how complete it is, and perhaps show links to places users can learn more.
  // If this spec's analysis does not show a complete picture please mention this in the `<Warning>` component.
  description: (
    <React.Fragment>
      Hello Everyone! We are always looking to improve the Arcane Mage Analyzers and Modules; so if you find any issues or if there is something missing that you would like to see added, please open an Issue on GitHub or send a message to Sharrq on Discord (Sharrq#7530) <br /> <br />
	    Additionally, if you need further assistance in improving your gameplay as an Arcane Mage, you can refer to the following resources:<br />
      <a href="https://discord.gg/0gLMHikX2aZ23VdA" target="_blank" rel="noopener noreferrer">Mage Class Discord</a> <br />
      <a href="https://discord.gg/UrczP9U" target="_blank" rel="noopener noreferrer">Arcane Spec Discord</a> <br />
      <a href="https://www.altered-time.com/forum/" target="_blank" rel="noopener noreferrer">Altered Time (Mage Forums/Guides)</a> <br />
      <a href="https://www.icy-veins.com/wow/arcane-mage-pve-dps-guide" target="_blank" rel="noopener noreferrer">Icy Veins (Arcane Mage Guide)</a> <br /><br />

      <Warning>
        This spec's analysis isn't complete yet. What we do show should be good to use, but it does not show the complete picture.<br />
        If there is something missing, incorrect, or inaccurate, please report it on <a href="https://github.com/WoWAnalyzer/WoWAnalyzer/issues/new">GitHub</a> or contact us on <a href="https://discord.gg/AxphPxU">Discord</a>.
      </Warning>
    </React.Fragment>
  ),
  // A recent example report to see interesting parts of the spec. Will be shown on the homepage.
  exampleReport: '/report/hNqbFwd7Mx3G1KnZ/18-Mythic+Antoran+High+Command+-+Kill+(6:51)/30-Jamilkun',

  // Don't change anything below this line;
  // The current spec identifier. This is the only place (in code) that specifies which spec this parser is about.
  spec: SPECS.ARCANE_MAGE,
  // The contents of your changelog.
  changelog: CHANGELOG,
  // The CombatLogParser class for your spec.
  parser: () => import('./CombatLogParser' /* webpackChunkName: "Mage" */).then(exports => exports.default),
  // The path to the current directory (relative form project root). This is used for generating a GitHub link directly to your spec's code.
  path: __dirname,
};
