const weaponData = [
  // Swords
  { id: 1, name: "Iron Sword", type: "Sword", atk: 20, mp: 0, price: 150, critRate: 0.1, critDamage: 1.25, upgrade_level: 0, item_type: "weapon", rank: "C" },
  { id: 2, name: "Steel Sword", type: "Sword", atk: 30, mp: 0, price: 300, critRate: 0.15, critDamage: 1.3, upgrade_level: 0, item_type: "weapon", rank: "UC" },
  { id: 3, name: "Golden Sword", type: "Sword", atk: 40, mp: 0, price: 500, critRate: 0.2, critDamage: 1.35, upgrade_level: 0, item_type: "weapon", rank: "R" },
  { id: 4, name: "Platinum Sword", type: "Sword", atk: 50, mp: 0, price: 800, critRate: 0.25, critDamage: 1.4, upgrade_level: 0, item_type: "weapon", rank: "SR" },
  { id: 5, name: "Divine Sword", type: "Sword", atk: 70, mp: 0, price: 1200, critRate: 0.3, critDamage: 1.5, upgrade_level: 0, item_type: "weapon", rank: "SSR" },
  { id: 66, name: "Ethereal Sword", type: "Sword", atk: 100, mp: 0, price: 2000, critRate: 0.35, critDamage: 1.6, upgrade_level: 0, item_type: "weapon", rank: "UR" },

  // Daggers
  { id: 6, name: "Iron Dagger", type: "Dagger", atk: 15, mp: 0, price: 100, critRate: 0.2, critDamage: 1.2, upgrade_level: 0, item_type: "weapon", rank: "C" },
  { id: 7, name: "Steel Dagger", type: "Dagger", atk: 25, mp: 0, price: 250, critRate: 0.25, critDamage: 1.25, upgrade_level: 0, item_type: "weapon", rank: "UC" },
  { id: 8, name: "Golden Dagger", type: "Dagger", atk: 35, mp: 0, price: 450, critRate: 0.3, critDamage: 1.3, upgrade_level: 0, item_type: "weapon", rank: "R" },
  { id: 9, name: "Platinum Dagger", type: "Dagger", atk: 45, mp: 0, price: 700, critRate: 0.35, critDamage: 1.35, upgrade_level: 0, item_type: "weapon", rank: "SR" },
  { id: 10, name: "Divine Dagger", type: "Dagger", atk: 60, mp: 0, price: 1000, critRate: 0.4, critDamage: 1.5, upgrade_level: 0, item_type: "weapon", rank: "SSR" },
  { id: 67, name: "Shadow Dagger", type: "Dagger", atk: 80, mp: 0, price: 1800, critRate: 0.45, critDamage: 1.7, upgrade_level: 0, item_type: "weapon", rank: "UR" },

  // Hammers
  { id: 11, name: "Iron Hammer", type: "Hammer", atk: 25, mp: 0, price: 200, critRate: 0.1, critDamage: 1.25, upgrade_level: 0, item_type: "weapon", rank: "C" },
  { id: 12, name: "Steel Hammer", type: "Hammer", atk: 35, mp: 0, price: 400, critRate: 0.15, critDamage: 1.3, upgrade_level: 0, item_type: "weapon", rank: "UC" },
  { id: 13, name: "Golden Hammer", type: "Hammer", atk: 50, mp: 0, price: 600, critRate: 0.2, critDamage: 1.35, upgrade_level: 0, item_type: "weapon", rank: "R" },
  { id: 14, name: "Platinum Hammer", type: "Hammer", atk: 70, mp: 0, price: 900, critRate: 0.25, critDamage: 1.4, upgrade_level: 0, item_type: "weapon", rank: "SR" },
  { id: 15, name: "Divine Hammer", type: "Hammer", atk: 90, mp: 0, price: 1400, critRate: 0.3, critDamage: 1.5, upgrade_level: 0, item_type: "weapon", rank: "SSR" },
  { id: 68, name: "Titan Hammer", type: "Hammer", atk: 120, mp: 0, price: 2500, critRate: 0.35, critDamage: 1.8, upgrade_level: 0, item_type: "weapon", rank: "UR" },

  // Bows
  { id: 16, name: "Wooden Bow", type: "Bow", atk: 15, mp: 0, price: 100, critRate: 0.1, critDamage: 1.2, upgrade_level: 0, item_type: "weapon", rank: "C" },
  { id: 17, name: "Steel Bow", type: "Bow", atk: 25, mp: 0, price: 300, critRate: 0.15, critDamage: 1.25, upgrade_level: 0, item_type: "weapon", rank: "UC" },
  { id: 18, name: "Golden Bow", type: "Bow", atk: 35, mp: 0, price: 500, critRate: 0.2, critDamage: 1.3, upgrade_level: 0, item_type: "weapon", rank: "R" },
  { id: 19, name: "Platinum Bow", type: "Bow", atk: 50, mp: 0, price: 800, critRate: 0.25, critDamage: 1.4, upgrade_level: 0, item_type: "weapon", rank: "SR" },
  { id: 20, name: "Divine Bow", type: "Bow", atk: 70, mp: 0, price: 1200, critRate: 0.3, critDamage: 1.5, upgrade_level: 0, item_type: "weapon", rank: "SSR" },
  { id: 69, name: "Celestial Bow", type: "Bow", atk: 100, mp: 0, price: 2000, critRate: 0.4, critDamage: 1.7, upgrade_level: 0, item_type: "weapon", rank: "UR" },

  // Staffs
  { id: 22, name: "Wooden Staff", type: "Staff", atk: 15, mp: 0, price: 120, critRate: 0.1, critDamage: 1.2, upgrade_level: 0, item_type: "weapon", rank: "C" },
  { id: 23, name: "Steel Staff", type: "Staff", atk: 25, mp: 0, price: 300, critRate: 0.15, critDamage: 1.25, upgrade_level: 0, item_type: "weapon", rank: "UC" },
  { id: 24, name: "Golden Staff", type: "Staff", atk: 35, mp: 0, price: 500, critRate: 0.2, critDamage: 1.3, upgrade_level: 0, item_type: "weapon", rank: "R" },
  { id: 25, name: "Platinum Staff", type: "Staff", atk: 50, mp: 0, price: 800, critRate: 0.25, critDamage: 1.4, upgrade_level: 0, item_type: "weapon", rank: "SR" },
  { id: 26, name: "Divine Staff", type: "Staff", atk: 70, mp: 0, price: 1200, critRate: 0.3, critDamage: 1.5, upgrade_level: 0, item_type: "weapon", rank: "SSR" },
  { id: 70, name: "Arcane Staff", type: "Staff", atk: 100, mp: 0, price: 2200, critRate: 0.35, critDamage: 1.8, upgrade_level: 0, item_type: "weapon", rank: "UR" },

  // Spears
  { id: 27, name: "Wooden Spear", type: "Spear", atk: 20, mp: 0, price: 140, critRate: 0.1, critDamage: 1.25, upgrade_level: 0, item_type: "weapon", rank: "C" },
  { id: 28, name: "Steel Spear", type: "Spear", atk: 30, mp: 0, price: 300, critRate: 0.15, critDamage: 1.3, upgrade_level: 0, item_type: "weapon", rank: "UC" },
  { id: 29, name: "Golden Spear", type: "Spear", atk: 40, mp: 0, price: 500, critRate: 0.2, critDamage: 1.35, upgrade_level: 0, item_type: "weapon", rank: "R" },
  { id: 30, name: "Platinum Spear", type: "Spear", atk: 50, mp: 0, price: 800, critRate: 0.25, critDamage: 1.4, upgrade_level: 0, item_type: "weapon", rank: "SR" },
  { id: 31, name: "Divine Spear", type: "Spear", atk: 70, mp: 0, price: 1200, critRate: 0.3, critDamage: 1.5, upgrade_level: 0, item_type: "weapon", rank: "SSR" },
  { id: 71, name: "Dragon Spear", type: "Spear", atk: 100, mp: 0, price: 2400, critRate: 0.4, critDamage: 1.8, upgrade_level: 0, item_type: "weapon", rank: "UR" },

  // Maces
  { id: 32, name: "Wooden Mace", type: "Mace", atk: 25, mp: 0, price: 200, critRate: 0.1, critDamage: 1.25, upgrade_level: 0, item_type: "weapon", rank: "C" },
  { id: 33, name: "Steel Mace", type: "Mace", atk: 35, mp: 0, price: 400, critRate: 0.15, critDamage: 1.3, upgrade_level: 0, item_type: "weapon", rank: "UC" },
  { id: 34, name: "Golden Mace", type: "Mace", atk: 50, mp: 0, price: 600, critRate: 0.2, critDamage: 1.35, upgrade_level: 0, item_type: "weapon", rank: "R" },
  { id: 35, name: "Platinum Mace", type: "Mace", atk: 70, mp: 0, price: 900, critRate: 0.25, critDamage: 1.4, upgrade_level: 0, item_type: "weapon", rank: "SR" },
  { id: 36, name: "Divine Mace", type: "Mace", atk: 90, mp: 0, price: 1400, critRate: 0.3, critDamage: 1.5, upgrade_level: 0, item_type: "weapon", rank: "SSR" },
  { id: 72, name: "Holy Mace", type: "Mace", atk: 120, mp: 0, price: 2600, critRate: 0.35, critDamage: 1.9, upgrade_level: 0, item_type: "weapon", rank: "UR" },

  // Halberds
  { id: 37, name: "Iron Halberd", type: "Halberd", atk: 30, mp: 0, price: 220, critRate: 0.1, critDamage: 1.25, upgrade_level: 0, item_type: "weapon", rank: "C" },
  { id: 38, name: "Steel Halberd", type: "Halberd", atk: 45, mp: 0, price: 400, critRate: 0.15, critDamage: 1.3, upgrade_level: 0, item_type: "weapon", rank: "UC" },
  { id: 39, name: "Golden Halberd", type: "Halberd", atk: 60, mp: 0, price: 600, critRate: 0.2, critDamage: 1.35, upgrade_level: 0, item_type: "weapon", rank: "R" },
  { id: 40, name: "Platinum Halberd", type: "Halberd", atk: 80, mp: 0, price: 900, critRate: 0.25, critDamage: 1.4, upgrade_level: 0, item_type: "weapon", rank: "SR" },
  { id: 41, name: "Divine Halberd", type: "Halberd", atk: 100, mp: 0, price: 1400, critRate: 0.3, critDamage: 1.5, upgrade_level: 0, item_type: "weapon", rank: "SSR" },
  { id: 73, name: "Eldritch Halberd", type: "Halberd", atk: 130, mp: 0, price: 2800, critRate: 0.4, critDamage: 2.0, upgrade_level: 0, item_type: "weapon", rank: "UR" },

  // Whips
  { id: 42, name: "Leather Whip", type: "Whip", atk: 20, mp: 0, price: 120, critRate: 0.1, critDamage: 1.2, upgrade_level: 0, item_type: "weapon", rank: "C" },
  { id: 43, name: "Steel Whip", type: "Whip", atk: 30, mp: 0, price: 300, critRate: 0.15, critDamage: 1.25, upgrade_level: 0, item_type: "weapon", rank: "UC" },
  { id: 44, name: "Golden Whip", type: "Whip", atk: 45, mp: 0, price: 500, critRate: 0.2, critDamage: 1.3, upgrade_level: 0, item_type: "weapon", rank: "R" },
  { id: 45, name: "Platinum Whip", type: "Whip", atk: 60, mp: 0, price: 800, critRate: 0.25, critDamage: 1.4, upgrade_level: 0, item_type: "weapon", rank: "SR" },
  { id: 46, name: "Divine Whip", type: "Whip", atk: 80, mp: 0, price: 1200, critRate: 0.3, critDamage: 1.5, upgrade_level: 0, item_type: "weapon", rank: "SSR" },
  { id: 74, name: "Phantom Whip", type: "Whip", atk: 110, mp: 0, price: 2400, critRate: 0.35, critDamage: 1.9, upgrade_level: 0, item_type: "weapon", rank: "UR" },

  // Lances
  { id: 47, name: "Iron Lance", type: "Lance", atk: 30, mp: 0, price: 200, critRate: 0.1, critDamage: 1.25, upgrade_level: 0, item_type: "weapon", rank: "C" },
  { id: 48, name: "Steel Lance", type: "Lance", atk: 45, mp: 0, price: 400, critRate: 0.15, critDamage: 1.3, upgrade_level: 0, item_type: "weapon", rank: "UC" },
  { id: 49, name: "Golden Lance", type: "Lance", atk: 60, mp: 0, price: 600, critRate: 0.2, critDamage: 1.35, upgrade_level: 0, item_type: "weapon", rank: "R" },
  { id: 50, name: "Platinum Lance", type: "Lance", atk: 80, mp: 0, price: 900, critRate: 0.25, critDamage: 1.4, upgrade_level: 0, item_type: "weapon", rank: "SR" },
  { id: 51, name: "Divine Lance", type: "Lance", atk: 100, mp: 0, price: 1400, critRate: 0.3, critDamage: 1.5, upgrade_level: 0, item_type: "weapon", rank: "SSR" },
  { id: 75, name: "Legendary Lance", type: "Lance", atk: 130, mp: 0, price: 3000, critRate: 0.4, critDamage: 2.1, upgrade_level: 0, item_type: "weapon", rank: "UR" },

  // Scythes
  { id: 52, name: "Iron Scythe", type: "Scythe", atk: 35, mp: 0, price: 220, critRate: 0.1, critDamage: 1.25, upgrade_level: 0, item_type: "weapon", rank: "C" },
  { id: 53, name: "Steel Scythe", type: "Scythe", atk: 50, mp: 0, price: 400, critRate: 0.15, critDamage: 1.3, upgrade_level: 0, item_type: "weapon", rank: "UC" },
  { id: 54, name: "Golden Scythe", type: "Scythe", atk: 65, mp: 0, price: 600, critRate: 0.2, critDamage: 1.35, upgrade_level: 0, item_type: "weapon", rank: "R" },
  { id: 55, name: "Platinum Scythe", type: "Scythe", atk: 80, mp: 0, price: 900, critRate: 0.25, critDamage: 1.4, upgrade_level: 0, item_type: "weapon", rank: "SR" },
  { id: 56, name: "Divine Scythe", type: "Scythe", atk: 100, mp: 0, price: 1400, critRate: 0.3, critDamage: 1.5, upgrade_level: 0, item_type: "weapon", rank: "SSR" },
  { id: 76, name: "Grim Reaper Scythe", type: "Scythe", atk: 150, mp: 0, price: 3500, critRate: 0.45, critDamage: 2.5, upgrade_level: 0, item_type: "weapon", rank: "UR" },

  // Wands
  { id: 57, name: "Wooden Wand", type: "Wand", atk: 10, mp: 10, price: 100, critRate: 0.1, critDamage: 1.2, upgrade_level: 0, item_type: "weapon", rank: "C" },
  { id: 58, name: "Steel Wand", type: "Wand", atk: 15, mp: 15, price: 250, critRate: 0.15, critDamage: 1.25, upgrade_level: 0, item_type: "weapon", rank: "UC" },
  { id: 59, name: "Golden Wand", type: "Wand", atk: 20, mp: 20, price: 400, critRate: 0.2, critDamage: 1.3, upgrade_level: 0, item_type: "weapon", rank: "R" },
  { id: 60, name: "Platinum Wand", type: "Wand", atk: 30, mp: 30, price: 600, critRate: 0.25, critDamage: 1.35, upgrade_level: 0, item_type: "weapon", rank: "SR" },
  { id: 61, name: "Divine Wand", type: "Wand", atk: 40, mp: 50, price: 800, critRate: 0.3, critDamage: 1.5, upgrade_level: 0, item_type: "weapon", rank: "SSR" },
  { id: 77, name: "Sorcerer's Wand", type: "Wand", atk: 70, mp: 100, price: 2000, critRate: 0.4, critDamage: 2.0, upgrade_level: 0, item_type: "weapon", rank: "UR" },

  // Katars
  { id: 62, name: "Iron Katar", type: "Katar", atk: 20, mp: 0, price: 150, critRate: 0.1, critDamage: 1.25, upgrade_level: 0, item_type: "weapon", rank: "C" },
  { id: 63, name: "Steel Katar", type: "Katar", atk: 30, mp: 0, price: 300, critRate: 0.15, critDamage: 1.3, upgrade_level: 0, item_type: "weapon", rank: "UC" },
  { id: 64, name: "Golden Katar", type: "Katar", atk: 40, mp: 0, price: 500, critRate: 0.2, critDamage: 1.35, upgrade_level: 0, item_type: "weapon", rank: "R" },
  { id: 65, name: "Platinum Katar", type: "Katar", atk: 50, mp: 0, price: 800, critRate: 0.25, critDamage: 1.4, upgrade_level: 0, item_type: "weapon", rank: "SR" },
  { id: 78, name: "Celestial Katar", type: "Katar", atk: 80, mp: 0, price: 1500, critRate: 0.35, critDamage: 1.7, upgrade_level: 0, item_type: "weapon", rank: "UR" },

  { id: 79, name: "Iron Blade", type: "Blade", atk: 25, mp: 0, price: 180, critRate: 0.1, critDamage: 1.2, upgrade_level: 0, item_type: "weapon", rank: "C" },
  { id: 80, name: "Steel Blade", type: "Blade", atk: 35, mp: 0, price: 350, critRate: 0.15, critDamage: 1.25, upgrade_level: 0, item_type: "weapon", rank: "UC" },
  { id: 81, name: "Golden Blade", type: "Blade", atk: 50, mp: 0, price: 600, critRate: 0.2, critDamage: 1.35, upgrade_level: 0, item_type: "weapon", rank: "R" },
  { id: 82, name: "Platinum Blade", type: "Blade", atk: 70, mp: 0, price: 900, critRate: 0.25, critDamage: 1.4, upgrade_level: 0, item_type: "weapon", rank: "SR" },
  { id: 83, name: "Divine Blade", type: "Blade", atk: 90, mp: 0, price: 1300, critRate: 0.3, critDamage: 1.5, upgrade_level: 0, item_type: "weapon", rank: "SSR" },
  { id: 84, name: "Eternal Blade", type: "Blade", atk: 120, mp: 0, price: 2500, critRate: 0.4, critDamage: 2.0, upgrade_level: 0, item_type: "weapon", rank: "UR" },
];


export default weaponData;
