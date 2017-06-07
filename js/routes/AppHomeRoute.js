import Relay from 'react-relay';

export default class extends Relay.Route {
  static queries = {
    facts: () => Relay.QL`query { facts(ids: $factIds) }`,
    elements: () => Relay.QL`query { elements(ids: $elementIds) }`,
  };
  static routeName = 'AppHomeRoute';
}
