export default class WeaponSheet extends ItemSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      width: 600,
      height: 400,
      classes: ['falloutpnp', 'sheet', 'item'],
    })
  }

  get template() {
    return `systems/falloutpnp/templates/sheets/${this.item.type}-sheet.hbs`
  }

  getData() {
    const data = super.getData()

    data.config = CONFIG.falloutpnp

    return data
  }
}
