import React, { PropTypes } from 'react';
import moment from 'moment';

class ChatbotPage extends React.Component {
  constructor () {
    super();
    this.state = {
      current: null,
    };
  }
  componentWillMount () {
    const current = window.chatbots.filter(chatbot => chatbot.slug === this.props.params.slug);
    this.setState({ current: current[0] });
  }
  render () {
    return (
      <div>
        <h1>{this.state.current.name}</h1>
        <div className="created">
          Created {moment(this.state.current.created).format('MMMM Do YYYY HH:mm')}
        </div>
        <div className="description">
          <p>{this.state.current.description}</p>
        </div>
      </div>
    );
  }
}

ChatbotPage.propTypes = {
  params: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default ChatbotPage;
