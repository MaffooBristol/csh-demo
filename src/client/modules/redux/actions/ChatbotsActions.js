import axios from 'axios';
import moment from 'moment';

export const fetchChatbots = () => (dispatch) => {
  axios.post('/api/bots/list')
  .then((res) => {
    dispatch({ type: 'FETCH_CHATBOTS_FULFILLED', data: res.data.chatbots });
  });
};

export const addChatbot = (name, slug, description) => (
  {
    type: 'ADD_CHATBOT',
    data: {
      name,
      slug,
      description,
      created: moment().valueOf(),
    },
  }
);

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
