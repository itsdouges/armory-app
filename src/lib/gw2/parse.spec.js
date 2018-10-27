import { shallow } from 'enzyme';

const { markup } = proxyquire('lib/gw2/parse', {
  'common/styles/colours.less': {
    black: 'black',
  },
});

describe('gw2 markup parser', () => {
  it('should parse text', () => {
    const raw = '<c=@black>Thing.</c> Yeah it is ok.\nBut really, is it?<br>Dunno!';

    const jsx = markup(raw);
    const wrapper = shallow(jsx);

    expect(wrapper.props().dangerouslySetInnerHTML.__html).to.eql(
      '<span class="black">Thing.</span> Yeah it is ok.<br />But really, is it?<br />Dunno!'
    );
  });

  it('should handle i18n', () => {
    const raw =
      '<c=@black>Méditation.</c> Votre intense concentration vous rend invulnérable et recharge vos vertus.';

    const jsx = markup(raw);
    const wrapper = shallow(jsx);

    expect(wrapper.props().dangerouslySetInnerHTML.__html).to.eql(
      '<span class="black">Méditation.</span> Votre intense concentration vous rend invulnérable et recharge vos vertus.'
    );
  });
});
