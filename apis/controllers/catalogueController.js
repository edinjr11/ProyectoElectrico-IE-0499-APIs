const Stores = require("../models/storeModel");
const Products = require("../models/productModel");
const RelationUsersStores = require("../models/relationStoreUserModel");
const Users = require("../models/userModel");

const catalogueController = {
  addStore: async (req, res) => {
    try {
      // get variables from body request
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ message: "Store name is missing" });
      }

      // check if store already exists
      const storeLookup = await Stores.findOne({ name });
      if (storeLookup) {
        return res
          .status(400)
          .json({ message: "This store already exists on the db" });
      }

      // create a new store and save it
      const newStore = new Stores({
        name,
      });
      await newStore.save();
      res.json({ message: "New store added" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  getStores: async (req, res) => {
    try {
      // extracting all the stores documents
      const storesLookup = await Stores.find({}).select("_id, name");
      const storesList = {
        data: storesLookup,
      };
      res.json(storesList);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  getUsers: async (req, res) => {
    try {
      // extracting all the no admin users documents
      const usersLookup = await Users.find({ role: 0 }).select("_id, name");
      const usersList = {
        data: usersLookup,
      };
      res.json(usersList);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  getStoresUser: async (req, res) => {
    try {
      // get variables from body request
      const userId = req.user.id;

      // checking if user has had register stores
      const relationUserStoreLookup = await RelationUsersStores.find({
        userId,
      });
      if (relationUserStoreLookup.length == 0) {
        res.status(400).json({ message: "User does not register any store" });
      }

      // gathering stores Ids in a array
      const storesIds = [];
      relationUserStoreLookup.forEach((rel) => {
        storesIds.push(rel.storeId);
      });

      // looking for current user's stores
      const storesLookup = await Stores.find({
        _id: { $in: storesIds },
      }).select("_id, name, location, phone");
      const storesList = {
        data: storesLookup,
      };
      res.json(storesList);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  addStoreToUser: async (req, res) => {
    try {
      // get variables from body request
      const { storeId, userId } = req.body;

      // check if user exists
      const checkUser = await Users.findOne({ _id: userId });
      if (!checkUser) {
        return res.status(400).json({ message: "User does not exists" });
      }

      // check if store exists
      const checkStore = await Stores.findOne({ _id: storeId });
      if (!checkStore) {
        return res.status(400).json({ message: "Store does not exists" });
      }

      // check if user already has the store assigned
      const relationUserStoreLookup = await RelationUsersStores.find({
        userId,
      });
      relationUserStoreLookup.forEach((rel) => {
        if (rel.storeId == storeId) {
          return res
            .status(400)
            .json({ message: "Store already assigned to user" });
        }
      });

      // create and save the new user-store relation
      const newRelationUsersStores = new RelationUsersStores({
        userId,
        storeId,
      });
      await newRelationUsersStores.save();
      res.json({ message: "Store added to user" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  updateStoreInfo: async (req, res) => {
    try {
      // get variables from body request
      const {
        storeId,
        category,
        name,
        location,
        phone,
        email,
        hours,
        delivery,
      } = req.body;

      const updatedInfo = {
        category: category,
        name: name,
        location: location,
        phone: phone,
        email: email,
        hours: hours,
        delivery: delivery,
      };

      checkStores = await Stores.findOneAndUpdate(
        { _id: storeId },
        updatedInfo
      );
      if (!checkStores) {
        return res.status(400).json({ message: "Store does not exists" });
      }

      res.json({ message: "Store data updated" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  addProduct: async (req, res) => {
    try {
      // get variables from body request
      const { storeId, category, name, description, price } = req.body;
      if (!storeId || !category || !name || !description || !price) {
        return res
          .status(400)
          .json({ message: "Some required information is missing" });
      }

      // create a new product and save it
      const newProduct = new Products({
        storeId,
        category,
        name,
        description,
        price,
      });
      await newStore.save();
      res.json({ message: "New product added" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  getStoreProducts: async (req, res) => {
    try {
      // get variables from body request
      const { storeId } = req.body;

      // looking for this store's products
      const productsLookup = await Products.find({
        storeId: storeId,
      });
      if (productsLookup.length == 0) {
        res.status(400).json({ message: "Store does not register products" });
      }

      const productsList = {
        data: productsLookup,
      };
      res.json(productsList);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      // get variables from body request
      const { productId, storeId, category, name, description, price } =
        req.body;

      const updatedInfo = {
        storeId: storeId,
        category: category,
        name: name,
        description: description,
        price: price,
      };

      checkProducts = await Products.findOneAndUpdate(
        { _id: productId },
        updatedInfo
      );
      if (!checkStores) {
        return res.status(400).json({ message: "Product does not exists" });
      }

      res.json({ message: "Product data updated" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

module.exports = catalogueController;
