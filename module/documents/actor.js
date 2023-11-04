import { RACES } from "../constants/races.js";

export class CustomActor extends Actor {
  setRace() {
    const race =
      RACES.find(({ key }) => key === this.system.general.race) ?? RACES[0];
    this.system.race = race;
  }

  setSpecial() {
    const { special, race } = this.system;

    Object.keys(special).forEach((key) => {
      const { min, max } = race.special[key];
      if (special[key].base < min) {
        special[key].base = min;
      } else if (special[key].base > max) {
        special[key].base = max;
      }
    });

    Object.keys(special).forEach((key) => {
      special[key].total =
        special[key].base +
        special[key].diffPositive -
        special[key].diffNegative;
    });
  }

  setSecondary() {
    const { secondary, special } = this.system;
    secondary.meleeDamage = special.str.total > 5 ? special.str.total - 5 : 1;
    secondary.sequence = 2 * special.per.total;
    secondary.healingRate = Math.max(1, Math.floor(special.end.total / 3));
    secondary.hpPerLevel = 3 + Math.floor(special.end.total / 2);
    secondary.spPerLevel = 5 + special.int.total * 2;
    secondary.actionPoints = 5 + Math.floor(special.agi.total / 2);
  }

  setSkills() {
    const { skills, special } = this.system;

    // Skills (Base)
    skills.smallGuns.base = 5 + special.agi.total * 4;
    skills.bigGuns.base = special.agi.total * 2;
    skills.energyWeapons.base = special.agi.total * 2;
    skills.unarmed.base = 30 + (special.agi.total + special.str.total) * 2;
    skills.meleeWeapons.base = 20 + (special.agi.total + special.str.total) * 2;
    skills.throwing.base = special.agi.total * 4;
    skills.firstAid.base = (special.per.total + special.int.total) * 2;
    skills.doctor.base = 5 + special.per.total + special.int.total;
    skills.sneak.base = 5 + special.agi.total * 3;
    skills.lockpick.base = 10 + special.agi.total + special.per.total;
    skills.steal.base = special.agi.total * 3;
    skills.traps.base = 10 + special.agi.total + special.per.total;
    skills.science.base = special.int.total * 4;
    skills.repair.base = special.int.total * 3;
    skills.pilot.base = (special.agi.total + special.per.total) * 2;
    skills.speech.base = special.cha.total * 5;
    skills.barter.base = special.cha.total * 4;
    skills.gambling.base = special.luc.total * 5;
    skills.outdoorsman.base = (special.end.total + special.int.total) * 2;

    // Skills (Total)
    Object.keys(skills).forEach((key) => {
      let skill = skills[key];
      skill.total =
        skill.base +
        skill.diffPositive -
        skill.diffNegative +
        (skill.tagged ? 20 + skill.lvlUp * 2 : skill.lvlUp);
    });
  }

  prepareDerivedData() {
    this.setRace();
    this.setSpecial();
    this.setSecondary();
    this.setSkills();

    const taggedSkillsCount = Object.keys(this.system.skills).reduce(
      (acc, key) => (this.system.skills[key].tagged ? acc + 1 : acc),
      0
    );
    this.system.isTaggingDisabled = taggedSkillsCount >= 3;
  }
}
