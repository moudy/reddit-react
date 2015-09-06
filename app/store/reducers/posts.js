import { REDDIT_REQUEST_START, REDDIT_REQUEST_SUCCESS } from '../../actions';

export default function(state = {}, action) {
  switch (action.type) {
  case REDDIT_REQUEST_SUCCESS:
    const items = action.response.data.children.map(item => item.data);
    state = Object.assign({}, state, { items: items, isLoading: false });
    break;
  case REDDIT_REQUEST_START:
    state = Object.assign({}, state, { isLoading: true });
    break;
  }
  return state;
}

