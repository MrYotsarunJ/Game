"use client";

import { Button, List, Card, Typography, notification, Tabs } from "antd";
import React from "react";

const { Paragraph } = Typography;
const { TabPane } = Tabs;

const Skills = ({
  skills = [], // Default to an empty array
  setSkills,
  inventory,
  setInventoryData,
  equipment,
  weapon,
}) => {
  // Get the type of the currently equipped weapon
  const equippedWeaponId = equipment.use_weapon;
  const equippedWeapon = weapon.find((w) => w.id === equippedWeaponId);
  const equippedWeaponType = equippedWeapon?.type;

  // Ensure skills is an array before filtering
  const filteredSkills = Array.isArray(skills)
    ? skills.filter(
        (skill) => !skill.weaponType || skill.weaponType === equippedWeaponType
      )
    : [];

  // Organize filtered skills by type
  const skillsByType = filteredSkills.reduce((acc, skill) => {
    if (!acc[skill.type]) {
      acc[skill.type] = [];
    }
    acc[skill.type].push(skill);
    return acc;
  }, {});

  const handleUpgrade = (skillId, cost) => {
    // Find the skill by ID
    const skill = filteredSkills.find((skill) => skill.id === skillId);

    if (!skill) {
      notification.error({
        message: "Skill Not Found",
        description: `The skill with ID ${skillId} does not exist.`,
      });
      return;
    }

    if (!skill.can_upgrade) {
      notification.warning({
        message: "Upgrade Not Available",
        description: `The skill ${skill.name} cannot be upgraded further.`,
      });
      return;
    }

    if (inventory.gold < cost) {
      notification.error({
        message: "Not Enough Gold",
        description: `You need ${cost} gold to upgrade ${skill.name}.`,
      });
      return;
    }

    if (skill.weaponType && skill.weaponType !== equippedWeaponType) {
      notification.warning({
        message: "Incompatible Weapon",
        description: `The skill ${skill.name} requires a ${skill.weaponType}.`,
      });
      return;
    }

    // Proceed with upgrading the skill
    upgradeSkill(skillId, cost);
  };

  const upgradeSkill = (skillId, cost) => {
    if (inventory.gold >= cost) {
      // Deduct the gold from the inventory
      setInventoryData((prev) => ({
        ...prev,
        gold: prev.gold - cost,
      }));

      // Update the skill stats
      setSkills((prevSkills) =>
        prevSkills.map((skill) => {
          if (skill.id === skillId) {
            return {
              ...skill,
              level: skill.level + 1,
              damage: skill.damage ? skill.damage + 10 : 0, // Increase damage by 10 (or 0 if it's not a damage skill)
              heal: skill.heal ? skill.heal + 10 : 0, // Increase heal by 10 (or 0 if not a healing skill)
              mpCost: skill.mpCost + 5, // Increase MP cost by 5
            };
          }
          return skill;
        })
      );

      notification.success({
        message: "Skill Upgraded",
        description: `You upgraded skill ID ${skillId} to level ${
          filteredSkills.find((skill) => skill.id === skillId).level + 1
        }.`,
      });
    } else {
      notification.error({
        message: "Insufficient Gold",
        description: "You do not have enough gold to upgrade this skill.",
      });
    }
  };

  return (
    <Card title="Skills">
      <Tabs defaultActiveKey="Attack">
        {Object.keys(skillsByType).map((type) => (
          <TabPane tab={type} key={type}>
            <List
              itemLayout="horizontal"
              dataSource={skillsByType[type]}
              renderItem={(skill) => (
                <List.Item
                  actions={[
                    skill.can_upgrade ? (
                      <Button
                        onClick={() =>
                          handleUpgrade(skill.id, skill.level * 50)
                        } // Skill upgrade cost increases with level
                        style={{ marginLeft: "10px" }}
                      >
                        Upgrade (Cost: {skill.level * 50} Gold)
                      </Button>
                    ) : (
                      <Button disabled style={{ marginLeft: "10px" }}>
                        Max Level Reached
                      </Button>
                    ),
                  ]}
                >
                  <List.Item.Meta
                    title={skill.name}
                    description={
                      <>
                        <Paragraph>Damage: {skill.damage || 0}</Paragraph>
                        <Paragraph>Heal: {skill.heal || 0}</Paragraph>
                        <Paragraph>MP Cost: {skill.mpCost}</Paragraph>
                        <Paragraph>Level: {skill.level}</Paragraph>
                        {skill.weaponType && (
                          <Paragraph>Weapon Type: {skill.weaponType}</Paragraph>
                        )}
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </TabPane>
        ))}
      </Tabs>
    </Card>
  );
};

export default Skills;
