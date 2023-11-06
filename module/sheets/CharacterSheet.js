export default class CharacterSheet extends ActorSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      width: 1000,
      height: 700,
      classes: ['falloutpnp', 'sheet', 'character'],
      tabs: [
        {
          navSelector: '.sheet-tabs',
          contentSelector: '.sheet-body',
          initial: 'features',
        },
      ],
    })
  }

  get template() {
    return 'systems/falloutpnp/templates/sheets/character-sheet.hbs'
  }

  // prepareDerivedData() {
  //     const str = this.object.system.special.str;
  //     console.log('str is', str);
  //     str.total = Math.floor(Math.max(str.minValue, str.value + str.diffPositive - str.diffNegative));
  // }

  // getData(){
  //     const data = super.getData();
  //     data.config = CONFIG.falloutpnp;
  //     data.weapons = data.items.filter(function(item) {return item.type == "weapon"});
  //     return data;
  // }

  getData() {
    const data = super.getData()
    const dataSystem = this.document.system
    data.config = CONFIG.falloutpnp
    data.weapons = data.items.filter(function (item) {
      return item.type == 'weapon'
    })
    return {
      data: data,
      system: dataSystem,
    }
  }

  // https://foundryvtt.wiki/en/development/guides/SD-tutorial/SD111-Creating-rollable-buttons-with-event-listeners
  activateListeners(html) {
    super.activateListeners(html)

    html.find('.rollable-skill').click(this.onRollSkill.bind(this))
    html.find('.rollable-special').click(this.onRollSpecial.bind(this))
  }

  // TODO: Implement critical success.
  async displayRoll(die, target, label) {
    const roll = await new Roll(die).roll()
    const isSuccess = roll.total <= target
    const result = isSuccess ? 'SUCCESS' : 'FAILURE'
    const color = isSuccess ? 'green' : 'red'
    const message = `<p style="display: flex; justify-content: center; font: x-large 'Overseer';">
                        <span style="color: ${color};">${result}</span>
                        &nbsp;
                        <span>by ${Math.abs(target - roll.total)}</span>
                      </p>`
    await roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      flavor: `Rolled ${label} (${target})` + message,
    })
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
}
