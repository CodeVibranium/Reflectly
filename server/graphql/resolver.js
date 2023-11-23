const {
  createAReflect,
  deleteAReflect,
} = require("../controllers/reflect.controller");

const resolvers = {
  Query: {
    greeting: () => "Hello world",
  },
  Mutation: {
    createAReflect,
    deleteAReflect,
  },

  // Scalar types
  // DateTimeType: {
  //   serialize(value) {
  //     console.log("value", value);
  //     return new Date(value);
  //   },
  // },
};

module.exports = resolvers;
