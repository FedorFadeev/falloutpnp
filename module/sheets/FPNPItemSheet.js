export default class FPNPItemSheet extends ItemSheet {

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            width: 600,
            height: 400,
            classes: ["fpnp", "sheet", "item"]
        })
    }
    get template() {
        return `systems/fpnp/templates/sheets/${this.item.type}-sheet.html`
    }

    getData() {
        const data = super.getData();

        data.config = CONFIG.fpnp;

        return data;
    }
}