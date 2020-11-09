const Category = require("../models/Category");
module.exports = {
  getCategories: async (request, response) => {
    const cats = await Category.find();
    let categories = [];

    for (let i in cats) {
      categories.push({
        ...cats[i]._doc,
        img: `${process.env.BASE}/assets/images/${cats[i].slug}.png`,
      });
    }
    response.json({ categories });
  },
  addAction: async (request, response) => {},
  getList: async (request, response) => {},
  getItem: async (request, response) => {},
  editAction: async (request, response) => {},
};
