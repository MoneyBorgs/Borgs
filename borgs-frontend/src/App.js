import { RouterContext, RouterView } from 'mobx-state-router';
import { initRouter, routes } from './router/initRouter';
import NavBar from './components/NavBar';
import { NotFoundPage } from './pages/NotFoundPage';
import { deepmerge } from '@mui/utils';
import { experimental_extendTheme as extendMuiTheme } from '@mui/material/styles';
import colors from '@mui/joy/colors';
import {
  extendTheme as extendJoyTheme,
  CssVarsProvider,
  useColorScheme,
} from '@mui/joy/styles';

const muiTheme = extendMuiTheme({
  // This is required to point to `var(--joy-*)` because we are using `CssVarsProvider` from Joy UI.
  cssVarPrefix: 'joy',
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: colors.blue[500],
        },
        grey: colors.grey,
        error: {
          main: colors.red[500],
        },
        info: {
          main: colors.purple[500],
        },
        success: {
          main: colors.green[500],
        },
        warning: {
          main: colors.yellow[200],
        },
        common: {
          white: '#FFF',
          black: '#09090D',
        },
        divider: colors.grey[200],
        text: {
          primary: colors.grey[800],
          secondary: colors.grey[600],
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: colors.blue[600],
        },
        grey: colors.grey,
        error: {
          main: colors.red[600],
        },
        info: {
          main: colors.purple[600],
        },
        success: {
          main: colors.green[600],
        },
        warning: {
          main: colors.yellow[300],
        },
        common: {
          white: '#FFF',
          black: '#09090D',
        },
        divider: colors.grey[800],
        text: {
          primary: colors.grey[100],
          secondary: colors.grey[300],
        },
      },
    },
  },
});

const joyTheme = extendJoyTheme();

// You can use your own `deepmerge` function.
// joyTheme will deeply merge to muiTheme.
const theme = deepmerge(muiTheme, joyTheme);

function App() {
  const routerStore = initRouter();

  const viewMap = getMappingFromRoutes(routes);

  return (
    <RouterContext.Provider value={routerStore}>
        {routerStore.getCurrentRoute() && routerStore.getCurrentRoute().showNavBar ? <NavBar/> : null}
      <CssVarsProvider theme={theme}>
        <RouterView viewMap={viewMap} />
      </CssVarsProvider>
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
