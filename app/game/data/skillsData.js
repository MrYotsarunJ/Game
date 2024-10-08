const skillsData = [
  {
    id: 1,
    name: "Attack",
    damage: 0,
    heal: 0,
    mpCost: 0,
    type: "Attack",
    level: 1,
    can_upgrade: false,
    weaponType: null,
  },
  {
    id: 2,
    name: "Sword Slash",
    damage: 15,
    heal: 0,
    mpCost: 5,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Sword",
  },
  {
    id: 3,
    name: "Dagger Strike",
    damage: 12,
    heal: 0,
    mpCost: 3,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Dagger",
  },
  {
    id: 4,
    name: "Hammer Smash",
    damage: 18,
    heal: 0,
    mpCost: 6,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Hammer",
  },
  {
    id: 5,
    name: "Axe Cleave",
    damage: 20,
    heal: 0,
    mpCost: 7,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Axe",
  },
  {
    id: 6,
    name: "Bow Shot",
    damage: 14,
    heal: 0,
    mpCost: 4,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Bow",
  },
  {
    id: 7,
    name: "Staff Blast",
    damage: 16,
    heal: 0,
    mpCost: 5,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Staff",
  },
  {
    id: 8,
    name: "Spear Thrust",
    damage: 17,
    heal: 0,
    mpCost: 5,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Spear",
  },
  {
    id: 9,
    name: "Mace Crush",
    damage: 19,
    heal: 0,
    mpCost: 6,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Mace",
  },
  {
    id: 10,
    name: "Halberd Sweep",
    damage: 21,
    heal: 0,
    mpCost: 7,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Halberd",
  },
  {
    id: 11,
    name: "Whip Lash",
    damage: 13,
    heal: 0,
    mpCost: 4,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Whip",
  },
  {
    id: 12,
    name: "Lance Charge",
    damage: 22,
    heal: 0,
    mpCost: 8,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Lance",
  },
  {
    id: 13,
    name: "Scythe Slash",
    damage: 20,
    heal: 0,
    mpCost: 7,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Scythe",
  },
  {
    id: 14,
    name: "Wand Flick",
    damage: 10,
    heal: 0,
    mpCost: 3,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Wand",
  },
  {
    id: 15,
    name: "Katana Strike",
    damage: 25,
    heal: 0,
    mpCost: 9,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Katana",
  },
  {
    id: 16,
    name: "Katar Slice",
    damage: 11,
    heal: 0,
    mpCost: 3,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Katar",
  },
  {
    id: 17,
    name: "Blade Dance",
    damage: 24,
    heal: 0,
    mpCost: 8,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Blade",
  },
  {
    id: 18,
    name: "Spear Toss",
    damage: 19,
    heal: 0,
    mpCost: 4,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Spear",
  },
  {
    id: 19,
    name: "Mace Slam",
    damage: 22,
    heal: 0,
    mpCost: 6,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Mace",
  },
  {
    id: 20,
    name: "Halberd Charge",
    damage: 24,
    heal: 0,
    mpCost: 7,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Halberd",
  },
  {
    id: 21,
    name: "Whip Crack",
    damage: 14,
    heal: 0,
    mpCost: 3,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Whip",
  },
  {
    id: 22,
    name: "Lance Impale",
    damage: 26,
    heal: 0,
    mpCost: 8,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Lance",
  },
  {
    id: 23,
    name: "Scythe Reap",
    damage: 28,
    heal: 0,
    mpCost: 9,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Scythe",
  },
  {
    id: 24,
    name: "Wand Surge",
    damage: 12,
    heal: 0,
    mpCost: 4,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Wand",
  },
  {
    id: 25,
    name: "Katana Flash",
    damage: 30,
    heal: 0,
    mpCost: 10,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Katana",
  },
  {
    id: 26,
    name: "Katar Slash",
    damage: 18,
    heal: 0,
    mpCost: 5,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Katar",
  },
  {
    id: 27,
    name: "Blade Whirl",
    damage: 27,
    heal: 0,
    mpCost: 8,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Blade",
  },
  {
    id: 28,
    name: "Bow Barrage",
    damage: 25,
    heal: 0,
    mpCost: 7,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Bow",
  },
  {
    id: 29,
    name: "Staff Whirl",
    damage: 20,
    heal: 0,
    mpCost: 6,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Staff",
  },
  {
    id: 30,
    name: "Sword Spin",
    damage: 22,
    heal: 0,
    mpCost: 7,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Sword",
  },
  {
    id: 31,
    name: "Dagger Dance",
    damage: 19,
    heal: 0,
    mpCost: 5,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Dagger",
  },
  {
    id: 32,
    name: "Hammer Crush",
    damage: 25,
    heal: 0,
    mpCost: 8,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Hammer",
  },
  {
    id: 33,
    name: "Axe Fury",
    damage: 28,
    heal: 0,
    mpCost: 9,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Axe",
  },
  {
    id: 34,
    name: "Bow Barrage",
    damage: 30,
    heal: 0,
    mpCost: 10,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Bow",
  },
  {
    id: 35,
    name: "Staff Strike",
    damage: 23,
    heal: 0,
    mpCost: 6,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Staff",
  },
  {
    id: 36,
    name: "Spear Sweep",
    damage: 21,
    heal: 0,
    mpCost: 7,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Spear",
  },
  {
    id: 37,
    name: "Mace Smash",
    damage: 24,
    heal: 0,
    mpCost: 8,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Mace",
  },
  {
    id: 38,
    name: "Halberd Strike",
    damage: 26,
    heal: 0,
    mpCost: 9,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Halberd",
  },
  {
    id: 39,
    name: "Whip Whirl",
    damage: 18,
    heal: 0,
    mpCost: 5,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Whip",
  },
  {
    id: 40,
    name: "Lance Bash",
    damage: 27,
    heal: 0,
    mpCost: 9,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Lance",
  },
  {
    id: 41,
    name: "Scythe Reap",
    damage: 29,
    heal: 0,
    mpCost: 10,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Scythe",
  },
  {
    id: 42,
    name: "Wand Blast",
    damage: 15,
    heal: 0,
    mpCost: 4,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Wand",
  },
  {
    id: 43,
    name: "Katana Wave",
    damage: 32,
    heal: 0,
    mpCost: 11,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Katana",
  },
  {
    id: 44,
    name: "Katar Thrust",
    damage: 20,
    heal: 0,
    mpCost: 6,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Katar",
  },
  {
    id: 45,
    name: "Blade Storm",
    damage: 33,
    heal: 0,
    mpCost: 12,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Blade",
  },
  {
    id: 46,
    name: "Spear Rush",
    damage: 22,
    heal: 0,
    mpCost: 7,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Spear",
  },
  {
    id: 47,
    name: "Mace Fury",
    damage: 25,
    heal: 0,
    mpCost: 8,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Mace",
  },
  {
    id: 48,
    name: "Halberd Swing",
    damage: 28,
    heal: 0,
    mpCost: 9,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Halberd",
  },
  {
    id: 49,
    name: "Whip Sear",
    damage: 19,
    heal: 0,
    mpCost: 6,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Whip",
  },
  {
    id: 50,
    name: "Lance Lunge",
    damage: 30,
    heal: 0,
    mpCost: 10,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Lance",
  },
  {
    id: 51,
    name: "Scythe Spiral",
    damage: 31,
    heal: 0,
    mpCost: 11,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Scythe",
  },
  {
    id: 52,
    name: "Wand Wave",
    damage: 17,
    heal: 0,
    mpCost: 5,
    type: "Attack",
    level: 1,
    can_upgrade: true,
    weaponType: "Wand",
  },
];

export default skillsData;
