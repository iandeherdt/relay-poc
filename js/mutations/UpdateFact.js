import Relay from 'react-relay';

export default class UpdateFact extends Relay.Mutation {
  static fragments = {
    fact: () => Relay.QL`
      fragment on Fact {
        id
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{updateFact}`;
  }
  getCollisionKey() {
    return `check_${this.props.fact.id}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on UpdateFactPayload @relay(pattern: true) {
        fact {
          id,
        },
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        fact: this.props.fact.id,
      },
    }];
  }
}