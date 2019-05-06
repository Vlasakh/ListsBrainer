import ScrollTo from '../utils/scrollTo';
import { WORD_STATE, MODE } from '../constants';

const replaceSymbols = word => word.replace('ё', 'е');

function setWord(context, value, event) {
    let list = context.state.wordsList;
    let index = list.findIndex(
        item => replaceSymbols(item.word.trim().toLowerCase()) === replaceSymbols(value.trim().toLowerCase())
    );

    if (index >= 0) {
        list[index].state = WORD_STATE.ok;
        list[index].blinkClass = true;

        let state = { wordsList: [...list] };

        if (list.filter(item => item.state === WORD_STATE.hidden).length === 0) {
            state.mode = MODE.learn;
        }

        context.setState(state);
        event.target.value = '';
        new ScrollTo().scrollTo({ hash: `.js-word-${index}`, extraHeight: 20 });
    }
}

export default setWord;
