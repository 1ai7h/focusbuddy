import { useState } from "react";
import { 
  AppBar, 
  Box, 
  Button, 
  IconButton, 
  Link, 
  ListItemText, 
  Menu, 
  MenuItem, 
  Tooltip 
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { SignedIn, SignedOut, SignOutButton, useClerk } from "@clerk/nextjs";

export default function Dropdown() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right', marginRight: '100px' }}>
        <Tooltip title="Menu">
          <IconButton
            onClick={handleClick}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            aria-controls={open ? 'hamburger-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>
        <Menu
          id="hamburger-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'menu-button',
          }}
        >
          <MenuItem onClick={handleClose}>
            <Link href="/homepage">
              <ListItemText primary="Home" />
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link href="/feelingsAI">
              <ListItemText primary="Zenith Companion" />
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <SignOutButton>
              <ListItemText primary="Sign Out" />
            </SignOutButton>
          </MenuItem>
        </Menu>
      </Box>
    </div>
  );
}