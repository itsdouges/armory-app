import React from 'react';
import { shallow } from 'enzyme';
import proxyquire from 'proxyquire';
import { stubComponent } from 'test/utils';

const ProgressBar = stubComponent('ProgressBar');

const Achievement = proxyquire.noCallThru().noPreserveCache()('./', {
  'common/components/ProgressBar': ProgressBar,
}).default;

describe('<Achievement />', () => {
  it('should map unknown mastery reward to desert for tooltip', () => {
    const props = {
      achievement: {
        tiers: [],
        rewards: [
          {
            type: 'Mastery',
            region: 'Unknown',
          },
        ],
      },
    };

    const wrapper = shallow(<Achievement {...props} />);

    expect(
      wrapper
        .find('TooltipTrigger')
        .findWhere(instance => instance.props().data === 'Desert words.masteryPoint')
    ).to.exist;
  });

  it('should map unknown mastery reward to desert for icon', () => {
    const props = {
      achievement: {
        tiers: [],
        rewards: [
          {
            type: 'Mastery',
            region: 'Unknown',
          },
        ],
      },
    };

    const wrapper = shallow(<Achievement {...props} />);

    expect(
      wrapper
        .find('Icon')
        .findWhere(instance => instance.props().name === 'mastery-point-desert.png')
    ).to.exist;
  });
});
