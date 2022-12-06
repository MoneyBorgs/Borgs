import * as React from 'react';
import { useRouterStore } from 'mobx-state-router';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useStores } from '../hooks/useStores';
import UserStore from '../stores/UserStore';
import { SettingsModal } from "./users/SettingsModal"

let routerStore;

export interface IPage {
	key: string,
	displayName: string,
	onClick: () => void
}

const pages : IPage[] = [
	{
		key: 'dashboard',
		displayName: 'Dashboard',
		onClick: () => {
			routerStore.goTo('mainpage');
		}
	},
	{
		key: 'accounts',
		displayName: 'Accounts',
		onClick: () => {
			routerStore.goTo('accounts');
		}
	},
	{
		key: 'transactions',
		displayName: 'Transactions',
		onClick: () => {
			routerStore.goTo('transactions');
		}
	},
	{
		key: 'reports',
		displayName: 'Reports',
		onClick: () => {
			routerStore.goTo('reports');
		}
	},
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const [isModal1Open, setIsModen1Open] = React.useState(false);

	routerStore = useRouterStore()

	let { userStore } = useStores();

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		userStore.updateLoginStatus(false);
		routerStore.goTo("register");
		setAnchorElUser(null);
	};

	const handleSettingsMenu = (event) => {
		setAnchorElUser(null);
		setIsModen1Open(true);
	}

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						BORGS
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							{pages.map((page) => (
								<MenuItem key={page.key} onClick={handleCloseNavMenu}>
									<Typography textAlign="center">{page.displayName}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Typography
						variant="h5"
						noWrap
						component="a"
						href=""
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						BORGS
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages.map((page) => (
							<Button
								key={page.key}
								onClick={page.onClick}
								sx={{ my: 2, color: 'white', display: 'block' }}
							>
								{page.displayName}
							</Button>
						))}
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open settings">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								Profile
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: '45px' }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							<MenuItem onClick={handleCloseUserMenu}>
								<Typography textAlign="center">Logout</Typography>
							</MenuItem>
							<MenuItem onClick={handleSettingsMenu}>
								<Typography textAlign="center">Settings</Typography>
							</MenuItem>
						</Menu>
						<SettingsModal open={isModal1Open} onClose={() => {setIsModen1Open(false)}}/>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default ResponsiveAppBar;