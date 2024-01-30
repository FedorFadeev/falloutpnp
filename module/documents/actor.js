import { RACES } from '../constants/races.js'
import { EXPERIENCE_TO_LEVEL } from '../constants/experienceToLevel.js'

export class CustomActor extends Actor {
  setRace() {
    const race = RACES.find(({ key }) => key === this.system.general.race) ?? RACES[0]
    this.system.race = race
  }

  setSpecial() {
    const { special, race } = this.system

    Object.keys(special).forEach((key) => {
      const { min, max } = race.special[key]

      if (special[key].base < min) {
        special[key].base = min
      } else if (special[key].base > max) {
        special[key].base = max
      }

      special[key].total = special[key].base + special[key].modifier
    })

    this.system.general.remainingSpecial = 40 - Object.keys(special).reduce((acc, key) => acc + special[key].base, 0)
  }

  setSecondary() {
    const { secondary, special } = this.system
    secondary.meleeDamage = special.str.total > 5 ? special.str.total - 5 : 1
    this.system.sequence = secondary.sequence = 2 * special.per.total
    secondary.healingRate = Math.max(1, Math.floor(special.end.total / 3))
    secondary.hpPerLevel = 3 + Math.floor(special.end.total / 2)
    secondary.spPerLevel = 5 + special.int.total * 2
    secondary.actionPoints = 5 + Math.floor(special.agi.total / 2)
  }

  setSkills() {
    const { skills, special } = this.system

    // Skills (Base)
    skills.smallGuns.base = 5 + special.agi.total * 4
    skills.bigGuns.base = special.agi.total * 2
    skills.energyWeapons.base = special.agi.total * 2
    skills.unarmed.base = 30 + (special.agi.total + special.str.total) * 2
    skills.meleeWeapons.base = 20 + (special.agi.total + special.str.total) * 2
    skills.throwing.base = special.agi.total * 4
    skills.firstAid.base = (special.per.total + special.int.total) * 2
    skills.doctor.base = 5 + special.per.total + special.int.total
    skills.sneak.base = 5 + special.agi.total * 3
    skills.lockpick.base = 10 + special.agi.total + special.per.total
    skills.steal.base = special.agi.total * 3
    skills.traps.base = 10 + special.agi.total + special.per.total
    skills.science.base = special.int.total * 4
    skills.repair.base = special.int.total * 3
    skills.pilot.base = (special.agi.total + special.per.total) * 2
    skills.speech.base = special.cha.total * 5
    skills.barter.base = special.cha.total * 4
    skills.gambling.base = special.luc.total * 5
    skills.outdoorsman.base = (special.end.total + special.int.total) * 2

    // Skills (Total)
    Object.keys(skills).forEach((key) => {
      let skill = skills[key]
      let unadjustedSkillPointTotal = skill.base + (skill.isTagged ? 20 + skill.skillPoints * 2 : skill.skillPoints)

      const adjustedSkillPointTotal =
        Math.min(unadjustedSkillPointTotal, 100) + // 1-100
        Math.min(Math.max(unadjustedSkillPointTotal - 100, 0), 50) / 2 + // 101-125
        Math.min(Math.max(unadjustedSkillPointTotal - 150, 0), 75) / 3 + // 126-150
        Math.min(Math.max(unadjustedSkillPointTotal - 225, 0), 100) / 4 + // 151-175
        Math.min(Math.max(unadjustedSkillPointTotal - 325, 0), 125) / 5 + // 176-200
        Math.max(unadjustedSkillPointTotal - 450, 0) / 6 // 201+

      skill.total = Math.floor(adjustedSkillPointTotal) + skill.modifier
    })

    this.system.general.remainingSkillPoints =
      (this.system.general.level - 1) * this.system.secondary.spPerLevel -
      Object.keys(skills).reduce((acc, key) => acc + skills[key].skillPoints, 0)
  }

  setStatus() {
    const { status, special, secondary, general } = this.system

    status.health.maximum = 15 + special.str.total + special.end.total * 2 + secondary.hpPerLevel * (general.level - 1)
    status.rads.resist = special.end.total * 2
    status.poison.resist = special.end.total * 5
    status.experienceToLevel =
      EXPERIENCE_TO_LEVEL[general.level] ??
      EXPERIENCE_TO_LEVEL[EXPERIENCE_TO_LEVEL.length - 1] + 40000 * (general.level - 20)
  }

  setInventory() {
    this.system.carryWeight = this.items.reduce(
      (acc, item) => acc + parseInt(item.system.quantity) * parseInt(item.system.weight),
      0
    )
  }

  prepareDerivedData() {
    if (this.type === 'character') {
      this.setRace()
      this.setSpecial()
      this.setSecondary()
      this.setSkills()
      this.setStatus()
      this.setInventory()

      const taggedSkillsCount = Object.keys(this.system.skills).reduce(
        (acc, key) => (this.system.skills[key].isTagged ? acc + 1 : acc),
        0
      )
      this.system.isTaggingDisabled = taggedSkillsCount >= 3
    }
  }
}
