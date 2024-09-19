const accessoriesData = [
  {
    item_type: "accessories",
    upgrade_level: 0,
    id: 1,
    name: "Mystic Amulet",
    type: "Necklace",
    critRate: 0.05, // Lower critRate
    critDamage: 0.1, // Lower critDamage
    mp: 4,
    price: 100, // Adjusted price
  },
  {
    item_type: "accessories",
    upgrade_level: 0,
    id: 2,
    name: "Dragon Ring",
    type: "Ring",
    critRate: 0.08, // Lower critRate
    critDamage: 0.15, // Lower critDamage
    mp: 6,
    price: 140, // Adjusted price
  },
  {
    item_type: "accessories",
    upgrade_level: 0,
    id: 3,
    name: "Elven Bracelet",
    type: "Bracelet",
    critRate: 0.06, // Lower critRate
    critDamage: 0.12, // Lower critDamage
    mp: 3,
    price: 90, // Adjusted price
  },
  {
    item_type: "accessories",
    upgrade_level: 0,
    id: 4,
    name: "Warrior's Belt",
    type: "Belt",
    critRate: 0.07, // Lower critRate
    critDamage: 0.1, // Lower critDamage
    mp: 5,
    price: 130, // Adjusted price
  },
  {
    item_type: "accessories",
    upgrade_level: 0,
    id: 5,
    name: "Guardian Pendant",
    type: "Necklace",
    critRate: 0.1, // Lower critRate
    critDamage: 0.2, // Lower critDamage
    mp: 6,
    price: 180, // Adjusted price
  },
  {
    item_type: "accessories",
    upgrade_level: 0,
    id: 6,
    name: "Sorcerer's Ring",
    type: "Ring",
    critRate: 0.12, // Lower critRate
    critDamage: 0.25, // Lower critDamage
    mp: 8,
    price: 220, // Adjusted price
  },
  {
    item_type: "accessories",
    upgrade_level: 0,
    id: 7,
    name: "Assassin's Bracelet",
    type: "Bracelet",
    critRate: 0.1, // Lower critRate
    critDamage: 0.22, // Lower critDamage
    mp: 5,
    price: 150, // Adjusted price
  },
  {
    item_type: "accessories",
    upgrade_level: 0,
    id: 8,
    name: "Berserker's Belt",
    type: "Belt",
    critRate: 0.08, // Lower critRate
    critDamage: 0.18, // Lower critDamage
    mp: 4,
    price: 120, // Adjusted price
  },
  {
    item_type: "accessories",
    upgrade_level: 0,
    id: 9,
    name: "Mystic Earring",
    type: "Earring",
    critRate: 0.05, // Lower critRate
    critDamage: 0.1, // Lower critDamage
    mp: 2,
    price: 70, // Adjusted price
  },
  {
    item_type: "accessories",
    upgrade_level: 0,
    id: 10,
    name: "Celestial Pendant",
    type: "Necklace",
    critRate: 0.12, // Lower critRate
    critDamage: 0.25, // Lower critDamage
    mp: 10,
    price: 250, // Adjusted price
  },
  {
    item_type: "accessories",
    upgrade_level: 0,
    id: 11,
    name: "Enchanted Ring",
    type: "Ring",
    critRate: 0.07, // Lower critRate
    critDamage: 0.18, // Lower critDamage
    mp: 5,
    price: 110, // Adjusted price
  },
  {
    item_type: "accessories",
    upgrade_level: 0,
    id: 12,
    name: "Arcane Bracelet",
    type: "Bracelet",
    critRate: 0.08, // Lower critRate
    critDamage: 0.2, // Lower critDamage
    mp: 6,
    price: 140, // Adjusted price
  },
  {
    item_type: "accessories",
    upgrade_level: 0,
    id: 13,
    name: "Shadow Belt",
    type: "Belt",
    critRate: 0.09, // Lower critRate
    critDamage: 0.22, // Lower critDamage
    mp: 5,
    price: 130, // Adjusted price
  },
  {
    item_type: "accessories",
    upgrade_level: 0,
    id: 14,
    name: "Valor Pendant",
    type: "Necklace",
    critRate: 0.1, // Lower critRate
    critDamage: 0.23, // Lower critDamage
    mp: 8,
    price: 180, // Adjusted price
  },
  {
    item_type: "accessories",
    upgrade_level: 0,
    id: 15,
    name: "Tempest Ring",
    type: "Ring",
    critRate: 0.09, // Lower critRate
    critDamage: 0.2, // Lower critDamage
    mp: 7,
    price: 160, // Adjusted price
  },
  {
    item_type: "accessories",
    upgrade_level: 0,
    id: 16,
    name: "Frost Bracelet",
    type: "Bracelet",
    critRate: 0.07, // Lower critRate
    critDamage: 0.18, // Lower critDamage
    mp: 4,
    price: 120, // Adjusted price
  },
  {
    item_type: "accessories",
    upgrade_level: 0,
    id: 17,
    name: "Vortex Belt",
    type: "Belt",
    critRate: 0.08, // Lower critRate
    critDamage: 0.2, // Lower critDamage
    mp: 6,
    price: 150, // Adjusted price
  },
  {
    item_type: "accessories",
    upgrade_level: 0,
    id: 18,
    name: "Inferno Pendant",
    type: "Necklace",
    critRate: 0.15, // Lower critRate
    critDamage: 0.35, // Lower critDamage
    mp: 10,
    price: 280, // Adjusted price
  },
  {
    item_type: "accessories",
    upgrade_level: 0,
    id: 19,
    name: "Eclipse Ring",
    type: "Ring",
    critRate: 0.1, // Lower critRate
    critDamage: 0.22, // Lower critDamage
    mp: 6,
    price: 140, // Adjusted price
  },
  {
    item_type: "accessories",
    upgrade_level: 0,
    id: 20,
    name: "Echo Bracelet",
    type: "Bracelet",
    critRate: 0.11, // Lower critRate
    critDamage: 0.25, // Lower critDamage
    mp: 7,
    price: 160, // Adjusted price
  },
  {
    item_type: "accessories",
    upgrade_level: 0,
    id: 21,
    name: "Thunder Belt",
    type: "Belt",
    critRate: 0.1, // Lower critRate
    critDamage: 0.22, // Lower critDamage
    mp: 5,
    price: 150, // Adjusted price
  },
  {
    item_type: "accessories",
    upgrade_level: 0,
    id: 22,
    name: "Phoenix Pendant",
    type: "Necklace",
    critRate: 0.16, // Lower critRate
    critDamage: 0.38, // Lower critDamage
    mp: 12,
    price: 300, // Adjusted price
  },
  {
    item_type: "accessories",
    upgrade_level: 0,
    id: 23,
    name: "Wraith Ring",
    type: "Ring",
    critRate: 0.11, // Lower critRate
    critDamage: 0.28, // Lower critDamage
    mp: 8,
    price: 160, // Adjusted price
  },
  {
    item_type: "accessories",
    upgrade_level: 0,
    id: 24,
    name: "Dragonfire Bracelet",
    type: "Bracelet",
    critRate: 0.12, // Lower critRate
    critDamage: 0.3, // Lower critDamage
    mp: 8,
    price: 200, // Adjusted price
  },
  {
    item_type: "accessories",
    upgrade_level: 0,
    id: 25,
    name: "Fury Belt",
    type: "Belt",
    critRate: 0.07, // Lower critRate
    critDamage: 0.2, // Lower critDamage
    mp: 4,
    price: 120, // Adjusted price
  },
];

export default accessoriesData;
