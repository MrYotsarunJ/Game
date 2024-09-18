"use client"; // Ensure this is the first line
import {
  Progress,
  Button,
  Card,
  Typography,
  notification,
  Select,
  Row,
  Col,
  Table,
} from "antd";
import { useState, useEffect } from "react";
import { PlusOutlined, DownOutlined } from "@ant-design/icons"; // Import Ant Design icons

const { Title, Paragraph } = Typography;
const { Option } = Select;

const CharacterStatus = ({
  character,
  setCharacter,
  weapon,
  accessories,
  armor,
  baseCharacter,
  setBaseCharacterData,
  inventory,
  setInventoryData,
  equipment,
  setEquipmentData,
  characterStatusUpgrade,
  setCharacterStatusUpgradeData,
  setWeaponData,
  setArmorData,
  setAccessoriesData,
  upgradeStats_weapon,
  upgradeStats_armor,
  upgradeStats_accessorie,
  upgradeStats,
}) => {
  // Compute the final character stats based on baseCharacter, status upgrades, and equipment
  const computeCharacterStats = () => {
    const statusUpgrade = {
      hp: characterStatusUpgrade.hp || 0,
      atk: characterStatusUpgrade.atk || 0,
      def: characterStatusUpgrade.def || 0,
      critRate: characterStatusUpgrade.critRate || 0,
      critDamage: characterStatusUpgrade.critDamage || 0,
      mp: characterStatusUpgrade.mp || 0, // Added MP here
    };

    const baseStats = {
      ...baseCharacter,
      hp: baseCharacter.hp + statusUpgrade.hp,
      atk: baseCharacter.atk + statusUpgrade.atk,
      def: baseCharacter.def + statusUpgrade.def,
      critRate: Math.min(baseCharacter.critRate + statusUpgrade.critRate, 1),
      critDamage: Math.min(
        baseCharacter.critDamage + statusUpgrade.critDamage,
        2
      ),
      mp: baseCharacter.mp + statusUpgrade.mp,
    };

    const weaponStats =
      weapon.find((item) => item.id === equipment.use_weapon) || {};
    const armorStats =
      armor.find((item) => item.id === equipment.use_armor) || {};
    const accessoryStats =
      accessories.find((item) => item.id === equipment.use_accessories) || {};

    return {
      hp: baseStats.hp + (armorStats.hp || 0),
      atk: baseStats.atk + (weaponStats.atk || 0),
      def: baseStats.def + (armorStats.def || 0),
      critRate: Math.min(
        baseStats.critRate + (accessoryStats.critRate || 0),
        1
      ),
      critDamage: Math.min(
        baseStats.critDamage + (accessoryStats.critDamage || 0),
        2
      ),
      mp: baseStats.mp + (weaponStats.mp || 0) + (accessoryStats.mp || 0), // Added MP here
    };
  };

  // Update character state whenever baseCharacter, status upgrades, or equipment change
  useEffect(() => {
    const updatedStats = computeCharacterStats();
    setCharacter((prev) => ({
      ...prev,
      ...updatedStats,
    }));
  }, [baseCharacter, characterStatusUpgrade, equipment]);

// Function to upgrade weapon data by ID
const upgradeWeapon = () => {
    const weaponId = equipment.use_weapon;
    const selectedWeapon = weapon.find((item) => item.id === weaponId);

    if (!selectedWeapon) {
      notification.error({
        message: "Weapon not found",
      });
      return;
    }

    const { type } = selectedWeapon;
    const { atk, mp, price } = upgradeStats_weapon[type] || {
      atk: 0,
      mp: 0,
      price: 0,
    };

    if (inventory.gold < price) {
      notification.error({
        message: "Not Enough Gold",
        description: `You need ${price} gold to upgrade the ${type}.`,
      });
      return;
    }

    const upgradedWeapon = weapon.map((item) =>
      item.id === weaponId
        ? {
            ...item,
            atk: item.atk + atk,
            mp: item.mp + mp,
          }
        : item
    );

    setWeaponData(upgradedWeapon); // Update the weapon data

    setInventoryData((prev) => ({
      ...prev,
      gold: prev.gold - price,
    }));

    notification.success({
      message: "Weapon Upgraded",
      description: `Your ${selectedWeapon.name} has been upgraded successfully!`,
    });
};

// Function to upgrade armor data by ID
const upgradeArmor = () => {
    const armorId = equipment.use_armor;
    const selectedArmor = armor.find((item) => item.id === armorId);

    if (!selectedArmor) {
      notification.error({
        message: "Armor not found",
      });
      return;
    }

    const { type } = selectedArmor;
    const upgrade = upgradeStats_armor[type] || { def: 0, hp: 0, price: 0 };

    if (inventory.gold < upgrade.price) {
      notification.error({
        message: "Not Enough Gold",
        description: `You need ${upgrade.price} gold to upgrade the armor.`,
      });
      return;
    }

    const upgradedArmor = armor.map((item) =>
      item.id === armorId
        ? { ...item, def: item.def + upgrade.def, hp: item.hp + upgrade.hp }
        : item
    );

    setArmorData(upgradedArmor);
    setInventoryData((prev) => ({
      ...prev,
      gold: prev.gold - upgrade.price,
    }));

    notification.success({
      message: "Armor Upgraded",
      description: `Your ${selectedArmor.name} has been upgraded successfully!`,
    });
};

// Function to upgrade accessory data by ID
const upgradeAccessory = () => {
    const accessoryId = equipment.use_accessories;
    const selectedAccessory = accessories.find(
      (item) => item.id === accessoryId
    );

    if (!selectedAccessory) {
      notification.error({
        message: "Accessory not found",
      });
      return;
    }

    const { type } = selectedAccessory;
    const upgrade = upgradeStats_accessorie[type] || {
      critRate: 0,
      critDamage: 0,
      mp: 0,
      price: 0,
    };

    if (inventory.gold < upgrade.price) {
      notification.error({
        message: "Not Enough Gold",
        description: `You need ${upgrade.price} gold to upgrade the accessory.`,
      });
      return;
    }

    const upgradedAccessories = accessories.map((item) =>
      item.id === accessoryId
        ? {
            ...item,
            critRate: item.critRate + upgrade.critRate,
            critDamage: item.critDamage + upgrade.critDamage,
            mp: item.mp + upgrade.mp,
          }
        : item
    );

    setAccessoriesData(upgradedAccessories);
    setInventoryData((prev) => ({
      ...prev,
      gold: prev.gold - upgrade.price,
    }));

    notification.success({
      message: "Accessory Upgraded",
      description: `Your ${selectedAccessory.name} has been upgraded successfully!`,
    });
};

// Function to handle generic stat upgrades
const handleUpgrade = (stat) => {
    const newValue = upgradeStats[stat];

    if (newValue === undefined) {
      notification.error({
        message: "Undefined",
        description: `Invalid stat type: ${stat}`,
      });
      return;
    }

    if (inventory.gold < newValue.price) {
      notification.error({
        message: "Not Enough Gold",
        description: `You need ${newValue.price} gold to upgrade ${stat}.`,
      });
      return;
    }

    // Define the upgrade values based on stat type
    const upgradeValues = {
      hp: 10,
      atk: 5,
      def: 3,
      critRate: 0.05,
      critDamage: 0.1,
      mp: 10,
    };

    // Update character stats
    setCharacter((prev) => ({
      ...prev,
      [stat]: (prev[stat] || 0) + newValue.value,
    }));

    // Update inventory
    setInventoryData((prevInventory) => ({
      ...prevInventory,
      gold: prevInventory.gold - newValue.price,
    }));

    // Optionally update character status upgrade data if needed
    setCharacterStatusUpgradeData((prev) => ({
      ...prev,
      [stat]: (prev[stat] || 0) + newValue.value,
    }));

    notification.success({
      message: "Stat Upgraded",
      description: `Your ${stat} has been upgraded successfully!`,
    });
};

// Function to change equipment
const handleChangeEquipment = (type, id) => {
    setEquipmentData((prev) => ({
      ...prev,
      [`use_${type}`]: id,
    }));
};


  const stats = computeCharacterStats();

  const columns = [
    {
      title: "Stat",
      dataIndex: "stat",
      key: "stat",
    },
    {
      title: "Current Value",
      dataIndex: "currentValue",
      key: "currentValue",
    },
    {
      title: "Upgrade",
      dataIndex: "upgrade_value",
      key: "upgrade_value",
    },
    {
      title: "Price (Gold)",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button
          icon={<PlusOutlined />} // Add icon to the button
          onClick={() => handleUpgrade(record.stat)}
          disabled={inventory.gold < record.price} // Disable button based on price
        >
          Upgrade {record.stat.toUpperCase()}
        </Button>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      stat: "hp",
      currentValue: stats.hp,
      price: upgradeStats.hp.price,
      upgrade_value: upgradeStats.hp.value,
    },
    {
      key: "2",
      stat: "mp",
      currentValue: stats.mp,
      price: upgradeStats.mp.price,
      upgrade_value: upgradeStats.mp.value,
    },
    {
      key: "3",
      stat: "atk",
      currentValue: stats.atk,
      price: upgradeStats.atk.price,
      upgrade_value: upgradeStats.atk.value,
    },
    {
      key: "4",
      stat: "def",
      currentValue: stats.def,
      price: upgradeStats.def.price,
      upgrade_value: upgradeStats.def.value,
    },
    {
      key: "5",
      stat: "critRate",
      currentValue: (stats.critRate * 100).toFixed(2) + "%",
      price: upgradeStats.critRate.price,
      upgrade_value: upgradeStats.critRate.value,
    },
    {
      key: "6",
      stat: "critDamage",
      currentValue: (stats.critDamage * 100).toFixed(2) + "%",
      price: upgradeStats.critDamage.price,
      upgrade_value: upgradeStats.critDamage.value,
    },
  ];

  return (
    <Card title="Character Status">
      <Row gutter={16}>
        <Col span={24}>
          <Title level={5}>Upgrade Stats</Title>
          <Table columns={columns} dataSource={data} pagination={false} />
        </Col>
        <Col span={12} style={{ padding: "10px" }}>
          <Title level={4}>Inventory</Title>
          <Paragraph>Gold: {inventory.gold}</Paragraph>
          <Paragraph>HP Potions: {inventory.inventory.hpPotion}</Paragraph>{" "}
          {/* Display HP potions */}
          <Paragraph>MP Potions: {inventory.inventory.mpPotion}</Paragraph>{" "}
          {/* Display MP potions */}
        </Col>

        <Col span={12} style={{ padding: "10px" }}>
          <Title level={5}>Equipment</Title>

          {/* Weapon Selection */}
          <Paragraph>Select Weapon:</Paragraph>
          <Select
            value={equipment.use_weapon}
            style={{ width: "100%" }}
            onChange={(id) => handleChangeEquipment("weapon", id)}
          >
            {weapon
              .filter((item) => inventory.inventory.weapon.includes(item.id))
              .map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
          </Select>

          <Button
            icon={<PlusOutlined />} // Add icon to the button
            onClick={upgradeWeapon}
            disabled={
              !equipment.use_weapon ||
              inventory.gold <
                upgradeStats_weapon[
                  weapon.find((item) => item.id === equipment.use_weapon)?.type
                ]?.price
            }
          >
            Upgrade Weapon
          </Button>

          {/* Armor Selection */}
          <Paragraph>Select Armor:</Paragraph>
          <Select
            value={equipment.use_armor}
            style={{ width: "100%" }}
            onChange={(id) => handleChangeEquipment("armor", id)}
          >
            {armor
              .filter((item) => inventory.inventory.armor.includes(item.id))
              .map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
          </Select>

          <Button
            icon={<PlusOutlined />} // Add icon to the button
            onClick={upgradeArmor}
            disabled={
              !equipment.use_armor ||
              inventory.gold <
                upgradeStats_armor[
                  armor.find((item) => item.id === equipment.use_armor)?.type
                ]?.price
            }
          >
            Upgrade Armor
          </Button>

          {/* Accessories Selection */}
          <Paragraph>Select Accessories:</Paragraph>
          <Select
            value={equipment.use_accessories}
            style={{ width: "100%" }}
            onChange={(id) => handleChangeEquipment("accessories", id)}
          >
            {accessories
              .filter((item) =>
                inventory.inventory.accessories.includes(item.id)
              )
              .map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
          </Select>

          <Button
            icon={<PlusOutlined />} // Add icon to the button
            onClick={upgradeAccessory}
            disabled={
              !equipment.use_accessories ||
              inventory.gold <
                upgradeStats_accessorie[
                  accessories.find(
                    (item) => item.id === equipment.use_accessories
                  )?.type
                ]?.price
            }
          >
            Upgrade Accessory
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default CharacterStatus;
