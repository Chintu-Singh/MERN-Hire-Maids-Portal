import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AssignmentIcon from "@material-ui/icons/Assignment";
import WorkIcon from "@material-ui/icons/Work";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import GroupRoundedIcon from "@material-ui/icons/GroupRounded";
import EditIcon from "@material-ui/icons/Edit";

export const applicantListItems = (handlePage) => {
  return (
    <div>
      <ListItem value="My Profile" onClick={handlePage} button>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="My Profile" />
      </ListItem>
      <ListItem value="Search work" onClick={handlePage} button>
        <ListItemIcon>
          <SearchIcon />
        </ListItemIcon>
        <ListItemText primary="Search work" />
      </ListItem>
      <ListItem value="My Applied works" onClick={handlePage} button>
        <ListItemIcon>
          <WorkIcon />
        </ListItemIcon>
        <ListItemText primary="My Applied works" />
      </ListItem>
      <ListItem value="Edit Profile" onClick={handlePage} button>
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        <ListItemText primary="Edit Profile" />
      </ListItem>
    </div>
  );
};

export const recruitListItems = (handlePage) => {
  return (
    <div>
      <ListItem value="My Profile" onClick={handlePage} button>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="My Profile" />
      </ListItem>
      <ListItem value="Create work" onClick={handlePage} button>
        <ListItemIcon>
          <WorkIcon />
        </ListItemIcon>
        <ListItemText primary="Create work" />
      </ListItem>
      <ListItem value="My Listings" onClick={handlePage} button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="My Listings" />
      </ListItem>
      <ListItem value="Edit Profile" onClick={handlePage} button>
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        <ListItemText primary="Edit Profile" />
      </ListItem>
      <ListItem value="My Maids" onClick={handlePage} button>
        <ListItemIcon>
          <GroupRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="My Maids" />
      </ListItem>
    </div>
  );
};
