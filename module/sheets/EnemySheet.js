export default class EnemySheet extends ActorSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      width: 700,
      height: 700,
    })
  }

  get template() {
    return 'systems/falloutpnp/templates/sheets/enemy-sheet.hbs'
  }

  getData() {
    const data = super.getData()
    const dataSystem = this.document.system
    data.config = CONFIG.falloutpnp
    return {
      data: data,
      system: dataSystem,
    }
  }
}
