import { RACES } from './constants/races.js'
import { ATTACK_TYPES } from './constants/attackTypes.js'
import { WEAPON_CONDITIONS } from './constants/weaponConditions.js'

// Globally available variables for the system, available in all templates with "falloutpnp."
export const falloutpnp = {
  attackTypes: ATTACK_TYPES,
  races: RACES,
  weaponConditions: WEAPON_CONDITIONS,
}
