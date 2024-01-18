export default class NPCSheet extends ActorSheet {
  static get defaultOption() {
    return mergeObject(super.defaultOptions, {
      template: 'systems/falloutpnp/templates/sheets/npc-sheet.hbs',
    })
  }
}
