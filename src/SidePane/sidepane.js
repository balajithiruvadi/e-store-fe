import { Drawer, List, ListItem, ListItemButton, ListItemText, Box, CssBaseline, Toolbar } from "@mui/material";

function Sidepane() {
    const anchor = 'left';
    return (
        <Drawer variant="permanent" anchor='left' open={true} sx={{
            width: 240,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
          }} >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    <ListItem>
                        <ListItemButton selected={true}>
                            <ListItemText primary={'Laptop'} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
};

export default Sidepane;
