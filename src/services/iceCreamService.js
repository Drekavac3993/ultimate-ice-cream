import axios from "axios";

const getMenu = async () => {
  const { data } = await axios.get("/api/menu");
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
