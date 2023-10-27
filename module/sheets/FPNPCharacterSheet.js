export default class FPNPCharacterSheet extends ActorSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            width: 1000,
            height: 700,
            classes: ["fpnp", "sheet", "character"],
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "features" }]
        })
    }

    get template() {
        return `systems/fpnp/templates/sheets/character-sheet.html`
    }

    prepareDerivedData () {
        console.log('prepareDerivedData');
    }
    // prepareDerivedData() {
    //     const str = this.object.system.special.str;
    //     console.log('str is', str);
    //     str.total = Math.floor(Math.max(str.minValue, str.value + str.diffPositive - str.diffNegative));
    // }

    // getData(){
    //     const data = super.getData();
    //     data.config = CONFIG.fpnp;
    //     data.weapons = data.items.filter(function(item) {return item.type == "weapon"});
    //     return data;
    // }
    getData(){
        const data = super.getData();
        const dataSystem = this.document.system;
        data.config = CONFIG.fpnp;
        data.weapons = data.items.filter(function(item) {return item.type == "weapon"});
        return {
            data: data,
            system: dataSystem
        };
    }
}