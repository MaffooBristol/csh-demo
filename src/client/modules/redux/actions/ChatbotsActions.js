import moment from 'moment';

export const fetchChatbots = () => (dispatch) => {
  const chatbots = [
    {
      name: 'MaffBot',
      slug: 'maffbot',
      created: '2017-04-04T17:53:54+01:00',
      description: 'The best chatbot ever. It doesn\'t do anything, mind.',
    },
    {
      name: 'HarryBot',
      slug: 'harrybot',
      created: '2017-04-02T10:46:35+01:00',
      description: 'Harrybot is a very simple chatscript bot that seems to get very confused.',
    },
    {
      name: 'TanBot',
      slug: 'tanbot',
      created: '2017-03-28T12:12:18+01:00',
      description: 'Currency conversion for those trans-global jetsetters.',
    },
  ];
  setTimeout(() => {
    dispatch({ type: 'FETCH_CHATBOTS_FULFILLED', data: chatbots });
  }, 100);
};

export const addChatbot = (name, slug, description) => (
  {
    type: 'ADD_CHATBOT',
    data: {
      name,
      slug,
      description,
      created: moment().format(),
    },
  }
);

export const deleteChatbot = slug => (
  {
    type: 'DELETE_CHATBOT',
    slug,
  }
);
