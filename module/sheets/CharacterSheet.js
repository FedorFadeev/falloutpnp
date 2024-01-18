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

    html.find('.rollable-d100').click(this.onRollSkill.bind(this))
    html.find('.rollable-d10').click(this.onRollSpecial.bind(this))
    html.find('input[name="data.system.skills.doctor.usesRemaining"]').change((event) => {
      this.onUpdateSkillUsesRemaining('doctor', event.target.value)
    })
    html.find('input[name="data.system.skills.firstAid.usesRemaining"]').change((event) => {
      this.onUpdateSkillUsesRemaining('firstAid', event.target.value)
    })
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
}
