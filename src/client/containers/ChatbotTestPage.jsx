import React, { PropTypes } from 'react';

class ChatbotTestPage extends React.Component {
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
        <h1>Test {this.state.current.name}</h1>
        <table className="chat-message">
          <tbody>
            <tr>
              <td className="chat-name">{this.state.current.name}</td>
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
              <td className="chat-name">{this.state.current.name}</td>
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
  params: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default ChatbotTestPage;
