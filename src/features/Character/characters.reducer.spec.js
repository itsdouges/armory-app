import proxyquire from 'proxyquire';

const { minimalSelector } = proxyquire('features/Character/characters.reducer', {
  './actions': {},
});

describe('characters.reducer.js', () => {
  describe('selector', () => {
    const mode = 'pve';
    const name = 'Blastrn';

    const buildState = (character) => ({
      items: {},
      skins: {},
      characters: {
        mode,
        data: {
          [name]: character,
        },
      },
    });

    it('should map elite spec', () => {
      const state = buildState({
        profession: 'Engineer',
        specializations: {
          [mode]: [{}, {}, { id: 60 }],
        },
      });

      const data = minimalSelector(state, { name: 'Blastrn' });

      expect(data.character.eliteSpecialization).to.equal('classes.scourge');
    });

    it('should default to profession name', () => {
      const state = buildState({
        profession: 'Engineer',
        specializations: {
          [mode]: [{}, {}, {}],
        },
      });

      const data = minimalSelector(state, { name: 'Blastrn' });

      expect(data.character.eliteSpecialization).to.equal('Engineer');
    });
  });
});
