import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import { fetchChatbots } from '../modules/redux/actions/ChatbotsActions';

class ChatbotTestPage extends React.Component {
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
        <h1>Test {current.name}</h1>
        <table className="chat-message">
          <tbody>
            <tr>
              <td className="chat-name">{current.name}</td>
              <td className="chat-message">
                Hello, beep beep! I do nothing!
              </td>
            </tr>
            <tr>
              <td className="chat-name">You</td>
              <td className="chat-message">
                I know, you say the same thing as all the other chatbots
              </td>
            </tr>
            <tr>
              <td className="chat-name">{current.name}</td>
              <td className="chat-message">
                Yes, but surely I am the best?
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

ChatbotTestPage.propTypes = {
  dispatch: PropTypes.func,
  params: PropTypes.objectOf(PropTypes.string),
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

const ChatbotTestPageContainer = connect(store => ({ chatbots: store.chatbots }))(ChatbotTestPage);

export default ChatbotTestPageContainer;
