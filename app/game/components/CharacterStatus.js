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
  List,
  Table,
  Tabs,
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
  potion,
  setPotionData,
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
      critDamage: baseCharacter.critDamage + statusUpgrade.critDamage,
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
      critRate:
        baseStats.critRate +
        (accessoryStats.critRate || 0) +
        (weaponStats.critRate || 0),
      critDamage:
        baseStats.critDamage +
        (accessoryStats.critDamage || 0) +
        (weaponStats.critDamage || 0),
      mp: baseStats.mp + (weaponStats.mp || 0) + (accessoryStats.mp || 0), // Added MP here
    };
  };

  const tabsPotion = [
    {
      key: "hpPotion",
      label: "HpPotion",
      children: (
        <>
          <List
            dataSource={potion
              .sort((a, b) => a.price - b.price)
              .filter((item) => item.type == "hpPotion" && item.have > 0)}
            pagination={{ pageSize: 3 }}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={item.name}
                  description={`Hp: ${item.hp},Mp: ${item.mp}, Have: ${item.have}`}
                />
              </List.Item>
            )}
          />
        </>
      ),
    },
    {
      key: "mpPotion",
      label: "MpPotion",
      children: (
        <>
          <List
            dataSource={potion
              .sort((a, b) => a.price - b.price)
              .filter((item) => item.type == "mpPotion" && item.have > 0)}
            pagination={{ pageSize: 3 }}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={item.name}
                  description={`Hp: ${item.hp},Mp: ${item.mp}, Have: ${item.have}`}
                />
              </List.Item>
            )}
          />
        </>
      ),
    },
    {
      key: "mixPotion",
      label: "MixPotion",
      children: (
        <>
          <List
            dataSource={potion
              .sort((a, b) => a.price - b.price)
              .filter((item) => item.type == "mixPotion" && item.have > 0)}
            pagination={{ pageSize: 3 }}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={item.name}
                  description={`Hp: ${item.hp},Mp: ${item.mp}, Have: ${item.have}`}
                />
              </List.Item>
            )}
          />
        </>
      ),
    },
  ];

  // Update character state whenever baseCharacter, status upgrades, or equipment change
  useEffect(() => {
    const updatedStats = computeCharacterStats();
    setCharacter((prev) => ({
      ...prev,
      ...updatedStats,
    }));
  }, [
    baseCharacter,
    characterStatusUpgrade,
    equipment,
    weapon,
    armor,
    accessories,
  ]);

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

    if (selectedWeapon.upgrade_level == 10) {
      notification.error({
        message: "Weapon Level Maximum",
        description: `You Weapon is Level ${selectedWeapon.upgrade_level} Can't upgrade.`,
      });
      return;
    }

    const { type } = selectedWeapon;
    const { atk, mp, critRate, critDamage, price, upgrade_level } =
      upgradeStats_weapon[type] || {
        atk: 0,
        mp: 0,
        critDamage: 0,
        critRate: 0,
        price: 0,
        upgrade_level: 0,
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
            critRate: item.critRate + critRate,
            critDamage: item.critDamage + critDamage,
            upgrade_level: item.upgrade_level + 1,
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
    const upgrade = upgradeStats_armor[type] || {
      def: 0,
      hp: 0,
      price: 0,
      upgrade_level: 0,
    };

    if (inventory.gold < upgrade.price) {
      notification.error({
        message: "Not Enough Gold",
        description: `You need ${upgrade.price} gold to upgrade the armor.`,
      });
      return;
    }

    if (selectedArmor.upgrade_level == 10) {
      notification.error({
        message: "Armor Level Maximum",
        description: `You armor is Level ${selectedArmor.upgrade_level} Can't upgrade.`,
      });
      return;
    }

    const upgradedArmor = armor.map((item) =>
      item.id === armorId
        ? {
            ...item,
            def: item.def + upgrade.def,
            hp: item.hp + upgrade.hp,
            upgrade_level: item.upgrade_level + 1,
          }
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

    if (selectedAccessory.upgrade_level == 10) {
      notification.error({
        message: "Accessory Level Maximum",
        description: `You Accessory is Level ${selectedAccessory.upgrade_level} Can't upgrade.`,
      });
      return;
    }

    const { type } = selectedAccessory;
    const upgrade = upgradeStats_accessorie[type] || {
      critRate: 0,
      critDamage: 0,
      mp: 0,
      upgrade_level: 0,
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
            upgrade_level: item.upgrade_level + 1,
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
          disabled={
            inventory.gold < record.price ||
            record.stat == "critDamage" ||
            record.stat == "critRate"
          } // Disable button based on price
          hidden={record.stat == "critDamage" || record.stat == "critRate"}
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
      price: null,
      upgrade_value: null,
    },
    {
      key: "6",
      stat: "critDamage",
      currentValue: (stats.critDamage * 100).toFixed(2) + "%",
      price: null,
      upgrade_value: null,
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
          <Tabs items={tabsPotion} />
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
