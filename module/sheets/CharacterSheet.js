export default class CharacterSheet extends ActorSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      width: 1000,
      height: 700,
    })
  }

  get template() {
    return 'systems/falloutpnp/templates/sheets/character-sheet.hbs'
  }

  getData() {
    const data = super.getData()
    data.system = data.data.system
    data.config = CONFIG.falloutpnp
    return data
  }

  // https://foundryvtt.wiki/en/development/guides/SD-tutorial/SD111-Creating-rollable-buttons-with-event-listeners
  activateListeners(html) {
    super.activateListeners(html)

    // S.P.E.C.I.A.L.
    html.find('.rollable-d10').click(this.onRollSpecial.bind(this))
    html.find('[data-increment-special]').click(this.onIncrementSpecial.bind(this))
    html.find('[data-decrement-special]').click(this.onDecrementSpecial.bind(this))

    // Skills
    html.find('.rollable-d100').click(this.onRollSkill.bind(this))
    html.find('input[name="system.skills.doctor.usesRemaining"]').change((event) => {
      this.onUpdateSkillUsesRemaining('doctor', event.target.value)
    })
    html.find('input[name="system.skills.firstAid.usesRemaining"]').change((event) => {
      this.onUpdateSkillUsesRemaining('firstAid', event.target.value)
    })
    html.find('.clickable-plus[data-increment-skill]').click(this.onIncrementSkill.bind(this))
    html.find('.clickable-minus[data-decrement-skill]').click(this.onDecrementSkill.bind(this))

    // Inventory
    html.find('[data-delete-item]').click(this.onDeleteItem.bind(this))
    html.find('[data-create-item]').click(this.onCreateItem.bind(this))
    html.find('[data-update-item]').change(this.onUpdateItem.bind(this))
    html.find('[data-open-item]').click(this.onOpenItem.bind(this))
  }

  // TODO: Implement critical success.
  async displayRoll(die, target, label) {
    const roll = await new Roll(die).roll()
    const isSuccess = roll.total <= target
    const result = isSuccess ? 'SUCCESS' : 'FAILURE'
    const color = isSuccess ? 'green' : 'red'
    const message = `<p style="display: flex; justify-content: center; font: x-large 'Overseer';">
                      <span style="color: ${color};">${result}</span>
                      <span style="padding-left: 0.5rem;">by ${Math.abs(target - roll.total)}</span>
                    </p>`
    await roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      flavor: `Rolled ${label} (${target})` + message,
    })
  }

  onIncrementSpecial(event) {
    const { incrementSpecial } = event.currentTarget.dataset
    if (incrementSpecial) {
      const { special, race } = this.document.system
      const { max } = race.special[incrementSpecial]
      this.actor.update({
        [`system.special.${incrementSpecial}.base`]: Math.min(max, special[incrementSpecial].base + 1),
      })
    }
  }

  onDecrementSpecial(event) {
    const { decrementSpecial } = event.currentTarget.dataset
    if (decrementSpecial) {
      const { special, race } = this.document.system
      const { min } = race.special[decrementSpecial]
      this.actor.update({
        [`system.special.${decrementSpecial}.base`]: Math.max(min, special[decrementSpecial].base - 1),
      })
    }
  }

  onIncrementSkill(event) {
    const { incrementSkill } = event.currentTarget.dataset
    if (incrementSkill) {
      const { skills } = this.document.system
      this.actor.update({
        [`system.skills.${incrementSkill}.skillPoints`]: skills[incrementSkill].skillPoints + 1,
      })
    }
  }

  onDecrementSkill(event) {
    const { decrementSkill } = event.currentTarget.dataset
    if (decrementSkill) {
      const { skills } = this.document.system
      this.actor.update({
        [`system.skills.${decrementSkill}.skillPoints`]: skills[decrementSkill].skillPoints - 1,
      })
    }
  }

  onRollSkill(event) {
    event.preventDefault()
    const dataset = event.currentTarget.dataset
    if (dataset.roll) {
      const { skills } = this.document.system
      const skillTotals = Object.keys(skills).reduce((acc, key) => ({ ...acc, [key]: skills[key].total }), {})
      this.displayRoll('d100', skillTotals[dataset.roll], dataset.label)
    }
  }

  onRollSpecial(event) {
    event.preventDefault()
    const dataset = event.currentTarget.dataset
    if (dataset.roll) {
      const { special } = this.document.system
      const specialTotals = Object.keys(special).reduce((acc, key) => ({ ...acc, [key]: special[key].total }), {})
      this.displayRoll('d10', specialTotals[dataset.roll], dataset.label)
    }
  }

  onUpdateSkillUsesRemaining(skill, usesRemaining) {
    const { skills } = this.document.system
    skills[skill].usesRemaining = usesRemaining
  }

  async onCreateItem(event) {
    const { createItem: type } = event.currentTarget.dataset
    await Item.create(
      {
        name: 'EMPTY_ITEM_NAME',
        type,
        data: {
          weight: 0,
          quantity: 1,
        },
      },
      { parent: this.actor }
    )
    const itemNameInputs = this.form.querySelectorAll('input[name="item.name"]')
    itemNameInputs[itemNameInputs.length - 1].focus()
  }

  onDeleteItem(event) {
    const { deleteItem: itemId } = event.currentTarget.dataset
    const item = this.actor.items.get(itemId)
    item.delete()
  }

  async onUpdateItem(event) {
    const { itemId, updateItem } = event.currentTarget.dataset
    const item = this.actor.items.get(itemId)
    await item.update({ [updateItem]: event.target.value }, { render: updateItem !== 'name' })
    item.render()
  }

  onOpenItem(event) {
    const { openItem: itemId } = event.currentTarget.dataset
    const item = this.actor.items.get(itemId)
    item.sheet.render(true)
  }

  close(options) {
    super.close(options)
    document.activeElement.blur()
  }
}
