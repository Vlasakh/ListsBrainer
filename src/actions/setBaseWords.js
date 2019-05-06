import filterUnique from '../utils/filterUnique';

function setBaseWords(context, words, isReturn = false) {
    let wordsList = filterUnique(words.trim().split(/\n/));

    if (isReturn) return wordsList;

    context.setState({
        baseWordsList: wordsList,
    });
}

export default setBaseWords;
