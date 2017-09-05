import React from 'react';
import { shallow } from 'enzyme';
import { stubComponent, stubRedux, stubStyles, describeConnect } from 'test/utils';

const styles = stubStyles([
  'item',
]);

const sandbox = sinon.sandbox.create();
const applyAttributes = sandbox.stub();
const Item = stubComponent('Item');
const actions = {
  fetchItems: sandbox.spy(),
  fetchItemStats: sandbox.spy(),
};

const stubs = {
  ...stubRedux,
  'features/Gw2/actions': actions,
  'common/components/Item': Item,
  'lib/gw2/itemStats': applyAttributes,
  './styles.less': styles,
};

const ItemsEmbed = proxyquire('embeds/components/Items', stubs);

describe('<Items /> embed', () => {
  const props = {
    ...actions,
    extra: true,
    className: 'cool-class',
    ids: [1, 2, -1],
    statIds: {
      4: 5,
    },
    blankText: 'optional_text',
    mode: 'item',
    items: {
      2: {
        details: {},
      },
    },
    size: 2,
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ItemsEmbed {...props} />);
  });

  context('when mounting', () => {
    it('should fetch items', () => {
      expect(actions.fetchItems).to.have.been.calledWith(props.ids);
    });

    it('should fetch itemStats', () => {
      expect(actions.fetchItemStats).to.have.been.calledWith(
        Object.values(props.statIds).map((id) => +id)
      );
    });
  });

  describe('rendering', () => {
    it('should set classname', () => {
      expect(wrapper).to.have.className(props.className);
    });

    it('should render items', () => {
      expect(wrapper.find(Item).at(0).props()).to.include({
        item: undefined,
        name: undefined,
        tooltipType: undefined,
        className: styles.item,
        size: props.size,
        extra: true,
      });

      expect(wrapper.find(Item).at(1).props()).to.include({
        item: props.items[2],
        name: undefined,
        tooltipType: undefined,
        className: styles.item,
        size: props.size,
        extra: true,
      });

      expect(wrapper.find(Item).at(2).props()).to.include({
        tooltipTextOverride: props.blankText,
        size: props.size,
      });
    });
  });

  describeConnect('embeds/components/Items', stubs, (mstp, mdtp) => {
    const store = {
      items: { cool: 'item' },
      itemStats: { neat: 'stat' },
      other: 'value',
    };

    it('should map state to props', () => {
      const mappedProps = mstp(store);

      expect(mappedProps).to.eql({
        items: store.items,
        itemStats: store.itemStats,
      });
    });

    it('should map dispatch to props', () => {
      expect(mdtp).to.eql(actions);
    });
  });
});
