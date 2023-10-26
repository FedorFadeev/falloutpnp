import { fpnp } from "./module/config.js";
import FPNPItemSheet from "./module/sheets/FPNPItemSheet.js";
// import FPNPEnemyCharacterSheet from "./module/sheets/FPNPEnemyCharacterSheet.js";
import FPNPCharacterSheet from "./module/sheets/FPNPCharacterSheet.js";

async function preloadHandlebarsTemplates() {
    const templatePaths = [
        "systems/fpnp/templates/partials/weapon-card.html"
    ];

    return loadTemplates(templatePaths);
}

Hooks.once("init", function (){
    console.log('Loaded');

    CONFIG.fpnp = fpnp;

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("fpnp", FPNPItemSheet, { makeDefault: true });

    // Actors.unregisterSheet("core", ActorSheet);
    // Actors.registerSheet("fpnp", FPNPEnemyCharacterSheet, { makeDefault: true });

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("fpnp", FPNPCharacterSheet, { makeDefault: true });

    preloadHandlebarsTemplates();

    Handlebars.registerHelper('statCounter', function (base, diffPositive, diffNegative) {
        const total = Number(base) + Number(diffPositive) - Number(diffNegative)
        return total;
    })

    Handlebars.registerHelper('meleeDamage', function (base, diffPositive, diffNegative) {
        const strength = Number(base) + Number(diffPositive) - Number(diffNegative);
        let str = 1;
        if (strength > 6) str = strength - 5;

        return str;
    })

    Handlebars.registerHelper('sequence', function (base, diffPositive, diffNegative) {
        const total = Math.floor(2*(Number(base) + Number(diffPositive) - Number(diffNegative)));
        return total;
    })

    Handlebars.registerHelper('healingRate', function (base, diffPositive, diffNegative) {
        const total = Math.max(1, Math.floor((Number(base) + Number(diffPositive) - Number(diffNegative))/3));
        return total;
    })

    Handlebars.registerHelper('hpPerLevel', function (base, diffPositive, diffNegative) {
        const total = 3 + Math.floor((Number(base) + Number(diffPositive) - Number(diffNegative))/2);
        return total;
    })

    Handlebars.registerHelper('spPerLevel', function (base, diffPositive, diffNegative) {
        const total = 5 + (Number(base) + Number(diffPositive) - Number(diffNegative)) * 2;
        return total;
    })

    Handlebars.registerHelper('actionPoints', function (base, diffPositive, diffNegative) {
        const total = 5 + Math.floor((Number(base) + Number(diffPositive) - Number(diffNegative))/2);
        return total;
    })
});