import { Kind, GraphQLScalarType, ValueNode, GraphQLError } from "graphql";

const MONGODB_OBJECTID_REGEX = /*#__PURE__*/ /^[A-Fa-f0-9]{24}$/;

export const GraphQLObjectId: GraphQLScalarType =
  /*#__PURE__*/ new GraphQLScalarType({
    name: "ObjectId",

    description:
      "A field whose value conforms with the standard mongodb object ID as described here: https://docs.mongodb.com/manual/reference/method/ObjectId/#ObjectId. Example: 5e5677d71bdc2ae76344968c",

    serialize(value) {
      if (!MONGODB_OBJECTID_REGEX.test(value as string)) {
        throw new GraphQLError(
          `Value is not a valid mongodb object id of form: ${value}`
        );
      }

      return value;
    },

    parseValue(value) {
      if (!MONGODB_OBJECTID_REGEX.test(value as string)) {
        throw new GraphQLError(
          `Value is not a valid mongodb object id of form: ${value}`
        );
      }

      return value;
    },

    parseLiteral(ast: ValueNode) {
      if (ast.kind !== Kind.STRING) {
        throw new GraphQLError(
          `Can only validate strings as mongodb object id but got a: ${ast.kind}`,
          {
            nodes: [ast],
          }
        );
      }

      if (!MONGODB_OBJECTID_REGEX.test(ast.value)) {
        throw new GraphQLError(
          `Value is not a valid mongodb object id of form: ${ast.value}`,
          { nodes: ast }
        );
      }

      return ast.value;
    },
    extensions: {
      codegenScalarType: "string",
      jsonSchema: {
        title: "ObjectId",
        type: "string",
        pattern: MONGODB_OBJECTID_REGEX.source,
      },
    },
  });
