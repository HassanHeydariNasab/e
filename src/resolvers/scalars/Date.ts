import { Kind, GraphQLScalarType, ValueNode, GraphQLError } from "graphql";

export const GraphQLDate: GraphQLScalarType =
  /*#__PURE__*/ new GraphQLScalarType({
    name: "Date",

    description: "Date field",

    serialize(value) {
      if (value instanceof Date) return value.toISOString();
      throw new GraphQLError(
        `Value is not a valid Date object. type:"${typeof value}" value:${value} `
      );
    },

    parseValue(value) {
      if (typeof value === "string") return new Date(value);
      throw new GraphQLError(
        `Value is not a valid Date.ISOString string. type:"${typeof value}" value:${value} `
      );
    },

    parseLiteral(ast: ValueNode) {
      if (ast.kind !== Kind.STRING) {
        throw new GraphQLError(
          `Value is not a valid Date.ISOString string. ast.kind:"${ast.kind}"`,
          {
            nodes: [ast],
          }
        );
      }

      if (typeof ast.value === "string") return new Date(ast.value);
      throw new GraphQLError(`Value is strange!`, { nodes: ast });
    },
    extensions: {
      codegenScalarType: "string",
      jsonSchema: {
        title: "Date",
        type: "string",
      },
    },
  });
