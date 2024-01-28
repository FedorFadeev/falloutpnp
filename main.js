import { falloutpnp } from './module/config.js'
import WeaponSheet from './module/sheets/WeaponSheet.js'
import CustomItemSheet from './module/sheets/CustomItemSheet.js'
// import NPCSheet from './module/sheets/NPCSheet.js'
import CharacterSheet from './module/sheets/CharacterSheet.js'
import EnemySheet from './module/sheets/EnemySheet.js'
import { CustomActor } from './module/documents/actor.js'

async function preloadHandlebarsTemplates() {
  const templatePaths = [
    'systems/falloutpnp/templates/partials/actor/skills.hbs',
    'systems/falloutpnp/templates/partials/actor/bio.hbs',
    'systems/falloutpnp/templates/partials/actor/special.hbs',
    'systems/falloutpnp/templates/partials/actor/secondary.hbs',
    'systems/falloutpnp/templates/partials/actor/status.hbs',
    'systems/falloutpnp/templates/partials/actor/inventory.hbs',
  ]

  return loadTemplates(templatePaths)
}

Hooks.once('init', () => {
  CONFIG.falloutpnp = falloutpnp

  CONFIG.Actor.documentClass = CustomActor

  Items.unregisterSheet('core', ItemSheet)
  Items.registerSheet('falloutpnp', CustomItemSheet, { types: ['custom'], makeDefault: true })
  Items.registerSheet('falloutpnp', WeaponSheet, { types: ['weapon'] })

  Actors.unregisterSheet('core', ActorSheet)
  Actors.registerSheet('falloutpnp', EnemySheet, { types: ['enemy'], makeDefault: true })
  Actors.registerSheet('falloutpnp', CharacterSheet, { types: ['character'], makeDefault: true })
  // Actors.registerSheet("falloutpnp", NPCSheet, { makeDefault: true });

  preloadHandlebarsTemplates()
})

Hooks.on('ready', function () {
  Handlebars.registerHelper('eq', (a, b) => a == b)
  Handlebars.registerHelper('array', (...args) => [...args].slice(0, -1))
})
