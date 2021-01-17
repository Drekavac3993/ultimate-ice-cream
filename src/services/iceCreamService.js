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

const getMenuItem = async (id) => {
  const { data } = await axios.get(`${baseUrl}/${id}`);
  return data;
};

export { getMenu, getMenuItem };
