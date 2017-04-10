import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Helmet } from 'react-helmet';
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
        <Helmet>
          <title>{this.state.current.name}</title>
        </Helmet>
        <h1>{this.state.current.name}</h1>
        <div className="created">
          Created {moment(this.state.current.created).format('MMMM Do YYYY HH:mm')}
        </div>
        <div className="description">
          <p>{this.state.current.description}</p>
        </div>
        <div className="actions">
          <Link to={`/container/${this.state.current.slug}/test`}>Test</Link>
        </div>
      </div>
    );
  }
}

ChatbotPage.propTypes = {
  params: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default ChatbotPage;
