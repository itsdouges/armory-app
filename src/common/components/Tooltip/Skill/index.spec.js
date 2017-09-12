import React from 'react';
import { shallow } from 'enzyme';

const sandbox = sinon.sandbox.create();
const markup = sandbox.stub();

const SkillTooltip = proxyquire('common/components/Tooltip/Skill', {
  'lib/gw2/parse': { markup },
});

describe('<SkillTooltip />', () => {
  it('should parse dot skill category from description', () => {
    const props = {
      data: {
        name: 'Item',
        description: 'Thing. Yeah it is ok',
      },
    };
    shallow(<SkillTooltip {...props} />);

    expect(markup).to.have.been.calledWith('<c=@skill>Thing.</c> Yeah it is ok');
  });

  it('should parse colon skill category from description', () => {
    const props = {
      data: {
        name: 'Item',
        description: 'Thing: Yeah it is ok',
      },
    };
    shallow(<SkillTooltip {...props} />);

    expect(markup).to.have.been.calledWith('<c=@skill>Thing.</c> Yeah it is ok');
  });
});
