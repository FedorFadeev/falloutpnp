export default class FPNPEnemyCharacterSheet extends ActorSheet {
    static get defaultOption() {
        return mergeObject(super.defaultOptions, {
            template: "systems/fpnp/templates/sheets/enemyCharacter-sheet.html",
            classes: ["fpnp", "sheet", "enemyCharacter"]
        })
    }
}