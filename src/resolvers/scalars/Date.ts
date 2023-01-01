import { Kind, GraphQLScalarType, ValueNode, GraphQLError } from "graphql";

export const GraphQLDate: GraphQLScalarType =
  /*#__PURE__*/ new GraphQLScalarType({
    name: "Date",

    description: "Date field",

    serialize(value) {
      if (Number.isInteger(value as number)) return value;
      throw new GraphQLError(
        `Value is not a valid date object of form: ${value}`
      );
    },

    parseValue(value) {
      if (Number.isInteger(value as number)) return value;
      throw new GraphQLError(
        `Value is not a valid date object of form: ${value}`
      );
    },

    parseLiteral(ast: ValueNode) {
      if (ast.kind !== Kind.INT) {
        throw new GraphQLError(
          `Can only validate numbers as date object but got a: ${ast.kind}`,
          {
            nodes: [ast],
          }
        );
      }

      if (Number.isInteger(ast.value)) return ast.value;
      throw new GraphQLError(
        `Value is not a valid date object of form: ${ast.value}`,
        { nodes: ast }
      );
    },
    extensions: {
      codegenScalarType: "number",
      jsonSchema: {
        title: "Date",
        type: "number",
      },
    },
  });
