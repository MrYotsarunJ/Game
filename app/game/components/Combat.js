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
import { useState } from "react";

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;

const Combat = ({
  character,
  setCharacter,
  setCombatLog,
  combatLog,
  skills,
  enemies,
}) => {
  const [selectedEnemy, setSelectedEnemy] = useState(null);
  const [playerTurn, setPlayerTurn] = useState(true); // Player starts the turn

  const handleFight = (enemy) => {
    setSelectedEnemy(enemy);
    setPlayerTurn(true); // Ensure player starts the turn
  };

  const fightEnemy = (enemy) => {
    const result = `Defeated ${enemy.name}`;
    setCombatLog((prev) => [...prev, result]);
    notification.success({
      message: "Victory!",
      description: `You have defeated ${enemy.name} and earned rewards.`,
    });
  };

  const useSkill = (skillIndex) => {
    if (!playerTurn || !selectedEnemy) {
      notification.error({
        message: "Invalid Action",
        description: "Please select an enemy and make sure it is your turn.",
      });
      return;
    }

    const skill = skills[skillIndex];

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

    // Determine skill effect
    let logMessage = "";
    switch (skill.type) {
      case "Attack":
        // Calculate and apply damage
        let damage = (skill.damage || 0) + character.atk;
        const isCritical = Math.random() < character.critRate;
        damage = isCritical ? damage * (1 + character.critDamage) : damage;
        damage = Math.max(damage - selectedEnemy.def, 0); // Apply enemy defense

        setSelectedEnemy((prev) => {
          const newHp = Math.max(prev.hp - damage, 0);
          return { ...prev, hp: newHp };
        });

        logMessage = `Used ${skill.name} dealing ${damage.toFixed(2)} damage.`;
        break;

      case "Heal":
        // Heal player
        const healAmount = skill.heal || 0;
        setCharacter((prev) => ({
          ...prev,
          hp: Math.min(prev.hp + healAmount, 100), // Assume max HP is 100
        }));

        logMessage = `Used ${skill.name} healing ${healAmount} HP.`;
        break;

      case "Defense":
        // Increase defense
        const defIncrease = skill.defIncrease || 0;
        setCharacter((prev) => ({
          ...prev,
          def: prev.def + defIncrease,
        }));

        logMessage = `Used ${skill.name} increasing DEF by ${defIncrease}.`;
        break;

      default:
        notification.error({
          message: "Unknown Skill Type",
          description: `Skill type ${skill.type} is not recognized.`,
        });
        return;
    }

    const usePotion = (type) => {
      setCharacter((prev) => {
        if (prev.inventory[type] > 0) {
          let newHp = prev.hp;
          let newMp = prev.mp;
          if (type === "hpPotion") {
            newHp = Math.min(prev.hp + 50, 100); // Restores 50 HP
          } else if (type === "mpPotion") {
            newMp = Math.min(prev.mp + 30, 50); // Restores 30 MP
          }

          return {
            ...prev,
            hp: newHp,
            mp: newMp,
            inventory: {
              ...prev.inventory,
              [type]: prev.inventory[type] - 1,
            },
          };
        }
        return prev;
      });
    };

    // Update combat log and keep only the last 5 entries
    setCombatLog((prev) => {
      const newLog = [...prev, logMessage];
      return newLog.slice(-5);
    });

    // Check if the enemy is defeated
    if (selectedEnemy.hp <= 0) {
      const rewardGold = selectedEnemy.reward;
      setCombatLog((prev) =>
        [
          ...prev,
          `Defeated ${selectedEnemy.name}. You received ${rewardGold} Gold!`,
        ].slice(-5)
      );
      setCharacter((prev) => ({
        ...prev,
        gold: prev.gold + rewardGold,
      }));
      setSelectedEnemy(null);
      setPlayerTurn(true); // Allow player to select a new enemy
      return;
    }

    // End player's turn and start enemy's turn
    setPlayerTurn(false);
    setTimeout(enemyAttack, 1000); // Delay enemy attack to simulate turn-based combat
  };

  const enemyAttack = () => {
    if (selectedEnemy && selectedEnemy.hp > 0) {
      // Calculate damage dealt by enemy
      const damage = Math.max(selectedEnemy.atk - character.def, 0);
      setCharacter((prev) => {
        const newHp = Math.max(prev.hp - damage, 0);
        return { ...prev, hp: newHp };
      });

      setCombatLog((prev) => {
        const newLog = [
          ...prev,
          `${selectedEnemy.name} attacked dealing ${damage} damage.`,
        ];
        return newLog.slice(-5);
      });

      // Check if player is defeated
      if (character.hp <= 0) {
        setCombatLog((prev) =>
          [...prev, `You were defeated by ${selectedEnemy.name}.`].slice(-5)
        );
        setSelectedEnemy(null);
        setPlayerTurn(true); // Player can select a new enemy
        return;
      }

      // End enemy's turn and allow player to act
      setPlayerTurn(true);
    }
  };

  // Group skills by type
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.type]) acc[skill.type] = [];
    acc[skill.type].push(skill);
    return acc;
  }, {});

  return (
    <Card title="Combat" className="combat-card">
      <Row gutter={16}>
        <Col span={12}>
          <Title level={4}>Player Status</Title>
          <Paragraph>HP: {character.hp}</Paragraph>
          <Progress
            percent={(character.hp / 100) * 100}
            showInfo={false}
            strokeColor="green"
            style={{ marginBottom: "10px" }}
          />
          <Paragraph>MP: {character.mp}</Paragraph>
          <Progress
            percent={(character.mp / 50) * 100}
            showInfo={false}
            strokeColor="blue"
            style={{ marginBottom: "10px" }}
          />
          <Paragraph>Attack: {character.atk}</Paragraph>
          <Paragraph>Defense: {character.def}</Paragraph>
          <Paragraph>Gold: {character.gold}</Paragraph>

          <Button
            type="primary"
            onClick={() => usePotion("hpPotion")}
            disabled={character.inventory.hpPotion <= 0 || character.hp <= 0}
          >
            Use HP Potion ({character.inventory.hpPotion})
          </Button>
          <Button
            type="primary"
            onClick={() => usePotion("mpPotion")}
            disabled={character.inventory.mpPotion <= 0 || character.hp <= 0}
          >
            Use MP Potion ({character.inventory.mpPotion})
          </Button>
        </Col>
        <Col span={12}>
          <Title level={4}>Enemies</Title>
          {selectedEnemy ? (
            <>
              <Title level={4}>Enemy: {selectedEnemy.name}</Title>
              <Progress
                percent={(selectedEnemy.hp / 200) * 100}
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
            </>
          ) : (
            <List
              itemLayout="horizontal"
              dataSource={enemies}
              renderItem={(enemy) => (
                <List.Item
                  actions={[
                    <Button
                      onClick={() => handleFight(enemy)}
                      disabled={!!selectedEnemy}
                    >
                      {selectedEnemy === enemy ? "Selected" : "Select"}
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    title={enemy.name}
                    description={
                      <>
                        <Paragraph>HP: {enemy.hp}</Paragraph>
                        <Paragraph>Attack: {enemy.atk}</Paragraph>
                        <Paragraph>Defense: {enemy.def}</Paragraph>
                        <Paragraph>Reward: {enemy.reward} Gold</Paragraph>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          )}
        </Col>

        <Col span={24} style={{ marginTop: "20px" }}>
          {/* Display combat log for rewards */}
          <Title level={4}>Combat Log</Title>
          <List
            dataSource={combatLog}
            renderItem={(log, index) => (
              <List.Item key={index}>
                <Paragraph>{log}</Paragraph>
              </List.Item>
            )}
          />
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col span={24}>
          <Title level={4}>Skills</Title>
          <Tabs defaultActiveKey="Attack">
            {Object.keys(groupedSkills).map((type) => (
              <TabPane tab={type} key={type}>
                <List
                  itemLayout="horizontal"
                  dataSource={groupedSkills[type]}
                  renderItem={(skill, index) => (
                    <List.Item
                      actions={[
                        <Button
                          onClick={() => useSkill(index)}
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
                              Damage: {skill.damage + character.atk || 0}
                            </Paragraph>
                            <Paragraph>Heal: {skill.heal || 0}</Paragraph>
                            <Paragraph>MP Cost: {skill.mpCost}</Paragraph>
                          </>
                        }
                      />
                    </List.Item>
                  )}
                />
              </TabPane>
            ))}
          </Tabs>
        </Col>
      </Row>
    </Card>
  );
};

export default Combat;
