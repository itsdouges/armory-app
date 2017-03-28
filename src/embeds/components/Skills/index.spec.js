import { mount } from 'enzyme';
import { stubComponent, stubStyles, describeConnect, stubRedux } from 'test/utils';

const styles = stubStyles([
  'skill',
]);

const Skill = stubComponent('Skill');
const fetchSkills = () => {};
const stubs = {
  ...stubRedux,
  'features/Character/components/Skill': Skill,
  'features/Gw2/actions': {
    fetchSkills,
  },
  './styles.less': styles,
};

const SkillsEmbed = proxyquire('embeds/components/Skills', stubs);

describe('<SkillsEmbed />', () => {
  describeConnect('embeds/components/Skills', stubs, (mstp, mdtp) => {
    it('should map state to props', () => {
      const state = {
        skills: 'neat-skills',
        other: 'stuff',
      };

      const props = mstp(state);

      expect(props).to.eql({
        skills: state.skills,
      });
    });

    it('should map dispatch to props', () => {
      expect(mdtp).to.eql({
        fetchSkills,
      });
    });
  });

  context('when mounting', () => {
    it('should fetch skills', () => {
      const fetchSkillsSpy = sinon.spy();
      const ids = [1, 2, 3];
      mount(<SkillsEmbed ids={ids} fetchSkills={fetchSkillsSpy} />);

      expect(fetchSkillsSpy).to.have.been.calledWith(ids);
    });
  });
});
