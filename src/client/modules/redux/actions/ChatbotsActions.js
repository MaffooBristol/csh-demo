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
  })
  .then(({ data }) => {
    dispatch({
      type: 'ADD_CHATBOT_FULFILLED',
      data: data.addedChatbot,
    });
  })
  .catch(({ message }) => {
    dispatch({ type: 'ADD_CHATBOT_REJECTED', error: message });
  });
};

export const deleteChatbot = slug => (dispatch) => {
  axios.post('/api/bots/delete', {
    data: {
      slug,
    },
  })
  .then(({ data }) => {
    dispatch({
      type: 'DELETE_CHATBOT_FULFILLED',
      slug: data.slug,
    });
  })
  .catch(({ message }) => {
    dispatch({ type: 'DELETE_CHATBOT_REJECTED', error: message });
  });
};

export const editChatbot = (slug, edit) => (dispatch) => {
  axios.post('/api/bots/edit', {
    data: {
      slug,
      ...edit,
    },
  })
  .then(({ data }) => {
    dispatch({
      type: 'EDIT_CHATBOT_FULFILLED',
      data: {
        slug: data.slug,
        edit: data.editedChatbot,
      },
    });
  })
  .catch(({ message }) => {
    dispatch({ type: 'EDIT_CHATBOT_REJECTED', error: message });
  });
};
