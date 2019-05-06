import { WORD_STATE, MODE } from '../constants';

function setGuessMode(context) {
    const newWordsList = context.state.wordsList.map(item => ({ ...item, state: WORD_STATE.hidden }));

    context.setState({ wordsList: newWordsList, mode: MODE.guess });
}

export default setGuessMode;
