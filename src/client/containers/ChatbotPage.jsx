import React, { PropTypes } from 'react';

const ChatbotPage = ({ params }) => (
  <div>
    <h1>{params.chatbotSlug}</h1>
  </div>
);

ChatbotPage.propTypes = {
  params: PropTypes.arrayOf(PropTypes.string),
};

export default ChatbotPage;
