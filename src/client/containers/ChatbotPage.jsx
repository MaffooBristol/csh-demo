import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import moment from 'moment';

import { fetchChatbots } from '../modules/redux/actions/ChatbotsActions';

class ChatbotPage extends React.Component {
  componentWillMount () {
    if (!this.props.chatbots.fetched && !this.props.chatbots.fetching) {
      this.props.dispatch(fetchChatbots());
    }
  }
  render () {
    if (!this.props.chatbots.fetched) {
      return null;
    }
    const chatbots = [...this.props.chatbots.chatbots];
    const [current] = chatbots.filter(chatbot => (
      chatbot.slug === this.props.params.slug
    ));
    if (!current) {
      browserHistory.replace('/');
      return null;
    }
    return (
      <div>
        <Helmet>
          <title>{current.name}</title>
        </Helmet>
        <h1>{current.name}</h1>
        <div className="created">
          Created {moment(current.created).format('MMMM Do YYYY HH:mm')}
        </div>
        <div className="description">
          <p>{current.description}</p>
        </div>
        <div className="actions">
          <Link to={`/container/${current.slug}/test`}>Test</Link>
        </div>
      </div>
    );
  }
}

ChatbotPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.objectOf(PropTypes.string),
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

const ChatbotPageContainer = connect(store => ({ chatbots: store.chatbots }))(ChatbotPage);

export default ChatbotPageContainer;
