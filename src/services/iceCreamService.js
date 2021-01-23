import axios from "axios";

const baseMenuUrl = "/api/menu";
const baseStockUrl = `${baseMenuUrl}/stock-ice-creams`;

const getMenu = async () => {
  const { data } = await axios.get(baseMenuUrl);
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

const getIceCreams = async () => {
  const { data } = await axios.get(baseStockUrl);
  const sortData = data.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  return sortData;
};

const getIceCream = async (iceCreamId) => {
  const { data } = await axios.get(`${baseStockUrl}/${iceCreamId}`);
  return data;
};

const getMenuItem = async (menuItemId) => {
  const { data } = await axios.get(`${baseMenuUrl}/${menuItemId}`);
  return data;
};

const addMenuItem = async (menuItem) => {
  const { data } = await axios.post(baseMenuUrl, menuItem);
  return data;
};

const editMenuItem = async (menuItem) => {
  const { data } = await axios.put(
    `${baseMenuUrl}/${menuItem.id.toString()}`,
    menuItem
  );
  return data;
};

const deleteMenuItem = async (menuItemId) => {
  const { data } = await axios.delete(`${baseMenuUrl}/${menuItemId}`);
  return data;
};

export {
  getMenu,
  getMenuItem,
  addMenuItem,
  editMenuItem,
  deleteMenuItem,
  getIceCreams,
  getIceCream,
};
