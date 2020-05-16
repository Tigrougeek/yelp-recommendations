import React, {useState} from 'react';
import useResources from "./useResources";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import LocationCity from "@material-ui/icons/LocationCity";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";

const CityList = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null)
    };

    const cityList = useResources('main_cities.json')

    return(
        <AppBar position="static">
            <Toolbar>
        <div>
            <Button
                color="primary"
                style={{color: 'white'}}
                startIcon={<LocationCity/>}
                onClick={handleMenu}
            >
            </Button>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
              {
                  Object.entries(cityList).sort((e1, e2) => e1[1].localeCompare(e2[1])).map(
                      entry => <MenuItem key={entry[0]} onClick={handleClose}>{entry[1]}</MenuItem>)
              }
              </Menu>
        </div>
            </Toolbar>
        </AppBar>
    )
}

export default CityList;
