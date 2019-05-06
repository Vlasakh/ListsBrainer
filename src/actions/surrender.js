import { WORD_STATE, MODE } from '../constants';

function surrender(context, value, event) {
    let list = context.state.wordsList.map(item => ({
        ...item,
        state: item.state === WORD_STATE.hidden ? WORD_STATE.fail : item.state,
    }));

    context.setState({ wordsList: list, mode: MODE.learn });
}

export default surrender;
