import Sidepane from "../SidePane/sidepane";
import Datagrid from "../Datagrid/datagrid";
import { Box, CssBaseline } from "@mui/material";

function Dashboard() {
    return (
        <div style={{width:'90%'}}>
            <CssBaseline />
            <Sidepane />
            <Datagrid />
        </div>
    )
}
export default Dashboard;
