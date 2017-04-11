const Chatbots = (state = { chatbots: [] }, action) => {
  switch (action.type) {
    case 'ADD_CHATBOT':
      return {
        ...state,
        chatbots: [...state.chatbots, action.data],
      };
    case 'FETCH_CHATBOTS_FULFILLED':
      return { ...state, chatbots: action.data };
    default:
      return state;
  }
};

export default Chatbots;
