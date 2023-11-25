const { login } = require("../controllers/auth.controller");
const {
  createAReflect,
  deleteAReflect,
  listAllPublicAnonymousReflects,
} = require("../controllers/reflect.controller");
const {
  createAUser,
  getUserDetails,
} = require("../controllers/user.controller");

const resolvers = {
  Query: {
    greeting: () => "Hello world",
    allPublicReflects: listAllPublicAnonymousReflects,
    getUserDetails,
    login,
  },
  Mutation: {
    createAReflect,
    deleteAReflect,
    createAUser,
  },

  Reflect: {
    isAnonymous(reflect) {
      return reflect.isAnonymous ?? true;
    },
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
