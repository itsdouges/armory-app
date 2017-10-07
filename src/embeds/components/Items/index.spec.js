import React from 'react';
import { shallow } from 'enzyme';
import { stubComponent, stubStyles } from 'test/utils';

const styles = stubStyles([
  'item',
]);

const sandbox = sinon.sandbox.create();
const applyAttributes = sandbox.stub();
const Item = stubComponent('Item');
const Gw2Item = stubComponent('Gw2Item');

const stubs = {
  'common/components/Item': Item,
  'common/components/Gw2Item': Gw2Item,
  'lib/gw2/itemStats': applyAttributes,
  './styles.less': styles,
};

const ItemsEmbed = proxyquire('embeds/components/Items', stubs);

describe('<Items /> embed', () => {
  const props = {
    extra: true,
    className: 'cool-class',
    ids: [1, 2, -1],
    statIds: {
      2: 5,
    },
    blankText: 'optional_text',
    mode: 'item',
    size: 2,
    skinIds: {
      2: 4,
    },
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ItemsEmbed {...props} />);
  });

  describe('rendering', () => {
    it('should set classname', () => {
      expect(wrapper).to.have.className(props.className);
    });

    it('should set tooltip type to amulets if mode is rune', () => {
      wrapper = shallow(<ItemsEmbed {...props} mode="rune" />);

      expect(wrapper.find(Gw2Item).first().props()).to.include({
        name: 'Rune',
        tooltipType: 'amulets',
      });
    });

    it('should render items', () => {
      expect(wrapper.find(Gw2Item).first().props()).to.include({
        id: 1,
        name: undefined,
        tooltipType: undefined,
        className: styles.item,
        size: props.size,
        extra: true,
      });

      expect(wrapper.find(Gw2Item).at(1).props()).to.include({
        id: 2,
        name: undefined,
        tooltipType: undefined,
        className: styles.item,
        size: props.size,
        skinId: 4,
        statsId: 5,
        extra: true,
      });

      expect(wrapper.find(Item).props()).to.include({
        tooltipTextOverride: props.blankText,
        size: props.size,
      });
    });
  });
});
