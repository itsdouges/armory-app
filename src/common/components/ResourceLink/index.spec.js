import React from 'react';
import { shallow } from 'enzyme';
import { stubStyles } from 'test/utils';
import LoadingStrip from 'common/components/LoadingStrip';

const styles = stubStyles([
  'root',
  'link',
]);

const { buildLink, default: ResourceLink } = proxyquire('common/components/ResourceLink', {
  'lib/i18n': { get: () => 'en' },
  './styles.less': styles,
}, true);

describe('ResourceLink.js', () => {
  describe('<ResourceLink />', () => {
    const overflow = {
      onClick: () => {},
      random: true,
    };

    const props = {
      children: <span />,
      href: 'https://google.com',
      text: 'Cool Item',
      ...overflow,
    };

    it('should render link if href exists', () => {
      const wrapper = shallow(<ResourceLink {...props} />);

      expect(wrapper.find('a').props()).to.include({
        rel: 'noopener noreferrer',
        target: '_blank',
        href: props.href,
        className: styles.link,
      });

      expect(wrapper.find('a').find(LoadingStrip)).prop('children').to.equal(props.text);
    });

    it('should render only children if href doesnt exist', () => {
      const wrapper = shallow(<ResourceLink {...props} href={undefined} />);

      expect(wrapper.find('a')).to.not.exist;
    });

    it('should copy overflow props to children', () => {
      const wrapper = shallow(<ResourceLink {...props} />);

      expect(wrapper.props()).to.include({
        className: styles.root,
        ...overflow,
      });
    });
  });

  describe('link builder', () => {
    const text = 'Neat Item Name';

    it('should build wiki link', () => {
      const actual = buildLink('wiki', text);

      expect(actual).to.equal(`http://wiki-en.guildwars2.com/wiki/Special:Search/${text}`);
    });

    it('should return input if no match', () => {
      const href = 'https://google.com';

      const actual = buildLink(href);

      expect(actual).to.equal(href);
    });
  });
});
