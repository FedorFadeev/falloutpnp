export class CustomActor extends Actor {
    prepareDerivedData () {
        this.system.special.str.total = Math.max(1, 5 + +this.system.special.str.diffPositive - +this.system.special.str.diffNegative);
        this.system.special.per.total = Math.max(1, 5 + +this.system.special.per.diffPositive - +this.system.special.per.diffNegative);
        this.system.special.end.total = Math.max(1, 5 + +this.system.special.end.diffPositive - +this.system.special.end.diffNegative);
        this.system.special.cha.total = Math.max(1, 5 + +this.system.special.cha.diffPositive - +this.system.special.cha.diffNegative);
        this.system.special.int.total = Math.max(1, 5 + +this.system.special.int.diffPositive - +this.system.special.int.diffNegative);
        this.system.special.agi.total = Math.max(1, 5 + +this.system.special.agi.diffPositive - +this.system.special.agi.diffNegative);
        this.system.special.luc.total = Math.max(1, 5 + +this.system.special.per.diffPositive - +this.system.special.per.diffNegative);


        this.system.meleeDamage = this.system.special.str.total > 5 ?  this.system.special.str.total - 5 : 1;
        this.system.sequence = 2 * +this.system.special.per.total;
        this.system.healingRate = Math.max(1, Math.floor(+this.system.special.end.total/3));
        this.system.hpPerLevel = 3 + Math.floor(+this.system.special.end.total/2);
        this.system.spPerLevel = 5 + (+this.system.special.int.total * 2);
        this.system.actionPoints = 5 + Math.floor(+this.system.special.agi.total/2);


        console.log('prepareDerivedData ', this.system);
    }
}