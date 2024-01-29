export const ATTACK_TYPES = [
  {
    label: 'Unarmed',
    key: 'unarmed',
    roll: 'skills.unarmed',
    isBurstAvailable: false,
    isRanged: false,
  },
  {
    label: 'Melee',
    key: 'melee',
    roll: 'skills.melee',
    isBurstAvailable: false,
    isRanged: false,
  },
  {
    label: 'Small Guns',
    key: 'smallGuns',
    roll: 'skills.smallGuns',
    isBurstAvailable: true,
    isRanged: true,
  },
  {
    label: 'Big Guns',
    key: 'bigGuns',
    roll: 'skills.bigGuns',
    isBurstAvailable: true,
    isRanged: true,
  },
  {
    label: 'Energy Weapons',
    key: 'energyWeapons',
    roll: 'skills.energyWeapons',
    isBurstAvailable: true,
    isRanged: true,
  },
  { label: 'Throwing', key: 'throwing', roll: 'skills.throwing', isBurstAvailable: false, isRanged: true },
]
