import { RouterContext, RouterView } from 'mobx-state-router';
import { initRouter, routes } from './router/initRouter';
import NavBar from './components/NavBar';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  const routerStore = initRouter();

  const viewMap = getMappingFromRoutes(routes);

  return (
    <RouterContext.Provider value={routerStore}>
      {routerStore.getCurrentRoute() && routerStore.getCurrentRoute().showNavBar ? <NavBar/> : null}
      <RouterView viewMap={viewMap} />
    </RouterContext.Provider>
  );
}

function getMappingFromRoutes(routes) {
  let map = {};

  map['notFound'] = <NotFoundPage/>;

  for(const route of routes) {
    map[route.name] = route.container;
  }

  return map;
}

export default App;
