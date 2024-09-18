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

import upgradeStats_accessorie_data from "./data/upgradeStats_accessorie";
import upgradeStats_armor_data from "./data/upgradeStats_armor";
import upgradeStats_weapon_data from "./data/upgradeStats_weapon";
import upgradeStats_data from "./data/upgradeStats";

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

  // Compute derived character state
  const [character, setCharacter] = useState(() =>
    computeCharacter(baseCharacterData, characterStatusUpgrade, equipment)
  );




  useEffect(() => {
    console.log("Updated Inventory:", inventory);
  }, [inventory]);

  useEffect(() => {
    setCharacter(
      computeCharacter(baseCharacter, characterStatusUpgrade, equipment)
    );
  }, [baseCharacter, characterStatusUpgrade, equipment]);

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
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

// Custom Hook for Context
const useGameContext = () => useContext(GameContext);

// Compute function for character stats
const computeCharacter = (baseCharacter, statusUpgrade, equipment) => {
  return {
    ...baseCharacter,
    ...statusUpgrade,
    hp:
      baseCharacter.hp +
      (equipment.use_armor
        ? armorData.find((item) => item.id === equipment.use_armor)?.hp || 0
        : 0),
    atk:
      baseCharacter.atk +
      (equipment.use_weapon
        ? weaponData.find((item) => item.id === equipment.use_weapon)?.atk || 0
        : 0),
    def:
      baseCharacter.def +
      (equipment.use_armor
        ? armorData.find((item) => item.id === equipment.use_armor)?.def || 0
        : 0),
    critRate: Math.min(
      baseCharacter.critRate +
        (equipment.use_accessories
          ? accessoriesData.find(
              (item) => item.id === equipment.use_accessories
            )?.critRate || 0
          : 0),
      1
    ),
    critDamage: Math.min(
      baseCharacter.critDamage +
        (equipment.use_accessories
          ? accessoriesData.find(
              (item) => item.id === equipment.use_accessories
            )?.critDamage || 0
          : 0),
      2
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
  } = useGameContext();
  const [skills, setSkills] = useState(skillsData);
  const enemies = enemiesData;
  const [weapon, setWeaponData] = useState(weaponData);
  const [accessories, setAccessoriesData] = useState(accessoriesData);
  const [armor, setArmorData] = useState(armorData);


  const [upgradeStats_weapon, setupgradeStatsweapon] = useState(upgradeStats_weapon_data);
  const [upgradeStats_armor, setupgradeStatsarmor] = useState(upgradeStats_armor_data);
  const [upgradeStats_accessorie, setupgradeStatsaccessorie] = useState(upgradeStats_accessorie_data);
  const [upgradeStats, set_upgradeStats] = useState(upgradeStats_data);
  
  


  const [combatLog, setCombatLog] = useState([]);

  const items = [
    {
      key: "character",
      label: "Character & Status",
      children: (
        <CharacterStatus
          character={character}
          weapon={weapon}
          setWeaponData={setWeaponData}
          accessories={accessories}
          armor={armor}
          upgradeStats_weapon={upgradeStats_weapon}
          upgradeStats_armor={upgradeStats_armor}
          upgradeStats_accessorie={upgradeStats_accessorie}
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
        />
      ),
    },
    // Uncomment and configure the following tabs when ready
    // {
    //   key: "combat",
    //   label: "Combat",
    //   children: (
    //     <Combat
    //       character={character}
    //       setCharacter={setCharacter}
    //       setCombatLog={setCombatLog}
    //       combatLog={combatLog}
    //       skills={skills}
    //       enemies={enemies}
    //     />
    //   ),
    // },
  ];

  return <Tabs items={items} style={{padding:'20px'}} />;
};

// Application Entry Point
const App = () => (
  <GameProvider>
    <Game />
  </GameProvider>
);

export default App;
