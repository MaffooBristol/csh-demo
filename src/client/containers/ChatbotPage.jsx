import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { fetchChatbots } from '../modules/redux/actions';
import moment from 'moment';

class ChatbotPage extends React.Component {
  componentWillMount () {
    this.props.dispatch(fetchChatbots());
  }
  render () {
    const [current] = this.props.chatbots.chatbots.filter(chatbot => chatbot.slug === this.props.params.slug);
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
  params: PropTypes.objectOf(PropTypes.string).isRequired,
};

const ChatbotPageContainer = connect(store => ({ chatbots: store.chatbots }))(ChatbotPage);

export default ChatbotPageContainer;
