import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';
import crypto from 'crypto';

import * as chatbotActions from '../modules/redux/actions/ChatbotsActions';

const ChatbotRow = ({ name, slug, created, deleteChatbot, editChatbot }) => (
  <tr key={Math.random()}>
    <td><Link to={`/container/${slug}`}>{name}</Link></td>
    <td>{moment(created).format('DD/MM/YY HH:mm:ss')}</td>
    <td>
      <RaisedButton
        label={<Link to={`/container/${slug}/test`}>Test</Link>}
        icon={<i className="material-icons">speaker_notes</i>}
        className="raised-button"
      />
      <RaisedButton
        label="Edit"
        className="raised-button"
        icon={<i className="material-icons">edit</i>}
        onClick={(e) => {
          e.preventDefault();
          editChatbot(slug, { edit: { name: 'EditedBot', description: 'This has been edited!' } });
        }}
      />
      <RaisedButton
        label="Delete"
        className="raised-button"
        icon={<i className="material-icons" style={{color: "white"}}>delete</i>}
        secondary
        onClick={(e) => {
          e.preventDefault();
          deleteChatbot(slug);
        }}
      />
    </td>
  </tr>
);

ChatbotRow.propTypes = {
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  created: PropTypes.number.isRequired,
  deleteChatbot: PropTypes.func.isRequired,
  editChatbot: PropTypes.func.isRequired,
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
    this.props.dispatch(chatbotActions.addChatbot('Fakebot', crypto.randomBytes(8).toString('hex'), 'This was created automatically'));
  }
  deleteChatbot (slug) {
    this.props.dispatch(chatbotActions.deleteChatbot(slug));
  }
  editChatbot (slug, edit) {
    this.props.dispatch(chatbotActions.editChatbot(slug, edit));
  }
  mapRows () {
    return this.props.chatbots.chatbots.sort((a, b) => (
      moment(a.created).diff(b.created) < 0 ? 1 : -1
    ))
    .map(row => (
      <ChatbotRow
        name={row.name}
        slug={row.slug}
        created={row.created}
        key={row.slug}
        deleteChatbot={slug => this.deleteChatbot(slug)}
        editChatbot={(slug, edit) => this.editChatbot(slug, edit)}
      />
    ));
  }
  render () {
    return (
      <div style={{ position: 'relative' }}>
        <div className="page-actions">
          <RaisedButton
            onClick={this.addChatbot}
            label="Add chatbot"
            className="raised-button"
            primary
          />
        </div>
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
      created: PropTypes.number.isRequired,
    })),
  }),
};

const ChatbotsContainer = connect(store => ({ chatbots: store.chatbots }))(Chatbots);

export default ChatbotsContainer;
