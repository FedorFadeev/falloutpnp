import { RACES } from "../constants/races.js";

export class CustomActor extends Actor {
  prepareDerivedData() {
    let { special, secondary, skills } = this.system;

    // Race
    this.system.race = RACES.find(
      ({ key }) => key === this.system.general.race
    );

    // SPECIAL
    special.str.total =
      +special.str.base + +special.str.diffPositive - +special.str.diffNegative;
    special.per.total =
      +special.per.base + +special.per.diffPositive - +special.per.diffNegative;
    special.end.total =
      +special.end.base + +special.end.diffPositive - +special.end.diffNegative;
    special.cha.total =
      +special.cha.base + +special.cha.diffPositive - +special.cha.diffNegative;
    special.int.total =
      +special.int.base + +special.int.diffPositive - +special.int.diffNegative;
    special.agi.total =
      +special.agi.base + +special.agi.diffPositive - +special.agi.diffNegative;
    special.luc.total =
      +special.luc.base + +special.luc.diffPositive - +special.luc.diffNegative;

    // Secondary
    secondary.meleeDamage = special.str.total > 5 ? special.str.total - 5 : 1;
    secondary.sequence = 2 * +special.per.total;
    secondary.healingRate = Math.max(1, Math.floor(+special.end.total / 3));
    secondary.hpPerLevel = 3 + Math.floor(+special.end.total / 2);
    secondary.spPerLevel = 5 + +special.int.total * 2;
    secondary.actionPoints = 5 + Math.floor(+special.agi.total / 2);

    // Skills (Base)
    skills.smallGuns.base = 5 + +special.agi.total * 4;
    skills.bigGuns.base = +special.agi.total * 2;
    skills.energyWeapons.base = +special.agi.total * 2;
    skills.unarmed.base = 30 + (+special.agi.total + +special.str.total) * 2;
    skills.meleeWeapons.base =
      20 + (+special.agi.total + +special.str.total) * 2;
    skills.throwing.base = +special.agi.total * 4;
    skills.firstAid.base = (+special.per.total + +special.int.total) * 2;
    skills.doctor.base = 5 + +special.per.total + +special.int.total;
    skills.sneak.base = 5 + +special.agi.total * 3;
    skills.lockpick.base = 10 + +special.agi.total + +special.per.total;
    skills.steal.base = +special.agi.total * 3;
    skills.traps.base = 10 + +special.agi.total + +special.per.total;
    skills.science.base = +special.int.total * 4;
    skills.repair.base = +special.int.total * 3;
    skills.pilot.base = (+special.agi.total + +special.per.total) * 2;
    skills.speech.base = +special.cha.total * 5;
    skills.barter.base = +special.cha.total * 4;
    skills.gambling.base = +special.luc.total * 5;
    skills.outdoorsman.base = (+special.end.total + +special.int.total) * 2;

    // Skills (Total)
    this.system.skills.smallGuns.total =
      +this.system.skills.smallGuns.base +
      +this.system.skills.smallGuns.diffPositive -
      +this.system.skills.smallGuns.diffNegative +
      (this.system.skills.smallGuns.tagged
        ? 20 + +this.system.skills.smallGuns.lvlUp * 2
        : +this.system.skills.smallGuns.lvlUp);

    this.system.skills.bigGuns.total =
      +this.system.skills.bigGuns.base +
      +this.system.skills.bigGuns.diffPositive -
      +this.system.skills.bigGuns.diffNegative +
      (this.system.skills.bigGuns.tagged
        ? 20 + this.system.skills.bigGuns.lvlUp * 2
        : +this.system.skills.bigGuns.lvlUp);

    this.system.skills.energyWeapons.total =
      +this.system.skills.energyWeapons.base +
      +this.system.skills.energyWeapons.diffPositive -
      +this.system.skills.energyWeapons.diffNegative +
      (this.system.skills.energyWeapons.tagged
        ? 20 + this.system.skills.energyWeapons.lvlUp * 2
        : +this.system.skills.energyWeapons.lvlUp);

    this.system.skills.unarmed.total =
      +this.system.skills.unarmed.base +
      +this.system.skills.unarmed.diffPositive -
      +this.system.skills.unarmed.diffNegative +
      (this.system.skills.unarmed.tagged
        ? 20 + this.system.skills.unarmed.lvlUp * 2
        : +this.system.skills.unarmed.lvlUp);

    this.system.skills.meleeWeapons.total =
      +this.system.skills.meleeWeapons.base +
      +this.system.skills.meleeWeapons.diffPositive -
      +this.system.skills.meleeWeapons.diffNegative +
      (this.system.skills.meleeWeapons.tagged
        ? 20 + this.system.skills.meleeWeapons.lvlUp * 2
        : +this.system.skills.meleeWeapons.lvlUp);

    this.system.skills.throwing.total =
      +this.system.skills.throwing.base +
      +this.system.skills.throwing.diffPositive -
      +this.system.skills.throwing.diffNegative +
      (this.system.skills.throwing.tagged
        ? 20 + this.system.skills.throwing.lvlUp * 2
        : +this.system.skills.throwing.lvlUp);

    this.system.skills.firstAid.total =
      +this.system.skills.firstAid.base +
      +this.system.skills.firstAid.diffPositive -
      +this.system.skills.firstAid.diffNegative +
      (this.system.skills.firstAid.tagged
        ? 20 + this.system.skills.firstAid.lvlUp * 2
        : +this.system.skills.firstAid.lvlUp);

    this.system.skills.doctor.total =
      +this.system.skills.doctor.base +
      +this.system.skills.doctor.diffPositive -
      +this.system.skills.doctor.diffNegative +
      (this.system.skills.doctor.tagged
        ? 20 + this.system.skills.doctor.lvlUp * 2
        : +this.system.skills.doctor.lvlUp);

    this.system.skills.sneak.total =
      +this.system.skills.sneak.base +
      +this.system.skills.sneak.diffPositive -
      +this.system.skills.sneak.diffNegative +
      (this.system.skills.sneak.tagged
        ? 20 + this.system.skills.sneak.lvlUp * 2
        : +this.system.skills.sneak.lvlUp);

    this.system.skills.lockpick.total =
      +this.system.skills.lockpick.base +
      +this.system.skills.lockpick.diffPositive -
      +this.system.skills.lockpick.diffNegative +
      (this.system.skills.lockpick.tagged
        ? 20 + this.system.skills.lockpick.lvlUp * 2
        : +this.system.skills.lockpick.lvlUp);

    this.system.skills.steal.total =
      +this.system.skills.steal.base +
      +this.system.skills.steal.diffPositive -
      +this.system.skills.steal.diffNegative +
      (this.system.skills.steal.tagged
        ? 20 + this.system.skills.steal.lvlUp * 2
        : +this.system.skills.steal.lvlUp);

    this.system.skills.traps.total =
      +this.system.skills.traps.base +
      +this.system.skills.traps.diffPositive -
      +this.system.skills.traps.diffNegative +
      (this.system.skills.traps.tagged
        ? 20 + this.system.skills.traps.lvlUp * 2
        : +this.system.skills.traps.lvlUp);

    this.system.skills.science.total =
      +this.system.skills.science.base +
      +this.system.skills.science.diffPositive -
      +this.system.skills.science.diffNegative +
      (this.system.skills.science.tagged
        ? 20 + this.system.skills.science.lvlUp * 2
        : +this.system.skills.science.lvlUp);

    this.system.skills.repair.total =
      +this.system.skills.repair.base +
      +this.system.skills.repair.diffPositive -
      +this.system.skills.repair.diffNegative +
      (this.system.skills.repair.tagged
        ? 20 + this.system.skills.repair.lvlUp * 2
        : +this.system.skills.repair.lvlUp);

    this.system.skills.pilot.total =
      +this.system.skills.pilot.base +
      +this.system.skills.pilot.diffPositive -
      +this.system.skills.pilot.diffNegative +
      (this.system.skills.pilot.tagged
        ? 20 + this.system.skills.pilot.lvlUp * 2
        : +this.system.skills.pilot.lvlUp);

    this.system.skills.speech.total =
      +this.system.skills.speech.base +
      +this.system.skills.speech.diffPositive -
      +this.system.skills.speech.diffNegative +
      (this.system.skills.speech.tagged
        ? 20 + this.system.skills.speech.lvlUp * 2
        : +this.system.skills.speech.lvlUp);

    this.system.skills.barter.total =
      +this.system.skills.barter.base +
      +this.system.skills.barter.diffPositive -
      +this.system.skills.barter.diffNegative +
      (this.system.skills.barter.tagged
        ? 20 + this.system.skills.barter.lvlUp * 2
        : +this.system.skills.barter.lvlUp);

    this.system.skills.gambling.total =
      +this.system.skills.gambling.base +
      +this.system.skills.gambling.diffPositive -
      +this.system.skills.gambling.diffNegative +
      (this.system.skills.gambling.tagged
        ? 20 + this.system.skills.gambling.lvlUp * 2
        : +this.system.skills.gambling.lvlUp);

    this.system.skills.outdoorsman.total =
      +this.system.skills.outdoorsman.base +
      +this.system.skills.outdoorsman.diffPositive -
      +this.system.skills.outdoorsman.diffNegative +
      (this.system.skills.outdoorsman.tagged
        ? 20 + this.system.skills.outdoorsman.lvlUp * 2
        : +this.system.skills.outdoorsman.lvlUp);

    const taggedSkillCount = Object.keys(this.system.skills).reduce(
      (acc, key) => (this.system.skills[key].tagged ? acc + 1 : acc),
      0
    );
    this.system.tagged.total = taggedSkillCount;
    this.system.tagged.disabled = taggedSkillCount >= 3;
  }
}
