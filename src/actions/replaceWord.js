import getRandom from '../utils/getRandom';

const STOP_COUNTER = 1000;

function replaceWord(context, index) {
    let { wordsList, baseWordsList } = context.state;
    let newWord = 'fail';

    for (let ii = 0; ii <= STOP_COUNTER; ii++) {
        newWord = baseWordsList[getRandom(0, wordsList.length - 1)];
        let checkList = wordsList.filter(({ word }) => word === newWord);
        if (checkList.length < 1) break;
    }

    let newWordsList = [...wordsList];
    newWordsList[index] = {
        ...newWordsList[index],
        word: newWord,
    };

    context.setState({ wordsList: newWordsList });
}

export default replaceWord;
