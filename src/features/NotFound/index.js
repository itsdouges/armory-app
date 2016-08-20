import Title from 'react-title-component';

const NotFound = () => (
  <div>
    <Title render={(title) => `Uh Oh!${title}`} />
    <h2>Not Found :-(</h2>
  </div>
);

export default NotFound;
