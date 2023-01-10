import { Kind, GraphQLScalarType, ValueNode, GraphQLError } from "graphql";
import { ObjectId } from "mongodb";

const MONGODB_OBJECTID_REGEX = /*#__PURE__*/ /^[A-Fa-f0-9]{24}$/;

export const GraphQLObjectId: GraphQLScalarType =
  /*#__PURE__*/ new GraphQLScalarType({
    name: "ObjectId",

    description:
      "A field whose value conforms with the standard mongodb object ID as described here: https://docs.mongodb.com/manual/reference/method/ObjectId/#ObjectId. Example: 5e5677d71bdc2ae76344968c",

    serialize(value) {
      if (!(value instanceof ObjectId)) {
        throw new GraphQLError(
          `Value is not a valid mongodb ObjectId. type:${typeof value} value:${value}`
        );
      }

      return value.toHexString();
    },

    parseValue(value) {
      if (!MONGODB_OBJECTID_REGEX.test(value as string)) {
        throw new GraphQLError(
          `Couldn't construct a mongodb ObjectId. type:${typeof value} value:${value}`
        );
      }

      return new ObjectId(value as string);
    },

    parseLiteral(ast: ValueNode) {
      if (ast.kind !== Kind.STRING) {
        throw new GraphQLError(
          `Couldn't construct a mongodb ObjectId. type:${ast.kind}`,
          {
            nodes: [ast],
          }
        );
      }

      if (!MONGODB_OBJECTID_REGEX.test(ast.value)) {
        throw new GraphQLError(
          `Couldn't construct a mongodb ObjectId. type:${ast.kind} value: ${ast.value}`,
          { nodes: ast }
        );
      }

      return new ObjectId(ast.value);
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
