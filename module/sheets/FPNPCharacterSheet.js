export default class FPNPCharacterSheet extends ActorSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      width: 1000,
      height: 700,
      classes: ["fpnp", "sheet", "character"],
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "features",
        },
      ],
    });
  }

  get template() {
    return `systems/fpnp/templates/sheets/character-sheet.html`;
  }

  prepareDerivedData() {
    console.log("prepareDerivedData");
  }
  // prepareDerivedData() {
  //     const str = this.object.system.special.str;
  //     console.log('str is', str);
  //     str.total = Math.floor(Math.max(str.minValue, str.value + str.diffPositive - str.diffNegative));
  // }

  // getData(){
  //     const data = super.getData();
  //     data.config = CONFIG.fpnp;
  //     data.weapons = data.items.filter(function(item) {return item.type == "weapon"});
  //     return data;
  // }
  getData() {
    const data = super.getData();
    const dataSystem = this.document.system;
    data.config = CONFIG.fpnp;
    data.weapons = data.items.filter(function (item) {
      return item.type == "weapon";
    });
    return {
      data: data,
      system: dataSystem,
    };
  }

  // https://foundryvtt.wiki/en/development/guides/SD-tutorial/SD111-Creating-rollable-buttons-with-event-listeners
  activateListeners(html) {
    super.activateListeners(html);

    html.find(".rollable-skill").click(this._onRollSkill.bind(this));
    html.find(".rollable-special").click(this._onRollSpecial.bind(this));
  }

  async _onRollSkill(event) {
    event.preventDefault();
    const dataset = event.currentTarget.dataset;

    if (dataset.roll) {
      const { skills } = this.document.system;
      const skillTotals = Object.keys(skills).reduce(
        (acc, key) => ({ ...acc, [key]: skills[key].total }),
        {}
      );
      const roll = new Roll("d100");
      const rollResult = await roll.roll();
      const messageResult = rollResult.total <= skillTotals[dataset.roll] ? "SUCCESS" : "FAILURE";
      const messageColor = rollResult.total <= skillTotals[dataset.roll] ? "green" : "red";
      const message = `<p style="display: flex; justify-content: center; font: x-large 'Overseer';">
                        <span style="color: ${messageColor};">${messageResult}</span>
                        &nbsp;
                        <span>by ${Math.abs(skillTotals[dataset.roll] - rollResult.total)}</span>
                      </p>`;
      await rollResult.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: `Rolled ${dataset.label} (${skillTotals[dataset.roll]})${message}`,
      });
    }
  }

  async _onRollSpecial(event) {
    event.preventDefault();
    const dataset = event.currentTarget.dataset;

    if (dataset.roll) {
      const { special } = this.document.system;
      const specialTotals = Object.keys(special).reduce(
        (acc, key) => ({ ...acc, [key]: special[key].total }),
        {}
      );
      const roll = new Roll("d10");
      const rollResult = await roll.roll();
      const messageResult = rollResult.total <= specialTotals[dataset.roll] ? "SUCCESS" : "FAILURE";
      const messageColor = rollResult.total <= specialTotals[dataset.roll] ? "green" : "red";
      const message = `<p style="display: flex; justify-content: center; font: x-large 'Overseer';">
                        <span style="color: ${messageColor};">${messageResult}</span>
                        &nbsp;
                        <span>by ${Math.abs(specialTotals[dataset.roll] - rollResult.total)}</span>
                      </p>`;
      await rollResult.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: `Rolled ${dataset.label} (${specialTotals[dataset.roll]})${message}`,
      });
    }
  }
}
