import React from "react";
import { Fab } from "@material-ui/core";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import CloseIcon from "@material-ui/icons/Close";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";

// component
import Card from "shared/components/elevation-card";

const NotificationBar = ({ notificationBar, setNotificationBar }) => {
  const muiBaseTheme = createMuiTheme();

  return (
    <div className="notification-bar" style={{ display: "none" }}>
      {notificationBar && (
        <MuiThemeProvider
          theme={createMuiTheme({
            typography: {
              useNextVariants: true,
            },
            overrides: Card.getTheme(muiBaseTheme),
          })}
        >
          <Card />
        </MuiThemeProvider>
      )}
      <Fab color="primary" area-label="chat">
        {notificationBar ? (
          <>
            <CloseIcon
              onClick={() => {
                setNotificationBar(false);
              }}
            />
          </>
        ) : (
          <ChatBubbleIcon
            onClick={() => {
              setNotificationBar(true);
            }}
          />
        )}
      </Fab>
    </div>
  );
};
NotificationBar.propTypes = {
  notificationBar: PropTypes.bool,
  setNotificationBar: PropTypes.func,
};
export default NotificationBar;
