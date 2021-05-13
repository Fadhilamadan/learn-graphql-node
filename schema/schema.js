const graphql = require("graphql");

const Menu = require("../models/Menu");
const Order = require("../models/Order");

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
} = graphql;

const MenuType = new GraphQLObjectType({
  name: "menu",
  fields: () => ({
    id: { type: GraphQLID },
    menu: { type: GraphQLString },
    category: { type: GraphQLString },
    order: {
      type: new GraphQLList(OrderType),
      resolve(parent, args) {
        return Order.find({ menu_id: parent.id });
      },
    },
  }),
});

const OrderType = new GraphQLObjectType({
  name: "order",
  fields: () => ({
    id: { type: GraphQLID },
    invoice: { type: GraphQLString },
    quantity: { type: GraphQLInt },
    menu: {
      type: MenuType,
      resolve(parent, args) {
        return Menu.findById({ _id: parent.menu_id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    menu: {
      type: MenuType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Menu.findById({ _id: args.id });
      },
    },
    menus: {
      type: GraphQLList(MenuType),
      resolve(parent, args) {
        return Menu.find({});
      },
    },
    order: {
      type: OrderType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Order.findById({ _id: args.id });
      },
    },
    orders: {
      type: GraphQLList(OrderType),
      resolve(parent, args) {
        return Order.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    menuStore: {
      type: MenuType,
      args: {
        menu: { type: new GraphQLNonNull(GraphQLString) },
        category: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let menu = new Menu({
          menu: args.menu,
          category: args.category,
        });

        return menu.save();
      },
    },
    orderStore: {
      type: OrderType,
      args: {
        invoice: { type: new GraphQLNonNull(GraphQLString) },
        quantity: { type: new GraphQLNonNull(GraphQLInt) },
        menu_id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let order = new Order({
          invoice: args.invoice,
          quantity: args.quantity,
          menu_id: args.menu_id,
        });

        return order.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
