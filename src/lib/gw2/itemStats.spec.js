import applyAttributes from './itemStats';

// New Stat (Quad Attrib)
const STAT_MINSTREL = {
  "id": 1134,
  "name": "Minstrel's",
  "attributes": {
    "Toughness": 0.3,
    "Vitality": 0.165,
    "Healing": 0.3,
    "BoonDuration": 0.165
  }
}

// Celectiel stat (7 Attrib)
const STAT_CELECTIEL = {
  "id": 588,
  "name": "Celestial",
  "attributes": {
    "Power": 0.165,
    "Precision": 0.165,
    "Toughness": 0.165,
    "Vitality": 0.165,
    "CritDamage": 0.165,
    "Healing": 0.165,
    "ConditionDamage": 0.165
  }
}

// Berseker (3 Attrib - Legacy)
const STAT_BERSEKER = {
  "id": 161,
  "name": "Berserker's",
  "attributes": {
    "Power": 0.35,
    "Precision": 0.25,
    "CritDamage": 0.25
  }
}

const SELECTABLE_RING = {
  "name": "Black Ice Band",
  "description": "<c=@flavor>An icy chill emanates from the ring.</c>",
  "type": "Trinket",
  "level": 80,
  "rarity": "Ascended",
  "vendor_value": 495,
  "game_types": [
    "Activity",
    "Wvw",
    "Dungeon",
    "Pve"
  ],
  "flags": [
    "HideSuffix",
    "AccountBound",
    "NoSell",
    "NotUpgradeable",
    "Unique",
    "DeleteWarning",
    "AccountBindOnUse"
  ],
  "restrictions": [],
  "id": 79712,
  "chat_link": "[&AgFgNwEA]",
  "icon": "https://render.guildwars2.com/file/ABA374A30ADC99376BBAF811CFDF0E72E1B36050/1601394.png",
  "details": {
    "type": "Ring",
    "infusion_slots": [
      {
        "flags": [
          "Infusion"
        ]
      }
    ],
    "secondary_suffix_item_id": "",
    "stat_choices": [
      588, 656, 659, 658, 660, 584, 586, 583, 657, 585, 592, 581, 591, 1064, 1066, 1139,
      1162, 1115, 1134, 1130, 1125, 1038, 1114, 1037, 1119, 1163, 1128, 690, 1097, 1035,
      1145, 1098, 1220
    ]
  }
}

function pack(...args) {
  return args;
}

function attr(name, value) {
  return {
    attribute: name,
    modifier: value,
  }
}

describe("itemStats", () => {
  describe("applyAttributes", () => {
    it("should return empty list if no item", () => {
      const ret = applyAttributes(undefined, {});
      expect(ret).to.be.deep.equal([]);
    });

    it("should return empty list if no stat", () => {
      const ret = applyAttributes({}, undefined);
      expect(ret).to.be.deep.equal([]);
    });

    it("should return empty list if item exists but missing info", () => {
      const ret = applyAttributes({}, {});
      expect(ret).to.be.deep.equal([]);
    });

    it("should work for back items (Without details)", () => {
      const ret = applyAttributes({
        type: "Back",
        details: {},
        rarity: "ascended",
        level: 80
      }, STAT_MINSTREL);
      expect(ret).to.be.deep.equal(pack(
        attr("Toughness", 52),
        attr("Vitality", 27),
        attr("Healing", 52),
        attr("BoonDuration", 27),
      ));
    });

    it("should work for ring with 3 Stats", () => {
      const ret = applyAttributes(SELECTABLE_RING, STAT_BERSEKER);
      expect(ret).to.be.deep.equal(pack(
        attr("Power", 126),
        attr("Precision", 85),
        attr("CritDamage", 85),
      ));
    });

    it("should work for ring with 4 Stats", () => {
      const ret = applyAttributes(SELECTABLE_RING, STAT_MINSTREL);
      expect(ret).to.be.deep.equal(pack(
        attr("Toughness", 106),
        attr("Vitality", 56),
        attr("Healing", 106),
        attr("BoonDuration", 56),
      ));
    });

    it("should work for ring with 7 Stats", () => {
      const ret = applyAttributes(SELECTABLE_RING, STAT_CELECTIEL);
      expect(ret).to.be.deep.equal(pack(
        attr("Power", 57),
        attr("Precision", 57),
        attr("Toughness", 57),
        attr("Vitality", 57),
        attr("CritDamage", 57),
        attr("Healing", 57),
        attr("ConditionDamage", 57),
      ));
    });
  });
});
