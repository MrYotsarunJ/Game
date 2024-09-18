"use client";

import { Button, List, Typography, Tabs, notification, Select } from "antd";
import { useState } from "react";

const { Title, Text } = Typography;
const { Option } = Select;
const ItemShop = ({
  weapon,
  accessories,
  armor,
  inventory,
  setInventoryData,
}) => {
  const weaponTypes = [...new Set(weapon.map((item) => item.type))];
  const [selectedWeaponType, setSelectedWeaponType] = useState(
    weaponTypes[0] || ""
  );

  // Armor types
  const armorTypes = [...new Set(armor.map((item) => item.type))];
  const [selectedArmorType, setSelectedArmorType] = useState(
    armorTypes[0] || ""
  );

  // Accessories types
  const accessoriesTypes = [...new Set(accessories.map((item) => item.type))];
  const [selectedAccessoriesType, setSelectedAccessoriesType] = useState(
    accessoriesTypes[0] || ""
  );

  const itemsForSale = [
    { name: "HP Potion", price: 10, type: "hpPotion" },
    { name: "MP Potion", price: 15, type: "mpPotion" },
  ];

  const buyItem = (item) => {
    if (inventory.gold >= item.price) {
      setInventoryData((prev) => {
        const updatedInventory = { ...prev.inventory };

        // Add item ID to the appropriate array in inventory
        if (item.id) {
          if (item.item_type === "weapon") {
            updatedInventory.weapon = [
              ...new Set([...updatedInventory.weapon, item.id]),
            ];
          } else if (item.item_type === "armor") {
            updatedInventory.armor = [
              ...new Set([...updatedInventory.armor, item.id]),
            ];
          } else if (item.item_type === "accessories") {
            updatedInventory.accessories = [
              ...new Set([...updatedInventory.accessories, item.id]),
            ];
          }
        } else {
          // Handle non-equipment items like potions
          updatedInventory[item.type] = (updatedInventory[item.type] || 0) + 1;
        }

        return {
          ...prev,
          gold: prev.gold - item.price,
          inventory: updatedInventory,
        };
      });

      notification.success({
        message: "Purchase Successful",
        description: `You bought ${item.name}.`,
      });
    } else {
      notification.error({
        message: "Insufficient Gold",
        description: "You do not have enough gold to buy this item.",
      });
    }
  };

  // Filter function to check if an item is already owned
  const isItemOwned = (item, type) => {
    return inventory.inventory[type].includes(item.id);
  };

  const tabs = [
    {
      key: "weapons",
      label: "Weapons",
      children: (
        <>
          <Select
            defaultValue={selectedWeaponType}
            style={{ width: '100%', marginBottom: 16 }}
            onChange={(value) => setSelectedWeaponType(value)}
          >
            {weaponTypes.map((type) => (
              <Option key={type} value={type}>
                {type}
              </Option>
            ))}
          </Select>
          <List
            dataSource={weapon
              .filter((item) => !isItemOwned(item, "weapon") && (selectedWeaponType === '' || item.type === selectedWeaponType))
              .sort((a, b) => a.price - b.price)}
            pagination={{ pageSize: 10 }}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button type="primary" onClick={() => buyItem(item)}>
                    Buy for {item.price} Gold
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={item.name}
                  description={`Attack: ${item.atk}, MP: ${item.mp}`}
                />
              </List.Item>
            )}
          />
        </>
      ),
    },

    {
      key: "armor",
      label: "Armor",
      children: (
        <>
          <Select
            defaultValue={selectedArmorType}
            style={{ width: '100%', marginBottom: 16 }}
            onChange={(value) => setSelectedArmorType(value)}
          >
            {armorTypes.map((type) => (
              <Option key={type} value={type}>
                {type}
              </Option>
            ))}
          </Select>
          <List
            dataSource={armor
              .filter((item) => !isItemOwned(item, "armor") && (selectedArmorType === '' || item.type === selectedArmorType))
              .sort((a, b) => a.price - b.price)}
            pagination={{ pageSize: 10 }}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button type="primary" onClick={() => buyItem(item)}>
                    Buy for {item.price} Gold
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={item.name}
                  description={`HP: ${item.hp}, Defense: ${item.def}`}
                />
              </List.Item>
            )}
          />
        </>
      ),
    },

    {
      key: "accessories",
      label: "Accessories",
      children: (
        <>
          <Select
            defaultValue={selectedAccessoriesType}
            style={{ width: '100%', marginBottom: 16 }}
            onChange={(value) => setSelectedAccessoriesType(value)}
          >
            {accessoriesTypes.map((type) => (
              <Option key={type} value={type}>
                {type}
              </Option>
            ))}
          </Select>
          <List
            dataSource={accessories
              .filter((item) => !isItemOwned(item, "accessories") && (selectedAccessoriesType === '' || item.type === selectedAccessoriesType))
              .sort((a, b) => a.price - b.price)}
            pagination={{ pageSize: 10 }}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button type="primary" onClick={() => buyItem(item)}>
                    Buy for {item.price} Gold
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={item.name}
                  description={`Crit Rate: ${(item.critRate * 100).toFixed(1)}%, Crit Damage: ${(item.critDamage * 100).toFixed(1)}%, MP: ${item.mp}`}
                />
              </List.Item>
            )}
          />
        </>
      ),
    },

    {
      key: "potion",
      label: "Potion",
      children: (
        <List
          dataSource={itemsForSale.sort((a, b) => a.price - b.price)}
          pagination={{ pageSize: 10 }}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button type="primary" onClick={() => buyItem(item)}>
                  Buy for {item.price} Gold
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={item.name}
                description={`Got: ${inventory.inventory[item.type]}`}
              />
            </List.Item>
          )}
        />
      ),
    },
  ];


  return (
    <div>
      <Title level={2}>Item Shop</Title>
      <Text>Gold: {inventory.gold}</Text>

      <Tabs items={tabs} />
    </div>
  );
};

export default ItemShop;
