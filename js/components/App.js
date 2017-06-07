import React from 'react';
import Relay from 'react-relay';
import UpdateFact from '../mutations/UpdateFact';
class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Fact list</h1>
        <ul>
          {  this.props.facts.map(fact =>
            <li key={fact.id}>{fact.articleType}</li>
          )}
        </ul>
        <h1>Element list</h1>
        <ul>
          {  this.props.elements.map(element =>
            <li key={element.id}>{element.number}</li>
          )}
        </ul>
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    facts: () => Relay.QL`
      fragment on Fact @relay(plural: true) {
        id,
        articleType
      }
    `,
    elements: () => Relay.QL`
      fragment on Element @relay(plural: true) {
        id,
        number,
        facts(first: 10) {
          edges {
            node {
              id,
              articleType
            }
          }
        }
      }
    `,
  },
});
