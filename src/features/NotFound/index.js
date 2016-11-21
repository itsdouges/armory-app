import Head from 'common/components/Head';
import RandomCharacter from 'features/Home/components/RandomCharacter';

const NotFound = () => (
  <div>
    <Head title="Uh Oh!" />
    <h2>{'Couldn\'t find it, man... How about a random character instead?'}</h2>
    <RandomCharacter />
  </div>
);

export default NotFound;
