"use client"; // Ensure this is the first line

import { Tabs } from "antd";
import { useState, useEffect, createContext, useContext } from "react";

// Import data and components
import enemiesData from "./data/enemiesData";
import skillsData from "./data/skillsData";
import baseCharacterData from "./data/baseCharacterData";
import inventoryData from "./data/inventoryData";
import weaponData from "./data/weaponData";
import accessoriesData from "./data/accessoriesData";
import equipmentData from "./data/equipmentData";
import armorData from "./data/armorData";
import characterStatusUpgradeData from "./data/characterStatusUpgradeData";
import potionData from "./data/potionData";

import upgradeStats_armor_data from "./data/upgradeStats_armor";
import upgradeStats_weapon_data from "./data/upgradeStats_weapon";
import upgradeStats_data from "./data/upgradeStats";
import upgradeStats_enemies_data from "./data/upgradeStats_enemies";

import CharacterStatus from "./components/CharacterStatus";
import Skills from "./components/Skills";
import ItemShop from "./components/ItemShop";
import Combat from "./components/Combat";

// Create and provide context
const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [baseCharacter, setBaseCharacterData] = useState(baseCharacterData);
  const [characterStatusUpgrade, setCharacterStatusUpgradeData] = useState(
    characterStatusUpgradeData
  );
  const [inventory, setInventoryData] = useState(inventoryData);
  const [equipment, setEquipmentData] = useState(equipmentData);

  const [weapon, setWeaponData] = useState(weaponData);
  const [accessories, setAccessoriesData] = useState(accessoriesData);
  const [armor, setArmorData] = useState(armorData);

  // Compute derived character state
  const [character, setCharacter] = useState(() =>
    computeCharacter(
      baseCharacterData,
      characterStatusUpgrade,
      equipment,
      weapon,
      accessories,
      armor
    )
  );

  useEffect(() => {
    setCharacter(
      computeCharacter(
        baseCharacter,
        characterStatusUpgrade,
        equipment,
        weapon,
        accessories,
        armor
      )
    );
  }, [
    baseCharacter,
    characterStatusUpgrade,
    equipment,
    weapon,
    accessories,
    armor,
  ]);

  return (
    <GameContext.Provider
      value={{
        character,
        setCharacter,
        baseCharacter,
        setBaseCharacterData,
        inventory,
        setInventoryData,
        equipment,
        setEquipmentData,
        characterStatusUpgrade,
        setCharacterStatusUpgradeData,
        weapon,
        accessories,
        armor,
        setWeaponData,
        setAccessoriesData,
        setArmorData,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

// Custom Hook for Context
const useGameContext = () => useContext(GameContext);

// Compute function for character stats
const computeCharacter = (
  baseCharacter,
  statusUpgrade,
  equipment,
  weapon,
  accessories,
  armor
) => {
  const equippedWeapon = equipment.use_weapon
    ? weapon.find((item) => item.id === equipment.use_weapon)
    : null;
  const equippedArmor = equipment.use_armor
    ? armor.find((item) => item.id === equipment.use_armor)
    : null;
  const equippedAccessory = equipment.use_accessories
    ? accessories.find((item) => item.id === equipment.use_accessories)
    : null;

  return {
    ...baseCharacter,
    ...statusUpgrade,
    hp: baseCharacter.hp + statusUpgrade.hp + (equippedArmor?.hp || 0),
    mp:
      baseCharacter.mp +
      statusUpgrade.mp +
      (equippedWeapon?.mp || 0) +
      (equippedAccessory?.mp || 0),
    atk: baseCharacter.atk + statusUpgrade.atk + (equippedWeapon?.atk || 0),
    def: baseCharacter.def + statusUpgrade.def + (equippedArmor?.def || 0),
    critRate: Math.min(
      baseCharacter.critRate +
        (equippedAccessory?.critRate || 0) +
        (equippedWeapon?.critRate || 0),
      1
    ),
    critDamage: Math.min(
      baseCharacter.critDamage +
        (equippedAccessory?.critDamage || 0) +
        (equippedWeapon?.critDamage || 0),
      10
    ),
  };
};

// Main Game component
const Game = () => {
  const {
    character,
    setCharacter,
    baseCharacter,
    setBaseCharacterData,
    inventory,
    setInventoryData,
    equipment,
    setEquipmentData,
    characterStatusUpgrade,
    setCharacterStatusUpgradeData,
    weapon,
    accessories,
    armor,
    setWeaponData,
    setAccessoriesData,
    setArmorData,
  } = useGameContext();
  const [skills, setSkills] = useState(skillsData);
  const [enemies, setEnemiesData] = useState(enemiesData);
  const [upgradeStats_weapon, setupgradeStatsweapon] = useState(
    upgradeStats_weapon_data
  );
  const [upgradeStats_armor, setupgradeStatsarmor] = useState(
    upgradeStats_armor_data
  );

  const [upgradeStats, set_upgradeStats] = useState(upgradeStats_data);

  const [upgradeStats_enemies, set_upgradeStats_enemies_data] = useState(
    upgradeStats_enemies_data
  );

  const [potion, setPotionData] = useState(potionData);

  const [combatLog, setCombatLog] = useState([]);



  const [onCombat, setOnCombat] = useState(false);

  const items = [
    {
      key: "character",
      label: "Character & Status",
      children: (
        <CharacterStatus
          character={character}
          potion={potion}
          setPotionData={setPotionData}
          weapon={weapon}
          setWeaponData={setWeaponData}
          accessories={accessories}
          armor={armor}
          upgradeStats_weapon={upgradeStats_weapon}
          upgradeStats_armor={upgradeStats_armor}
          upgradeStats={upgradeStats}
          setCharacter={setCharacter}
          baseCharacter={baseCharacter}
          setBaseCharacterData={setBaseCharacterData}
          inventory={inventory}
          setInventoryData={setInventoryData}
          equipment={equipment}
          setEquipmentData={setEquipmentData}
          characterStatusUpgrade={characterStatusUpgrade}
          setCharacterStatusUpgradeData={setCharacterStatusUpgradeData}
          setAccessoriesData={setAccessoriesData}
          setArmorData={setArmorData}
        />
      ),
      disabled: onCombat,
    },
    {
      key: "skills",
      label: "Skills",
      children: (
        <Skills
          skills={skills}
          setSkills={setSkills}
          inventory={inventory}
          weapon={weapon}
          equipment={equipment}
          setInventoryData={setInventoryData}
        />
      ),
      disabled: onCombat,
    },
    {
      key: "item-shop",
      label: "Item Shop",
      children: (
        <ItemShop
          inventory={inventory}
          setInventoryData={setInventoryData}
          weapon={weapon}
          accessories={accessories}
          armor={armor}
          potion={potion}
          setPotionData={setPotionData}
        />
      ),
      disabled: onCombat,
    },
    {
      key: "combat",
      label: "Combat",
      children: (
        <Combat
          inventory={inventory}
          character={character}
          setCharacter={setCharacter}
          setCombatLog={setCombatLog}
          combatLog={combatLog}
          skills={skills}
          enemies={enemies}
          setEnemiesData={setEnemiesData}
          setInventoryData={setInventoryData}
          weapon={weapon}
          equipment={equipment}
          potion={potion}
          setPotionData={setPotionData}
          upgradeStats_enemies={upgradeStats_enemies}
          set_upgradeStats_enemies_data={set_upgradeStats_enemies_data}
          onCombat={onCombat}
          setOnCombat={setOnCombat}
        />
      ),
      disabled: onCombat,
    },
  ];

  return <Tabs items={items} style={{ padding: "20px" }} />;
};

// Application Entry Point
const App = () => (
  <GameProvider>
    <Game />
  </GameProvider>
);

export default App;
