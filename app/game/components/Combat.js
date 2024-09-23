"use client";

import {
  Button,
  List,
  Card,
  Typography,
  Progress,
  notification,
  Row,
  Col,
  Tabs,
} from "antd";
import { useState, useEffect } from "react";

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;

const Combat = ({
  character,
  setCharacter,
  skills,
  enemies,
  inventory,
  setInventoryData,
  weapon,
  equipment,
  maxStats,
  potion,
  setPotionData,
  upgradeStats_enemies,
  set_upgradeStats_enemies_data,
  setEnemiesData,
  onCombat,
  setOnCombat,
}) => {
  const [selectedEnemy, setSelectedEnemy] = useState(null);
  const [playerTurn, setPlayerTurn] = useState(true); // Player starts the turn

  const equippedWeaponId = equipment.use_weapon;
  const equippedWeapon = weapon.find((w) => w.id === equippedWeaponId);
  const equippedWeaponType = equippedWeapon?.type;

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

  const handleFight = (enemy) => {
    setSelectedEnemy(enemy);
    setOnCombat(true);
    setPlayerTurn(true); // Ensure player starts the turn
  };

  const escape = () => {
    // Generate a random number between 0 and 1, 50% chance to escape
    if (Math.random() < 0.5) {
      notification.success({
        message: "Escape Successful!",
        description: "You managed to escape from the battle.",
      });
      setSelectedEnemy(null);
      setPlayerTurn(true); // Allow player to select a new enemy
      setOnCombat(false);
    } else {
      notification.error({
        message: "Escape Failed!",
        description: "The enemy blocked your escape attempt.",
      });
      setPlayerTurn(false);
      setTimeout(enemyAttack, 1000); // Delay enemy attack to simulate turn-based combat
    }
  };

  const fightEnemy = (enemy) => {
    notification.success({
      message: "Victory!",
      description: `You have defeated ${enemy.name} and earned rewards.`,
    });

    // Update character gold and reset enemy selection
    const rewardGold = selectedEnemy.reward;
    setInventoryData((prev) => ({
      ...prev,
      gold: prev.gold + rewardGold,
    }));
    setSelectedEnemy(null);
    setPlayerTurn(true); // Allow player to select a new enemy
    setOnCombat(false);
    addStatus(enemy);
  };

  const addStatus = (enemy) => {
    const upgrade_enemies = upgradeStats_enemies[enemy.rank];
    const enemies_data = enemies.map((item) =>
      item.id == enemy.id
        ? {
            ...item,
            atk: item.atk + upgrade_enemies.atk,
            def: item.def + upgrade_enemies.def,
            hp: item.hp + upgrade_enemies.hp,
            maxHp: item.maxHp + upgrade_enemies.hp,
            reward: item.atk + upgrade_enemies.reward,
          }
        : item
    );

    setEnemiesData(enemies_data);
  };

  const useSkill = (skillId) => {
    if (!playerTurn || !selectedEnemy) {
      notification.error({
        message: "Invalid Action",
        description: "Please select an enemy and make sure it is your turn.",
      });
      return;
    }

    const skill = filteredSkills.find((skill) => skill.id === skillId);

    if (character.mp < skill.mpCost) {
      notification.error({
        message: "Not Enough MP",
        description: `You need ${skill.mpCost} MP to use ${skill.name}.`,
      });
      return;
    }

    // Deduct MP cost first
    setCharacter((prev) => ({
      ...prev,
      mp: prev.mp - skill.mpCost,
    }));

    let skillMessage = "";

    // Determine skill effect
    switch (skill.type) {
      case "Attack":
        let damage = (skill.damage || 0) + character.atk;
        const isCritical = Math.random() < character.critRate;
        damage = isCritical ? damage * (1 + character.critDamage) : damage;
        damage = Math.max(damage - selectedEnemy.def, 0); // Apply enemy defense

        setSelectedEnemy((prev) => {
          const newHp = Math.max(prev.hp - damage, 0);
          skillMessage = `You dealt ${damage} damage to ${selectedEnemy.name}${
            isCritical ? " (Critical Hit!)" : ""
          }.`;
          return { ...prev, hp: newHp };
        });
        break;

      case "Heal":
        const healAmount = skill.heal || 0;
        setCharacter((prev) => {
          const newHp = Math.min(prev.hp + healAmount, 100); // Assume max HP is 100
          skillMessage = `You healed yourself for ${healAmount} HP.`;
          return { ...prev, hp: newHp };
        });
        break;

      case "Defense":
        const defIncrease = skill.defIncrease || 0;
        setCharacter((prev) => {
          skillMessage = `You increased your defense by ${defIncrease}.`;
          return { ...prev, def: prev.def + defIncrease };
        });
        break;

      default:
        notification.error({
          message: "Unknown Skill Type",
          description: `Skill type ${skill.type} is not recognized.`,
        });
        return;
    }

    // Show notification after skill usage
    notification.info({
      message: `${skill.name}`,
      description: skillMessage,
    });

    // End player's turn and start enemy's turn
    setPlayerTurn(false);
    setTimeout(enemyAttack, 2000); // Delay enemy attack to simulate turn-based combat
  };

  useEffect(() => {
    if (selectedEnemy) {
      if (selectedEnemy.hp <= 0) {
        fightEnemy(selectedEnemy);
        return;
      }
    }
  }, [selectedEnemy]);

  useEffect(() => {
    if (character.hp <= 0) {
      notification.error({
        message: "Defeat",
        description: `You were defeated by ${selectedEnemy.name}.`,
      });
      setSelectedEnemy(null);
      setPlayerTurn(true); // Player can select a new enemy
      return;
    }
  }, [character]);

  const enemyAttack = () => {
    if (selectedEnemy && selectedEnemy.hp > 0) {
      // Calculate damage dealt by enemy
      const damage = Math.max(selectedEnemy.atk - character.def, 0);
      setCharacter((prev) => {
        const newHp = Math.max(prev.hp - damage, 0);
        return { ...prev, hp: newHp };
      });

      // Show notification after enemy attack
      notification.error({
        message: "Enemy Attack",
        description: `The enemy dealt ${damage} damage to you.`,
      });

      // End enemy's turn and allow player to act
      setPlayerTurn(true);
    }
  };

  const usePotion = (select_potion) => {
    if (character.hp <= 0) {
      notification.error({
        message: "Cannot Use Potion",
        description: "You cannot use potions while defeated.",
      });
      return;
    }

    if (select_potion.type == "hpPotion" && character.hp === maxStats.hp) {
      notification.info({
        message: "Full HP",
        description: "You are already at full HP.",
      });
      return;
    }

    if (select_potion.type == "mpPotion" && character.mp === maxStats.mp) {
      notification.info({
        message: "Full MP",
        description: "You are already at full MP.",
      });
      return;
    }

    if (
      select_potion.type == "mixPotion" &&
      character.hp === maxStats.hp &&
      character.mp === maxStats.mp
    ) {
      notification.info({
        message: "Full HP & Full MP",
        description: "You are already at full HP&MP.",
      });
      return;
    }

    let updateCharacter = {};
    if (select_potion.have > 0) {
      updateCharacter = {
        hp: Math.min(character.hp + select_potion.hp, maxStats.hp),
        mp: Math.min(character.mp + select_potion.mp, maxStats.mp),
      };

      const selectedPotion = potion.map((item) =>
        item.id === select_potion.id
          ? {
              ...item,
              have: item.have - 1,
            }
          : item
      );

      setPotionData(selectedPotion);

      setCharacter((prev) => ({ ...prev, ...updateCharacter }));

      notification.success({
        message: "Use Potion",
        description: `You Use 1 ${select_potion.name}.`,
      });
    } else {
      notification.error({
        message: "No Potion",
        description: "no have this potion.",
      });
    }
  };

  const tabsEnemies = [
    {
      key: "SS",
      label: "SS Rank",
      children: (
        <>
          <List
            dataSource={enemies.filter((item) => item.rank == "SS")}
            pagination={{ pageSize: 5 }}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button
                    type="primary"
                    onClick={() => handleFight(item)}
                    disabled={!!selectedEnemy}
                  >
                    Battle
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={item.name}
                  description={`Hp: ${item.hp}, Atk: ${item.atk}, Def: ${item.def}, Reward: ${item.reward}`}
                />
              </List.Item>
            )}
          />
        </>
      ),
    },
    {
      key: "S",
      label: "S Rank",
      children: (
        <>
          <List
            dataSource={enemies.filter((item) => item.rank == "S")}
            pagination={{ pageSize: 5 }}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button
                    type="primary"
                    onClick={() => handleFight(item)}
                    disabled={!!selectedEnemy}
                  >
                    Battle
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={item.name}
                  description={`Hp: ${item.hp}, Atk: ${item.atk}, Def: ${item.def}, Reward: ${item.reward}`}
                />
              </List.Item>
            )}
          />
        </>
      ),
    },
    {
      key: "A",
      label: "A Rank",
      children: (
        <>
          <List
            dataSource={enemies.filter((item) => item.rank == "A")}
            pagination={{ pageSize: 5 }}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button
                    type="primary"
                    onClick={() => handleFight(item)}
                    disabled={!!selectedEnemy}
                  >
                    Battle
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={item.name}
                  description={`Hp: ${item.hp}, Atk: ${item.atk}, Def: ${item.def}, Reward: ${item.reward}`}
                />
              </List.Item>
            )}
          />
        </>
      ),
    },
    {
      key: "B",
      label: "B Rank",
      children: (
        <>
          <List
            dataSource={enemies.filter((item) => item.rank == "B")}
            pagination={{ pageSize: 5 }}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button
                    type="primary"
                    onClick={() => handleFight(item)}
                    disabled={!!selectedEnemy}
                  >
                    Battle
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={item.name}
                  description={`Hp: ${item.hp}, Atk: ${item.atk}, Def: ${item.def}, Reward: ${item.reward}`}
                />
              </List.Item>
            )}
          />
        </>
      ),
    },
    {
      key: "C",
      label: "C Rank",
      children: (
        <>
          <List
            dataSource={enemies.filter((item) => item.rank == "C")}
            pagination={{ pageSize: 5 }}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button
                    type="primary"
                    onClick={() => handleFight(item)}
                    disabled={!!selectedEnemy}
                  >
                    Battle
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={item.name}
                  description={`Hp: ${item.hp}, Atk: ${item.atk}, Def: ${item.def}, Reward: ${item.reward}`}
                />
              </List.Item>
            )}
          />
        </>
      ),
    },
    {
      key: "D",
      label: "D Rank",
      children: (
        <>
          <List
            dataSource={enemies.filter((item) => item.rank == "D")}
            pagination={{ pageSize: 5 }}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button
                    type="primary"
                    onClick={() => handleFight(item)}
                    disabled={!!selectedEnemy}
                  >
                    Battle
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={item.name}
                  description={`Hp: ${item.hp}, Atk: ${item.atk}, Def: ${item.def}, Reward: ${item.reward}`}
                />
              </List.Item>
            )}
          />
        </>
      ),
    },
  ];

  const tabsPotion = [
    {
      key: "hpPotion",
      label: "Hp Potion",
      children: (
        <>
          <List
            dataSource={potion
              .sort((a, b) => a.price - b.price)
              .filter((item) => item.type == "hpPotion" && item.have > 0)}
            pagination={{ pageSize: 3 }}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button
                    type="primary"
                    onClick={() => usePotion(item)}
                    disabled={item.have <= 0 || character.hp <= 0}
                  >
                    USE
                  </Button>,
                ]}
              >
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
      label: "Mp Potion",
      children: (
        <>
          <List
            dataSource={potion
              .sort((a, b) => a.price - b.price)
              .filter((item) => item.type == "mpPotion" && item.have > 0)}
            pagination={{ pageSize: 3 }}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button
                    type="primary"
                    onClick={() => usePotion(item)}
                    disabled={item.have <= 0 || character.hp <= 0}
                  >
                    USE
                  </Button>,
                ]}
              >
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
      label: "Mix Potion",
      children: (
        <>
          <List
            dataSource={potion
              .sort((a, b) => a.price - b.price)
              .filter((item) => item.type == "mixPotion" && item.have > 0)}
            pagination={{ pageSize: 3 }}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button
                    type="primary"
                    onClick={() => usePotion(item)}
                    disabled={item.have <= 0 || character.hp <= 0}
                  >
                    USE
                  </Button>,
                ]}
              >
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

  const mainTabs = [
    {
      key: "skill",
      label: "Skill",
      children: (
        <>
          <Tabs defaultActiveKey="Attack">
            {Object.keys(skillsByType).map((type) => (
              <TabPane tab={type} key={type}>
                <List
                  itemLayout="horizontal"
                  dataSource={skillsByType[type]}
                  renderItem={(skill) => (
                    <List.Item
                      actions={[
                        <Button
                          onClick={() => useSkill(skill.id)}
                          disabled={
                            character.mp < skill.mpCost ||
                            !playerTurn ||
                            character.hp <= 0
                          }
                        >
                          Use
                        </Button>,
                      ]}
                    >
                      <List.Item.Meta
                        title={skill.name}
                        description={
                          <>
                            <Paragraph>
                              Damage: {skill.damage || 0}, Heal:
                              {skill.heal || 0}, MP Cost: {skill.mpCost}
                            </Paragraph>
                          </>
                        }
                      />
                    </List.Item>
                  )}
                />
              </TabPane>
            ))}
          </Tabs>
        </>
      ),
    },
    {
      key: "potion",
      label: "Potion",
      children: (
        <>
          <Tabs items={tabsPotion} />
        </>
      ),
    },
  ];

  return (
    <Card title="Combat" className="combat-card">
      <Row gutter={16}>
        <Col span={12}>
          <Title level={4}>Player Status</Title>
          <Paragraph>
            HP: {character.hp} / {maxStats.hp}
          </Paragraph>
          <Progress
            percent={(character.hp / maxStats.hp) * 100}
            showInfo={false}
            strokeColor="green"
            style={{ marginBottom: "10px" }}
          />
          <Paragraph>
            MP: {character.mp} / {maxStats.mp}
          </Paragraph>
          <Progress
            percent={(character.mp / maxStats.mp) * 100}
            showInfo={false}
            strokeColor="blue"
            style={{ marginBottom: "10px" }}
          />
          <Paragraph>Attack: {character.atk}</Paragraph>
          <Paragraph>Defense: {character.def}</Paragraph>
          <Paragraph>
            Crit Rate: {(character.critRate * 100).toFixed(2)} %
          </Paragraph>
          <Paragraph>
            Crit Damage: {(character.critDamage * 100).toFixed(2)} %
          </Paragraph>
          <Paragraph>Gold: {inventory.gold}</Paragraph>
        </Col>

        <Col span={12}>
          <Title level={4}>Enemies</Title>
          {selectedEnemy ? (
            <>
              <Title level={4}>Enemy: {selectedEnemy.name}</Title>

              <Paragraph>
                HP: {selectedEnemy.hp} / {selectedEnemy.maxHp}
              </Paragraph>

              <Progress
                percent={(selectedEnemy.hp / selectedEnemy.maxHp) * 100}
                format={(percent) => `HP: ${Math.round((percent / 100) * 200)}`}
                showInfo={false}
                strokeColor="red"
                style={{ marginBottom: "10px" }}
              />
              <Button
                type="primary"
                onClick={enemyAttack}
                disabled={playerTurn || character.hp <= 0}
                style={{ margin: "10px 0" }}
              >
                End Turn
              </Button>

              <Button
                type="primary"
                onClick={escape}
                style={{ margin: "10px 0" }}
              >
                Escape
              </Button>
            </>
          ) : (
            <Tabs items={tabsEnemies} />
          )}
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col span={24}>
          <Tabs items={mainTabs} />
        </Col>
      </Row>
    </Card>
  );
};

export default Combat;
