export const actionTypes = {
  SWITCH_DEMO_PANEL: "SWITCH_DEMO_PANEL",
  SWITCH_DEMO_PANEL_SUCCESS: "SWITCH_DEMO_PANEL_SUCCESS",
  TOGGLE_DRAWER_MENU: "TOGGLE_DRAWER_MENU",
  TOGGLE_DRAWER_MENU_SUCCESS: "TOGGLE_DRAWER_MENU_SUCCESS",
};

export function switchDemoPanel(payload) {
  return { type: actionTypes.SWITCH_DEMO_PANEL, payload };
}

export function switchDemoPanelSuccess(payload) {
  return { type: actionTypes.SWITCH_DEMO_PANEL_SUCCESS, payload };
}

export function toggleDrawerMenu(payload) {
  return { type: actionTypes.TOGGLE_DRAWER_MENU, payload };
}

export function toggleDrawerMenuSuccess(payload) {
  return { type: actionTypes.TOGGLE_DRAWER_MENU_SUCCESS, payload };
}
