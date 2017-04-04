import React, { PropTypes } from 'react';
import moment from 'moment';

class ChatbotPage extends React.Component {
  constructor () {
    super();
    this.state = {
      currentChatbot: null,
    };
  }
  componentWillMount () {
    const currentChatbot = window.chatbots.filter((chatbot) => (
      chatbot.slug === this.props.params.slug
    ));
    this.setState({ currentChatbot: currentChatbot[0] });
  }
  render () {
    return (
      <div>
        <h1>{this.state.currentChatbot.name}</h1>
        <div className='created'>
          Created {moment(this.state.currentChatbot.created).format('MMMM Do YYYY HH:mm')}
        </div>
        <div className='description'>
          <p>{this.state.currentChatbot.description}</p>
        </div>
      </div>
    );
  }
};

ChatbotPage.propTypes = {
  params: PropTypes.object.isRequired,
};

export default ChatbotPage;
