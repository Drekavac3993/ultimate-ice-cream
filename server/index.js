const express = require("express");
const bodyParser = require("body-parser");
const iceCreams = require("./data/iceCreams");
let menuData = require("./data/menuData");

const app = express();
app.use(bodyParser.json());
const port = 5000;

const getAvailableStock = () =>
  iceCreams.filter(
    (iceCream) =>
      menuData.find((menuItem) => menuItem.iceCream.id === iceCream.id) ===
      undefined
  );

app.get("/api/menu/stock-ice-creams", (req, res) => {
  res.send(getAvailableStock());
});

app.get("/api/menu/stock-ice-creams/:id", (req, res) => {
  const iceCream = getAvailableStock().find(
    (iceCream) => iceCream.id === parseInt(req.params.id, 10)
  );
  if (iceCream) {
    res.send(iceCream);
  } else {
    res.status(404);
    res.send({ error: "Ice cream not found" });
  }
});

app.get("/api/menu", (req, res) => {
  res.send(menuData);
});

app.post("/api/menu", (req, res) => {
  const { iceCream, ...rest } = req.body;
  const newMenuItem = {
    id: menuData.reduce((prev, cur) => (cur.id > prev ? cur.id : prev), 0) + 1,
    iceCream: {
      ...iceCreams.find((item) => item.id === parseInt(iceCream.id, 10)),
    },
    ...rest,
  };
  menuData.push(newMenuItem);

  res.send(newMenuItem);
});

app.get("/api/menu/:id", (req, res) => {
  const menuItem = menuData.find(
    (item) => item.id === parseInt(req.params.id),
    10
  );
  if (menuItem) {
    res.send(menuItem);
  } else {
    res.status(404);
    res.send("Menu item does not exist");
  }
});

app.put("/api/menu/:id", (req, res) => {
  const intId = parseInt(req.params.id, 10);
  const { iceCream, ...rest } = req.body;

  const updatedItem = {
    id: intId,
    iceCream: {
      ...iceCreams.find((item) => item.id === parseInt(iceCream.id, 10)),
    },
    ...rest,
  };
  menuData = menuData.map((menuItem) => {
    if (menuItem.id === parseInt(req.params.id, 10)) {
      return updatedItem;
    }
    return menuItem;
  });

  res.send(updatedItem);
});

app.delete("/api/menu/:id", (req, res) => {
  menuData = menuData.filter(
    (menuItem) => menuItem.id !== parseInt(req.params.id, 10)
  );
  res.status(204);
  res.send();
});

app.listen(port, () =>
  console.log(`Project ICE server listening on port ${port}!`)
);
