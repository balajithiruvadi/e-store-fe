import { AppBar, Toolbar, Typography } from "@mui/material";

function Header() {
    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: 'black' }}>
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    E-Store
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header;