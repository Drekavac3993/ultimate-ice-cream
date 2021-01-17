import axios from "axios";

const baseUrl = "/api/menu";

const getMenu = async () => {
  const { data } = await axios.get(baseUrl);
  const sortData = data.menuData.sort((a, b) => {
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

export { getMenu };
