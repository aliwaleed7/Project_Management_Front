// menuUtils.js
export const getMenuOptions = (entityType, actions) => {
  switch (entityType) {
    case "space":
      return [
        { label: "Create Folder", action: actions.createFolder },
        { label: "Create Project", action: actions.createProject },
        { label: "Rename", action: actions.rename },
        { label: "Delete", action: actions.delete },
      ];
    case "folder":
      return [
        { label: "Create Project", action: actions.createProject },
        { label: "Rename", action: actions.rename },
        { label: "Delete", action: actions.delete },
      ];
    case "project":
      return [
        { label: "Rename", action: actions.rename },
        { label: "Delete", action: actions.delete },
      ];
    default:
      return [];
  }
};
