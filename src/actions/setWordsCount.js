import { DEFAULT_WORDS_COUNT } from '../constants';

function setWordsCount(context, count) {
    let len = context.state.baseWordsList.length;
    let newCount = +count;

    console.log('b', { newCount, len, count });
    if (!(newCount > 0 && newCount <= 1000 && newCount <= len)) {
        newCount = DEFAULT_WORDS_COUNT <= len ? DEFAULT_WORDS_COUNT : len;
    }

    console.log('a', { newCount, len, count });

    context.setState({ wordsCount: newCount });
}

export default setWordsCount;
