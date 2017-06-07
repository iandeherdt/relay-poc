
import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

import {
  // Import methods that your schema can use to interact with your database
  Person,
  Element,
  Fact,
  getFact,
  getFacts,
  getElements,
  getElement,
  updateFactType
} from './database';

const {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    const {type, id} = fromGlobalId(globalId);
    if (type === 'Element') {
      return getElement(id);
    } else if (type === 'Fact') {
      return getFact(id);
    } 
    else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof Element) {
      return elementType;
    } else if (obj instanceof Fact) {
      return factType;
    } else {
      return null;
    }
  }
);

const elementType = new GraphQLObjectType({
  name: 'Element',
  description: 'The base element for a file',
  fields: () => ({
    id: globalIdField('Element'),
    number: {
      type: GraphQLString,
      description: 'The number of the fact',
    },
    facts: {
      type: factConnection,
      description: 'The facts related to the element',
      args: connectionArgs,
      resolve: (element, args) => connectionFromArray(
        element.facts.map((id) => getFact(id)),
        args
      ),
    },
  }),
  interfaces: [nodeInterface],
});

const factType = new GraphQLObjectType({
  name:'Fact',
  description: 'An infraction',
  fields: () => ({
    id: globalIdField('Fact'),
    articleType: {
      type: GraphQLString,
      description: 'The article type of the infraction',
    }
  }),
  interfaces: [nodeInterface],
});

const {connectionType: factConnection} = connectionDefinitions({name: 'Fact', nodeType: factType});

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    facts: {
      type: new GraphQLList(factType),
      args: {
        ids: {
           type: new GraphQLList(GraphQLInt),
        },
      },
      resolve: (root, {ids}) => getFacts(ids),
    },
    elements: {
      type: new GraphQLList(elementType),
      args: {
        ids: {
           type: new GraphQLList(GraphQLInt),
        },
      },
      resolve: (root, {ids}) => getElements(ids),
    },
  }),
});

const UpdateFact = mutationWithClientMutationId({
  name: 'UpdateFact',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    fact: {
      type: new GraphQLList(factType),
      args: {
        ids: {
           type: new GraphQLList(GraphQLInt),
        },
      },
      resolve: (root, {ids}) => getFacts(ids),
    },
  },
  mutateAndGetPayload: ({id}) => {
    const factId = fromGlobalId(id).id;
    updateFactType(factId);
    return {factId};
  },
});

/**
 * This is the type that will be the root of our mutations,
 * and the entry point into performing writes in our schema.
 */
var mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    updateFact: UpdateFact,
  })
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export var Schema = new GraphQLSchema({
  query: queryType,
  // Uncomment the following after adding some mutation fields:
  mutation: mutationType
});
