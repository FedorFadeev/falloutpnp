export class CustomActor extends Actor {
    prepareDerivedData () {
        //special
        this.system.special.str.total = Math.max(1, 5 + +this.system.special.str.diffPositive - +this.system.special.str.diffNegative);
        this.system.special.per.total = Math.max(1, 5 + +this.system.special.per.diffPositive - +this.system.special.per.diffNegative);
        this.system.special.end.total = Math.max(1, 5 + +this.system.special.end.diffPositive - +this.system.special.end.diffNegative);
        this.system.special.cha.total = Math.max(1, 5 + +this.system.special.cha.diffPositive - +this.system.special.cha.diffNegative);
        this.system.special.int.total = Math.max(1, 5 + +this.system.special.int.diffPositive - +this.system.special.int.diffNegative);
        this.system.special.agi.total = Math.max(1, 5 + +this.system.special.agi.diffPositive - +this.system.special.agi.diffNegative);
        this.system.special.luc.total = Math.max(1, 5 + +this.system.special.luc.diffPositive - +this.system.special.luc.diffNegative);

        //secondary
        this.system.secondary.meleeDamage = this.system.special.str.total > 5 ?  this.system.special.str.total - 5 : 1;
        this.system.secondary.sequence = 2 * +this.system.special.per.total;
        this.system.secondary.healingRate = Math.max(1, Math.floor(+this.system.special.end.total/3));
        this.system.secondary.hpPerLevel = 3 + Math.floor(+this.system.special.end.total/2);
        this.system.secondary.spPerLevel = 5 + (+this.system.special.int.total * 2);
        this.system.secondary.actionPoints = 5 + Math.floor(+this.system.special.agi.total/2);

        //skills
        //base
        this.system.skills.smallGuns.base = 5 + (+this.system.special.agi.total * 4);
        this.system.skills.bigGuns.base = +this.system.special.agi.total * 2;
        this.system.skills.energyWeapons.base = +this.system.special.agi.total * 2;
        this.system.skills.unarmed.base = 30 + ((+this.system.special.agi.total + +this.system.special.str.total) * 2);
        this.system.skills.meleeWeapons.base = 20 + ((+this.system.special.agi.total + +this.system.special.str.total) * 2);
        this.system.skills.throwing.base = +this.system.special.agi.total * 4;
        this.system.skills.firstAid.base = (+this.system.special.per.total + +this.system.special.int.total) * 2;
        this.system.skills.doctor.base = 5 + +this.system.special.per.total + +this.system.special.int.total;
        this.system.skills.sneak.base = 5 + (+this.system.special.agi.total * 3);
        this.system.skills.lockpick.base = 10 + +this.system.special.agi.total + +this.system.special.per.total;
        this.system.skills.steal.base = +this.system.special.agi.total * 3;
        this.system.skills.traps.base = 10 + +this.system.special.agi.total + +this.system.special.per.total;
        this.system.skills.science.base = +this.system.special.int.total * 4;
        this.system.skills.repair.base = +this.system.special.int.total * 3;
        this.system.skills.pilot.base = (+this.system.special.agi.total + +this.system.special.per.total) * 2;
        this.system.skills.speech.base = +this.system.special.cha.total * 5;
        this.system.skills.barter.base = +this.system.special.cha.total * 4;
        this.system.skills.gambling.base = +this.system.special.luc.total * 5;
        this.system.skills.outdoorsman.base = (+this.system.special.end.total + +this.system.special.int.total) * 2;
        //total
        this.system.skills.smallGuns.total =
            +this.system.skills.smallGuns.base +
            +this.system.skills.smallGuns.diffPositive -
            +this.system.skills.smallGuns.diffNegative +
            (this.system.skills.smallGuns.tagged ? +this.system.skills.smallGuns.lvlUp * 2 : +this.system.skills.smallGuns.lvlUp);

        this.system.skills.bigGuns.total =
            +this.system.skills.bigGuns.base +
            +this.system.skills.bigGuns.diffPositive -
            +this.system.skills.bigGuns.diffNegative +
            (this.system.skills.bigGuns.tagged ? +this.system.skills.bigGuns.lvlUp * 2 : +this.system.skills.bigGuns.lvlUp);

        this.system.skills.energyWeapons.total =
            +this.system.skills.energyWeapons.base +
            +this.system.skills.energyWeapons.diffPositive -
            +this.system.skills.energyWeapons.diffNegative +
            (this.system.skills.energyWeapons.tagged ? +this.system.skills.energyWeapons.lvlUp * 2 : +this.system.skills.energyWeapons.lvlUp);

        this.system.skills.unarmed.total =
            +this.system.skills.unarmed.base +
            +this.system.skills.unarmed.diffPositive -
            +this.system.skills.unarmed.diffNegative +
            (this.system.skills.unarmed.tagged ? +this.system.skills.unarmed.lvlUp * 2 : +this.system.skills.unarmed.lvlUp);

        this.system.skills.meleeWeapons.total =
            +this.system.skills.meleeWeapons.base +
            +this.system.skills.meleeWeapons.diffPositive -
            +this.system.skills.meleeWeapons.diffNegative +
            (this.system.skills.meleeWeapons.tagged ? +this.system.skills.meleeWeapons.lvlUp * 2 : +this.system.skills.meleeWeapons.lvlUp);

        this.system.skills.throwing.total =
            +this.system.skills.throwing.base +
            +this.system.skills.throwing.diffPositive -
            +this.system.skills.throwing.diffNegative +
            (this.system.skills.throwing.tagged ? +this.system.skills.throwing.lvlUp * 2 : +this.system.skills.throwing.lvlUp);

        this.system.skills.firstAid.total =
            +this.system.skills.firstAid.base +
            +this.system.skills.firstAid.diffPositive -
            +this.system.skills.firstAid.diffNegative +
            (this.system.skills.firstAid.tagged ? +this.system.skills.firstAid.lvlUp * 2 : +this.system.skills.firstAid.lvlUp);

        this.system.skills.doctor.total =
            +this.system.skills.doctor.base +
            +this.system.skills.doctor.diffPositive -
            +this.system.skills.doctor.diffNegative +
            (this.system.skills.doctor.tagged ? +this.system.skills.doctor.lvlUp * 2 : +this.system.skills.doctor.lvlUp);

        this.system.skills.sneak.total =
            +this.system.skills.sneak.base +
            +this.system.skills.sneak.diffPositive -
            +this.system.skills.sneak.diffNegative +
            (this.system.skills.sneak.tagged ? +this.system.skills.sneak.lvlUp * 2 : +this.system.skills.sneak.lvlUp);

        this.system.skills.lockpick.total =
            +this.system.skills.lockpick.base +
            +this.system.skills.lockpick.diffPositive -
            +this.system.skills.lockpick.diffNegative +
            (this.system.skills.lockpick.tagged ? +this.system.skills.lockpick.lvlUp * 2 : +this.system.skills.lockpick.lvlUp);

        this.system.skills.steal.total =
            +this.system.skills.steal.base +
            +this.system.skills.steal.diffPositive -
            +this.system.skills.steal.diffNegative +
            (this.system.skills.steal.tagged ? +this.system.skills.steal.lvlUp * 2 : +this.system.skills.steal.lvlUp);

        this.system.skills.traps.total =
            +this.system.skills.traps.base +
            +this.system.skills.traps.diffPositive -
            +this.system.skills.traps.diffNegative +
            (this.system.skills.traps.tagged ? +this.system.skills.traps.lvlUp * 2 : +this.system.skills.traps.lvlUp);

        this.system.skills.science.total =
            +this.system.skills.science.base +
            +this.system.skills.science.diffPositive -
            +this.system.skills.science.diffNegative +
            (this.system.skills.science.tagged ? +this.system.skills.science.lvlUp * 2 : +this.system.skills.science.lvlUp);

        this.system.skills.repair.total =
            +this.system.skills.repair.base +
            +this.system.skills.repair.diffPositive -
            +this.system.skills.repair.diffNegative +
            (this.system.skills.repair.tagged ? +this.system.skills.repair.lvlUp * 2 : +this.system.skills.repair.lvlUp);

        this.system.skills.pilot.total =
            +this.system.skills.pilot.base +
            +this.system.skills.pilot.diffPositive -
            +this.system.skills.pilot.diffNegative +
            (this.system.skills.pilot.tagged ? +this.system.skills.pilot.lvlUp * 2 : +this.system.skills.pilot.lvlUp);

        this.system.skills.speech.total =
            +this.system.skills.speech.base +
            +this.system.skills.speech.diffPositive -
            +this.system.skills.speech.diffNegative +
            (this.system.skills.speech.tagged ? +this.system.skills.speech.lvlUp * 2 : +this.system.skills.speech.lvlUp);

        this.system.skills.barter.total =
            +this.system.skills.barter.base +
            +this.system.skills.barter.diffPositive -
            +this.system.skills.barter.diffNegative +
            (this.system.skills.barter.tagged ? +this.system.skills.barter.lvlUp * 2 : +this.system.skills.barter.lvlUp);

        this.system.skills.gambling.total =
            +this.system.skills.gambling.base +
            +this.system.skills.gambling.diffPositive -
            +this.system.skills.gambling.diffNegative +
            (this.system.skills.gambling.tagged ? +this.system.skills.gambling.lvlUp * 2 : +this.system.skills.gambling.lvlUp);

        this.system.skills.outdoorsman.total =
            +this.system.skills.outdoorsman.base +
            +this.system.skills.outdoorsman.diffPositive -
            +this.system.skills.outdoorsman.diffNegative +
            (this.system.skills.outdoorsman.tagged ? +this.system.skills.outdoorsman.lvlUp * 2 : +this.system.skills.outdoorsman.lvlUp);

        this.system.tagged.total =
            (this.system.skills.smallGuns.tagged ? 1 : 0) +
            (this.system.skills.bigGuns.tagged ? 1 : 0) +
            (this.system.skills.energyWeapons.tagged ? 1 : 0) +
            (this.system.skills.unarmed.tagged ? 1 : 0) +
            (this.system.skills.meleeWeapons.tagged ? 1 : 0) +
            (this.system.skills.throwing.tagged ? 1 : 0) +
            (this.system.skills.firstAid.tagged ? 1 : 0) +
            (this.system.skills.doctor.tagged ? 1 : 0) +
            (this.system.skills.sneak.tagged ? 1 : 0) +
            (this.system.skills.lockpick.tagged ? 1 : 0) +
            (this.system.skills.steal.tagged ? 1 : 0) +
            (this.system.skills.traps.tagged ? 1 : 0) +
            (this.system.skills.science.tagged ? 1 : 0) +
            (this.system.skills.repair.tagged ? 1 : 0) +
            (this.system.skills.pilot.tagged ? 1 : 0) +
            (this.system.skills.speech.tagged ? 1 : 0) +
            (this.system.skills.barter.tagged ? 1 : 0) +
            (this.system.skills.gambling.tagged ? 1 : 0) +
            (this.system.skills.outdoorsman.tagged ? 1 : 0);
        this.system.tagged.disabled = this.system.tagged.total >= 3


        console.log('prepareDerivedData ', this.system);
    }
}