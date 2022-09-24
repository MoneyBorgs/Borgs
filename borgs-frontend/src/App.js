import { RouterContext, RouterView } from 'mobx-state-router';
import { initRouter } from './router/initRouter';
import { viewMap } from './router/viewMap';

function App() {

  const routerStore = initRouter();

  return (
    <RouterContext.Provider value={routerStore}>
      <RouterView viewMap={viewMap} />
    </RouterContext.Provider>
  );
}

export default App;
