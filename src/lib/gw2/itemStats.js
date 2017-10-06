import { queryItemAttributes } from 'gw2itemstats';

function convertType (apiType) {
  switch (apiType) {
    case 'Back':
      return 'back item';
    default:
      return apiType;
  }
}

function calcAttribute (base, modifier) {
  return base + modifier;
}

function getMajorKeys (itemAttributes, selectedStat) {
  const attributes = Object.keys(selectedStat.attributes);
  const values = attributes.map((key) => selectedStat.attributes[key]);

  const majorAttributeValue = Math.max(...values);
  return attributes.filter(
    (key) => selectedStat.attributes[key] === majorAttributeValue
  );
}

function getCalcFunctionStandard (itemAttributes, selectedStat) {
  const majorAttributeKeys = getMajorKeys(itemAttributes, selectedStat);
  const calcMajor = (v) => calcAttribute(parseInt(itemAttributes.majorAttribute, 10), 32, v);
  const calcMinor = (v) => calcAttribute(parseInt(itemAttributes.minorAttribute, 10), 18, v);
  const isMajor = (attr) => (majorAttributeKeys.indexOf(attr) > -1);
  return (attr, v) => (isMajor(attr) ? calcMajor(v) : calcMinor(v));
}

function getCalcFunctionQuad (itemAttributes, selectedStat) {
  const majorAttributeKeys = getMajorKeys(itemAttributes, selectedStat);
  const calcMajor = (v) => calcAttribute(parseInt(itemAttributes.majorQuadAttribute, 10), 25, v);
  const calcMinor = (v) => calcAttribute(parseInt(itemAttributes.minorQuadAttribute, 10), 12, v);
  const isMajor = (attr) => (majorAttributeKeys.indexOf(attr) > -1);
  return (attr, v) => (isMajor(attr) ? calcMajor(v) : calcMinor(v));
}

function getCalcFunctionQuadOld (itemAttributes, selectedStat) {
  const minorValue = parseInt(itemAttributes.minorAttribute, 10);
  const majorAttributeKeys = getMajorKeys(itemAttributes, selectedStat);
  const calcMajor = (v) => calcAttribute(parseInt(itemAttributes.majorAttribute, 10), 32, v);
  const calcMinor = (v) => calcAttribute(minorValue, 18, v);

  // This is the most hacky thing ever, but we have 2 items that we need
  // to detect by the position in attributes.
  const isMajorMinor = (attr) => Object.keys(selectedStat.attributes).indexOf(attr) === 3;
  const isMajor = (attr) => (majorAttributeKeys.indexOf(attr) > -1);
  return (attr, v) => {
    if (isMajor(attr)) {
      return calcMajor(v);
    }
    if (isMajorMinor(attr)) {
      return calcMinor(v);
    }

    if (v === 0) {
      return calcAttribute(0, 18, v);
    }
    return calcAttribute(minorValue, 0, v);
  };
}

function getCalcFunctionCelectiel (itemAttributes) {
  return () => calcAttribute(parseInt(itemAttributes.celestialNbr, 10), 13);
}

function getCalcFunction (itemAttributes, selectedStat) {
  if (selectedStat.name.includes(' and ')) {
    return getCalcFunctionQuadOld(itemAttributes, selectedStat);
  }

  switch (Object.keys(selectedStat.attributes).length) {
    case 3:
      return getCalcFunctionStandard(itemAttributes, selectedStat);
    case 4:
      return getCalcFunctionQuad(itemAttributes, selectedStat);
    case 7:
      return getCalcFunctionCelectiel(itemAttributes);
    default:
      throw new Error('impossible condition');
  }
}

export default function applyAttributes (item, selectedStat) {
  if (!item || !selectedStat) {
    return [];
  }

  const type = convertType((item.details && item.details.type) || item.type);
  if (!type || !item.rarity || !item.level) {
    return [];
  }

  const itemAttributes = queryItemAttributes(
    type.toLowerCase(),
    item.rarity.toLowerCase(),
    item.level
  );

  const calcModifier = getCalcFunction(itemAttributes, selectedStat);
  return Object.keys(selectedStat.attributes)
    .map((attribute) => ({
      attribute,
      // TODO: need to calculate modifier, how?
      modifier: calcModifier(attribute, selectedStat.attributes[attribute]),
    }));
}
