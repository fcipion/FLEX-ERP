import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { alpha, styled } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import * as React from "react";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function MenuPanel({
  children,
  buttonPoints,
  items,
  handleClick: _handleClick,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div onClick={handleClick} style={{ cursor: "pointer" }}>
          {buttonPoints && <MoreVertIcon />}
          {children && children}
        </div>
      </div>
      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {items.map((item, i) => (
          <MenuItem
            key={i}
            onClick={() => {
              _handleClick(item.key);
              handleClose();
            }}
            disableRipple
          >
            {item.icon?.Component && <item.icon.Component />}

            {item.icon?.FontAwesome && (
              <FontAwesomeIcon
                icon={item.icon.FontAwesome}
                style={{ paddingRight: 10 }}
              />
            )}

            {item.title}
          </MenuItem>
        ))}
      </StyledMenu>
    </div>
  );
}
