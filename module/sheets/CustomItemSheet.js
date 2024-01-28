export default class CustomItemSheet extends ItemSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      width: 500,
      height: 186,
      resizable: false,
    })
  }

  get template() {
    return `systems/falloutpnp/templates/sheets/custom-item-sheet.hbs`
  }

  getData() {
    const data = super.getData()
    data.system = data.data.system
    data.config = CONFIG.falloutpnp
    return data
  }

  activateListeners(html) {
    html.find('[data-update-item]').change(this.onUpdateItem.bind(this))
  }

  async onUpdateItem(event) {
    const { itemId, updateItem } = event.currentTarget.dataset
    const item = this.actor.items.get(itemId)
    await item.update({ [updateItem]: event.target.value }, { render: false })
    // Force re-render Actor if name is changed, since it's displayed in the inventory.
    if (updateItem === 'name') {
      item.parent.render()
    }
  }

  close(options) {
    super.close(options)
    document.activeElement.blur()
  }
}
