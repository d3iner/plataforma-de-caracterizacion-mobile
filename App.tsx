import './gesture-handler';
import ContextProvider from './src/context/ContextProvider';
import StackNavigator from './src/components/router/StackNavigator';

export default function App() {
  return (
    <ContextProvider>
      <StackNavigator/>
    </ContextProvider>
  );
}
