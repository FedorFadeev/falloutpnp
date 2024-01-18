export default class WeaponSheet extends ItemSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      width: 600,
      height: 400,
    })
  }

  get template() {
    return `systems/falloutpnp/templates/sheets/weapon-sheet.hbs`
  }

  getData() {
    const data = super.getData()
    data.system = data.data.system
    data.config = CONFIG.falloutpnp
    return data
  }
}
