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
  potion,
  setPotionData,
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
          return;
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

  const buyPotion = (select_potion) => {
    if (inventory.gold >= select_potion.price) {
      // Find the selected potion in the potion array

      const selectedPotion = potion.map((item) =>
        item.id === select_potion.id
          ? {
              ...item,
              have: item.have + 1,
            }
          : item
      );

      setPotionData(selectedPotion);

      // Deduct gold from inventory
      setInventoryData((prevInventory) => ({
        ...prevInventory,
        gold: prevInventory.gold - select_potion.price,
      }));

      notification.success({
        message: "Purchase Successful",
        description: `You bought 1 ${select_potion.name}.`,
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

  const tabsPotion = [
    {
      key: "hpPotion",
      label: "HpPotion",
      children: (
        <>
          <List
            dataSource={potion
              .sort((a, b) => a.price - b.price)
              .filter((item) => item.type == "hpPotion")}
            pagination={{ pageSize: 3 }}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button type="primary" onClick={() => buyPotion(item)}>
                    Buy for {item.price} Gold
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={item.name}
                  description={`Hp: ${item.hp}, MP: ${item.mp}, Have: ${item.have}`}
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
              .filter((item) => item.type == "mpPotion")}
            pagination={{ pageSize: 3 }}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button type="primary" onClick={() => buyPotion(item)}>
                    Buy for {item.price} Gold
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={item.name}
                  description={`Hp: ${item.hp}, MP: ${item.mp}, Have: ${item.have}`}
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
              .filter((item) => item.type == "mixPotion")}
            pagination={{ pageSize: 3 }}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button type="primary" onClick={() => buyPotion(item)}>
                    Buy for {item.price} Gold
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={item.name}
                  description={`Hp: ${item.hp}, MP: ${item.mp}, Have: ${item.have}`}
                />
              </List.Item>
            )}
          />
        </>
      ),
    },
  ];

  const tabs = [
    {
      key: "weapons",
      label: "Weapons",
      children: (
        <>
          <Select
            defaultValue={selectedWeaponType}
            style={{ width: "100%", marginBottom: 16 }}
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
              .filter(
                (item) =>
                  !isItemOwned(item, "weapon") &&
                  (selectedWeaponType === "" ||
                    item.type === selectedWeaponType)
              )
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
                  description={`Attack: ${item.atk}, MP: ${
                    item.mp
                  }, Crit Rate: ${(item.critRate * 100).toFixed(
                    1
                  )}%, Crit Damage: ${(item.critDamage * 100).toFixed(
                    1
                  )}%, Rank: ${item.rank}`}
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
            style={{ width: "100%", marginBottom: 16 }}
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
              .filter(
                (item) =>
                  !isItemOwned(item, "armor") &&
                  (selectedArmorType === "" || item.type === selectedArmorType)
              )
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
            style={{ width: "100%", marginBottom: 16 }}
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
              .filter(
                (item) =>
                  !isItemOwned(item, "accessories") &&
                  (selectedAccessoriesType === "" ||
                    item.type === selectedAccessoriesType)
              )
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
                  description={`Crit Rate: ${(item.critRate * 100).toFixed(
                    1
                  )}%, Crit Damage: ${(item.critDamage * 100).toFixed(
                    1
                  )}%, MP: ${item.mp}`}
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
      children: <Tabs items={tabsPotion} />,
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
