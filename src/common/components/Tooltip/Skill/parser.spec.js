import parse from './parser';

describe('description parser', () => {
  it('should parse dot skill category from description', () => {
    const description = 'Thing. Yeah it is ok';

    const actual = parse(description);

    expect(actual).to.equal('<c=@skill>Thing.</c> Yeah it is ok');
  });

  it('should parse colon skill category from description', () => {
    const description = 'Other Thing: Yeah it is ok';

    const actual = parse(description);

    expect(actual).to.equal('<c=@skill>Other Thing:</c> Yeah it is ok');
  });

  it('should parrse text with accents', () => {
    const description = 'Méditation : Votre intense concentration vous rend invulnérable et recharge vos vertus.';

    const actual = parse(description);

    expect(actual).to.equal('<c=@skill>Méditation :</c> Votre intense concentration vous rend invulnérable et recharge vos vertus.');
  });

  it('should parse text with weird whitespace', () => {
    const description = 'Signe passif : puissance améliorée.';

    const actual = parse(description);

    expect(actual).to.equal('<c=@skill>Signe passif :</c> puissance améliorée.');
  });

  it('should parse text with newline', () => {
    const description = 'Signet Active: Yeah its ok.\nSignet Passive: Eh what can you do.';

    const actual = parse(description);

    expect(actual).to.equal('<c=@skill>Signet Active:</c> Yeah its ok.\n<c=@skill>Signet Passive:</c> Eh what can you do.');
  });

  it('should ignore descriptions where its only two words', () => {
    const description = 'Yeah things.';

    const actual = parse(description);

    expect(actual).to.equal(description);
  });

  it('shouldnt blow up if no text', () => {
    parse(undefined);
  });
});
