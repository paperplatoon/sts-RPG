let basicCardsNew = {

tackle: {
    cardID: 24,
    name: "Sword Slash",
    text: (state, index, array) => { 
        let textString = `Deal ${array[index].baseDamage + (array[index].upgrades*5) + state.playerMonster.strength} damage`;
      if (array[index].baseHits === 1) {
        textString += ` ${array[index].baseHits} times` 
      } 
      if (array[index].targetType === "front") {
        textString += ` to the enemy in front`
      } else if (array[index].targetType === "all") {
        textString += ` to ALL enemies`
      } 
  },
  minReq: (state, index, array) => {
    return array[index].baseCost;
  },
    baseCost: 1,
    cost:  (state, index, array) => {
      return array[index].baseCost;
    },
    targetType: "front",
    upgrades: 0,
    baseDamage: 10,
    baseHits: 1,
    cardType: "attack",
    elementType: "fire",
    action: async (stateObj, index, array) => {
      let calculatedDamage = array[index].baseDamage + (array[index].upgrades*5)
      await addDiscardAnimation(index)
      await addDealOpponentDamageAnimation(stateObj, calculatedDamage)
      await pause(350)
      await finishDiscardAnimation(index)
      await removeDealOpponentDamageAnimation(stateObj, calculatedDamage)

      stateObj = await dealOpponentDamage(stateObj, calculatedDamage, array[index].baseHits, array[index].baseCost, array[index].targetType)
      return stateObj;
    }
  },

}