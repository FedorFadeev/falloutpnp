# Fallout PnP 2.0 for Foundry Virtual Tabletop

#### Due to the system being unpublishable on Foundry, install it using this manifest link as a custom package:
```
https://raw.githubusercontent.com/FedorFadeev/falloutpnp/main/system.json
```

*From Ukraine with love.*

Fallout Pen and Paper 2.0 is a Fallout-themed Pen and Paper roleplaying game which was created by Jason Mical, which can be found [here](https://static.wikia.nocookie.net/falloutpnp/images/4/43/Fallout_pnp_2_0.pdf/revision/latest?cb=20210308185741).

If you ever wanted to play Fallout 1 or 2 in a tabletop setting, this is the system for you. As such, any 'broken' or 'unbalanced' mechanics are translated over, as they are part of the original games.

It features a complete SPECIAL system and has several races of characters including humans, ghouls, super mutants, half mutants, deathclaws, dogs and robots. It contains a large variety of weapons and armor from both the Fallout universe and Fallout predecessor, Wasteland.

This project attempts to simplify character creation and play by auto-calculating a bunch of statistics and providing roll macros, as well as a detailed character sheet.

![Character Sheet](https://i.imgur.com/LxkPHVS.png)

## Changelog And Roadmap

> ⚠️ This project is unfinished and may update with breaking changes.

**Currently, you can play wihtout having to resort to tracking character infromation separately in a notebook or a PDF.**

Here is an incomplete roadmap of the project:

- ✅ Auto-calculation of SPECIAL, Skills, Tagged Skills, Secondary Statistics
- ✅ Leveling Up, Tracking of Experience and Karma
- ✅ Macros for SPECIAL and Skill checks
- ✅ Custom Item Inventory, Automatic weight calculation
- ✅ Basic Enemy Sheet
- ✅ Notes and Character Bio
- ✅ Basic Combat Tracker
- 🛠️ Sheets for Weapons and Armor, Vehicles
- 🛠️ Trait and Perk Compendiums
- 🛠️ Weapon, Armor and Item Compendiums
- 🛠️ Expanded GM Tools

## Licenses

**Project Licensing:**

- All HTML, CSS and Javascript in this project is licensed under the MIT License.

**Content Usage and Licensing:**

- Fallout PnP created by Jason Mical.
- Some names and images are copyright Bethesda Softworks LLC, a ZeniMax Media company.
- Overseer Font by [Pixel Sagas](https://www.pixelsagas.com/?page_id=8484).

**Virtual Table Top Platform License:**

- This Game System for [Foundry Virtual Tabletop](https://foundryvtt.com/) is licensed under the [Limited License Agreement for module development 03/02/2023](https://foundryvtt.com/article/license/).

## Contributing

If you are a developer, pull requests are welcome.

If you are not a developer, you can still help by providing feedback on the system, reporting bugs, or suggesting improvements - just open a github issue in the Issues tab. Or consider [getting into development](https://foundryvtt.wiki/en/development/guides/SD-tutorial)!

## Setup
The only dependency of the project is [SASS](https://sass-lang.com/), which is used to simplify styling of the character sheets files. When deciding to make styling changes, you will need to compile the SASS files into CSS files. To do this:

Install dependencies:
1. [git](https://git-scm.com/)
1. [Node.js](https://nodejs.org/en/)
2. [pnpm](https://pnpm.io/)

Make sure you have a local Foundry VTT installtion.

Clone the repo into a local folder in your dev environment:

```bash
git clone https://github.com/FedorFadeev/falloutpnp.git
```

<details>
<summary>Where to clone the folder?</summary>

<br/>

For Windows development, we recommend cloning the repo directly to the Foundry VTT Data folder, which is typically located at `C:\Users\<username>\AppData\Local\FoundryVTT\Data\systems\`.

If you're on MacOS, Linux or using WSL2, you can clone the repo to a different location and symlink the system folder to the Foundry VTT Data folder:

```bash
ln -s /path/to/falloutpnp /path/to/foundryvtt/Data/systems/falloutpnp
```
</details>

<br/>

From within the folder, install dependencies with pnpm.

```bash
pnpm i
```

And run automatic compiling of SASS files with:

```bash
pnpm dev
```
