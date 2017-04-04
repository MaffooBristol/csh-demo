import React, { PropTypes } from 'react';

import { Link } from 'react-router';

class ChatbotRow extends React.Component {
  render () {
    return (
      <tr key={Math.random()}>
        <td><Link to={`/container/${this.props.slug}`}>{this.props.name}</Link></td>
        <td>{this.props.created}</td>
      </tr>
    );
  }
}

ChatbotRow.propTypes = {
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
};

const ChatbotTable = ({ rows }) => (
  <table>
    <thead>
      <th>Name</th>
      <th>Created</th>
    </thead>
    <tbody>
      {rows}
    </tbody>
  </table>
);

ChatbotTable.propTypes = {
  rows: PropTypes.element.isRequired,
};

class Chatbots extends React.Component {
  componentWillMount () {
    const rows = [
      {
        name: 'HarryBot',
        slug: 'harrybot',
        created: 'Today',
      },
      {
        name: 'MaffBot',
        slug: 'maffbot',
        created: 'Yesterday',
      },
    ];
    this.rows = rows.map(row => (
      <ChatbotRow
        name={row.name}
        slug={row.slug}
        created={row.created}
      />
    ));
  }
  render () {
    return (
      <div>
        <ChatbotTable rows={this.rows} />
      </div>
    );
  }
}

export default Chatbots;
