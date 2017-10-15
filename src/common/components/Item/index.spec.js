import React from 'react';
import { shallow } from 'enzyme';
import proxyquire from 'proxyquire';
import { stubComponent, stubStyles } from 'test/utils';

const TooltipTrigger = stubComponent('TooltipTrigger');
const ResourceLink = stubComponent('ResourceLink');
const Icon = stubComponent('Icon');
const Gw2Icon = stubComponent('Gw2Icon');

const Item = proxyquire.noCallThru().noPreserveCache()('common/components/Item', {
  'common/components/TooltipTrigger': TooltipTrigger,
  'common/components/ResourceLink': {
    buildLink: function(a,b) { return ''; },
  },
  'common/components/Icon': Icon,
  'common/components/Gw2Icon': Gw2Icon,
});


//import Item from './';

describe('<Item />', () => {
  it('should default to item tooltipType', () => {
    const props = {
      name: 'myItem',
      item: { 
        name: 'myItem'
      },
      inlineText: 'gw2spidy',
    };

    const wrapper = shallow(<Item {...props} />);

    // expect(wrapper.find(TooltipTrigger).first().props()).to.include({
    //     type: 'items',
    //   });

  });

  it('should set tooltipData for skin when tooltipType is "skins"', () => {
  });
});
