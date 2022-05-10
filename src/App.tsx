import './App.css';
import { ApplicationRouterConfig } from './Component/RouterGuardComponent';
import { LoginProvider } from './Context/LoginContext';
import { getItem } from './Services/InvokeAWS/InvokeBaseDynamoDBAPI';

const App = () => {
  return (
    <LoginProvider>
      <ApplicationRouterConfig />
    </LoginProvider>
  );
}

export default App;
