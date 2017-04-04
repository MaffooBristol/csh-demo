import React, { PropTypes } from 'react';

import { Link } from 'react-router';
import moment from 'moment';

class ChatbotRow extends React.Component {
  render () {
    return (
      <tr key={Math.random()}>
        <td><Link to={`/container/${this.props.slug}`}>{this.props.name}</Link></td>
        <td>{moment(this.props.created).fromNow()}</td>
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
      <tr>
        <th>Name</th>
        <th>Created</th>
      </tr>
    </thead>
    <tbody>
      {rows}
    </tbody>
  </table>
);

ChatbotTable.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
};

class Chatbots extends React.Component {
  componentWillMount () {
    this.rows = window.chatbots.sort((a, b) => {
      return moment(a.created).unix() < moment(b.created).unix();
    })
    .map(row => (
      <ChatbotRow
        name={row.name}
        slug={row.slug}
        created={row.created}
        key={row.slug}
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
