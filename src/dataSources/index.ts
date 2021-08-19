import UserDatasources from "./user.datasource";

interface IGraphQLDataSources {
  //MongoDataSources

  users: UserDatasources;
}

export { IGraphQLDataSources };

export function createDataSourceInstances() {
  return {
    users: new UserDatasources(),
  };
}
