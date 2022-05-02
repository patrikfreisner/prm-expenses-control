import './App.css';
import { ApplicationRouterConfig } from './Component/RouterGuardComponent';
import { LoginProvider } from './Context/LoginContext';

const App = () => {
  return (
    <LoginProvider>
      <ApplicationRouterConfig />
    </LoginProvider>
  );
}

export default App;
