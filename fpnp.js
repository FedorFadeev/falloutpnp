import { fpnp } from "./module/config.js";
import FPNPItemSheet from "./module/sheets/FPNPItemSheet.js";
// import FPNPEnemyCharacterSheet from "./module/sheets/FPNPEnemyCharacterSheet.js";
import FPNPCharacterSheet from "./module/sheets/FPNPCharacterSheet.js";
import { CustomActor } from "./module/documents/actor.js";


async function preloadHandlebarsTemplates() {
    const templatePaths = [
        "systems/fpnp/templates/partials/weapon-card.html",
        "systems/fpnp/templates/partials/actor/skills.html",
        "systems/fpnp/templates/partials/actor/bio.html"
    ];

    return loadTemplates(templatePaths);
}

Hooks.once("init", function (){
    console.log('Loaded');

    CONFIG.fpnp = fpnp;

    CONFIG.Actor.documentClass = CustomActor;

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("fpnp", FPNPItemSheet, { makeDefault: true });

    // Actors.unregisterSheet("core", ActorSheet);
    // Actors.registerSheet("fpnp", FPNPEnemyCharacterSheet, { makeDefault: true });

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("fpnp", FPNPCharacterSheet, { makeDefault: true });

    preloadHandlebarsTemplates();

});