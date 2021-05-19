import PouchDB from 'pouchdb/dist/pouchdb';
import 'semantic-ui-css/semantic.min.css';

import RegisterForm from '../components/RegisterForm';
export function App() {
  const db = new PouchDB('users');
  return (
    <RegisterForm usersDb={db} />
  );
}

export default App;
