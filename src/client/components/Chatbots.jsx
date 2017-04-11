import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';

import * as chatbotActions from '../modules/redux/actions/ChatbotsActions';

const ChatbotRow = ({ name, slug, created, deleteChatbot }) => (
  <tr key={Math.random()}>
    <td><Link to={`/container/${slug}`}>{name}</Link></td>
    <td>{moment(created).fromNow()}</td>
    <td>
      <Link to={`/container/${slug}/test`}>Test</Link>
      <button
        onClick={(e) => {
          e.preventDefault();
          deleteChatbot(slug);
        }}
      >Delete</button>
    </td>
  </tr>
);

ChatbotRow.propTypes = {
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  deleteChatbot: PropTypes.func.isRequired,
};

const ChatbotTable = ({ rows }) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Created</th>
        <th>Actions</th>
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
    if (!this.props.chatbots.fetched && !this.props.chatbots.fetching) {
      this.props.dispatch(chatbotActions.fetchChatbots());
    }
    this.addChatbot = this.addChatbot.bind(this);
  }
  addChatbot () {
    this.props.dispatch(chatbotActions.addChatbot('Fakebot', 'fakebot', 'This was created automatically'));
  }
  deleteChatbot (slug) {
    this.props.dispatch(chatbotActions.deleteChatbot(slug));
  }
  mapRows () {
    return this.props.chatbots.chatbots.sort((a, b) => (
      moment(a.created).unix() < moment(b.created).unix()
    ))
    .map(row => (
      <ChatbotRow
        name={row.name}
        slug={row.slug}
        created={row.created}
        key={row.slug}
        deleteChatbot={slug => this.deleteChatbot(slug)}
      />
    ));
  }
  render () {
    return (
      <div>
        <button onClick={this.addChatbot}>Add chatbot</button>
        <ChatbotTable rows={this.mapRows()} />
      </div>
    );
  }
}

Chatbots.propTypes = {
  dispatch: PropTypes.func.isRequired,
  chatbots: PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    chatbots: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      created: PropTypes.string.isRequired,
    })),
  }),
};

const ChatbotsContainer = connect(store => ({ chatbots: store.chatbots }))(Chatbots);

export default ChatbotsContainer;
