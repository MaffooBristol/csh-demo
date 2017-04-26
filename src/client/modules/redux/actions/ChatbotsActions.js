import axios from 'axios';
import moment from 'moment';

export const fetchChatbots = () => (dispatch) => {
  axios.post('/api/bots/list')
  .then(({ data }) => {
    dispatch({ type: 'FETCH_CHATBOTS_FULFILLED', data: data.chatbots });
  })
  .catch(({ message }) => {
    dispatch({ type: 'FETCH_CHATBOTS_REJECTED', error: message });
  });
};

export const addChatbot = (name, slug, description) => (dispatch) => {
  axios.post('/api/bots/add', {
    data: {
      name,
      slug,
      description,
      created: moment().valueOf(),
    },
  }).then(({ data }) => {
    dispatch({
      type: 'ADD_CHATBOT_FULFILLED',
      data: data.addedChatbot,
    });
  })
  .catch(({ message }) => {
    dispatch({ type: 'ADD_CHATBOT_REJECTED', error: message });
  });
};

export const deleteChatbot = slug => (
  {
    type: 'DELETE_CHATBOT',
    slug,
  }
);

export const editChatbot = (slug, edit) => (
  {
    type: 'EDIT_CHATBOT',
    data: {
      slug,
      ...edit,
    },
  }
);
