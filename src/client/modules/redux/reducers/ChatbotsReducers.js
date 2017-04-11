const Chatbots = (state = {
  fetching: false,
  fetched: false,
  chatbots: [],
}, action) => {
  switch (action.type) {
    case 'ADD_CHATBOT': {
      return { ...state, chatbots: [...state.chatbots, action.data] };
    }
    case 'FETCH_CHATBOTS_START': {
      return { ...state, fetching: true };
    }
    case 'FETCH_CHATBOTS_FULFILLED': {
      return { ...state, fetching: false, fetched: true, chatbots: action.data };
    }
    case 'DELETE_CHATBOT': {
      return { ...state, chatbots: state.chatbots.filter(chatbot => chatbot.slug !== action.slug) };
    }
    default: {
      return state;
    }
  }
};

export default Chatbots;
