import { join } from 'path';

import { GraphQLDefinitionsFactory } from '@nestjs/graphql';


const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./src/**/*.gql'],
  path: join(process.cwd(), 'src/graphql.ts'),
});
