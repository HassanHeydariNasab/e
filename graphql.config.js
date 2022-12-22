module.exports = {
  projects: {
    app: {
      schema: ["./src/__generated__/graphql.schema.json"],
      extensions: {
        endpoints: {
          default: {
            url: "http://localhost:3000/api/graphql",
          },
        },
      },
    },
  },
};
