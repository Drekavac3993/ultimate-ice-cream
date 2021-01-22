import axios from "axios";

const baseUrl = "/api/menu";

const getMenu = async () => {
  const { data } = await axios.get(baseUrl);
  const sortData = data.sort((a, b) => {
    if (a.iceCream.name < b.iceCream.name) {
      return -1;
    }
    if (a.iceCream.name > b.iceCream.name) {
      return 1;
    }
    return 0;
  });

  return sortData;
};

const getMenuItem = async (menuItemId) => {
  const { data } = await axios.get(`${baseUrl}/${menuItemId}`);
  return data;
};

const editMenuItem = async (menuItem) => {
  const { data } = await axios.put(
    `${baseUrl}/${menuItem.id.toString()}`,
    menuItem
  );
  return data;
};

const deleteMenuItem = async (menuItemId) => {
  const { data } = await axios.delete(`${baseUrl}/${menuItemId}`);
  return data;
};

export { getMenu, getMenuItem, editMenuItem, deleteMenuItem };
