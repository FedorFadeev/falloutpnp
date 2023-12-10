import { falloutpnp } from './module/config.js'
import WeaponSheet from './module/sheets/WeaponSheet.js'
// import NPCSheet from './module/sheets/NPCSheet.js'
import CharacterSheet from './module/sheets/CharacterSheet.js'
import EnemySheet from './module/sheets/EnemySheet.js'
import { CustomActor } from './module/documents/actor.js'

async function preloadHandlebarsTemplates() {
  const templatePaths = [
    'systems/falloutpnp/templates/partials/weapon-card.hbs',
    'systems/falloutpnp/templates/partials/actor/skills.hbs',
    'systems/falloutpnp/templates/partials/actor/bio.hbs',
    'systems/falloutpnp/templates/partials/actor/special.hbs',
    'systems/falloutpnp/templates/partials/actor/secondary.hbs',
    'systems/falloutpnp/templates/partials/actor/status.hbs',
  ]

  return loadTemplates(templatePaths)
}

Hooks.once('init', () => {
  console.log('Loaded')

  CONFIG.falloutpnp = falloutpnp

  CONFIG.Actor.documentClass = CustomActor

  Items.unregisterSheet('core', ItemSheet)
  Items.registerSheet('falloutpnp', WeaponSheet, { makeDefault: true })

  // Actors.unregisterSheet("core", ActorSheet);
  // Actors.registerSheet("falloutpnp", NPCSheet, { makeDefault: true });

  Actors.unregisterSheet('core', ActorSheet)
  Actors.registerSheet('falloutpnp', EnemySheet, { types: ["enemy"], makeDefault: true })
  Actors.registerSheet('falloutpnp', CharacterSheet, { types: ["character"], makeDefault: true })

  preloadHandlebarsTemplates()
})
