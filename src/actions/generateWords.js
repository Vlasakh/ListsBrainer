import getRandom from '../utils/getRandom';
import { WORD_STATE, MODE } from '../constants';

const STOP_COUNTER = 1000;

const filterUnique = list => {
    // test
    // var a1 = [{word:'a'}, {word:1}, {word:'a'}, {word:2}, {word:'1'}, {word:'a'}, {word:'b'}, {word:"1"}, {word:'a'}];
    const onlyUnique = ({ word }, index, self) => self.findIndex(item => item.word === word) === index;

    return list.filter(onlyUnique);
};

const getRandomList = (list, counter, initObj) =>
    new Array(counter).fill('').map(_ => ({
        ...initObj,
        word: list[getRandom(0, list.length - 1)],
    }));

function generate(context, words, count, isRerurn = false) {
    let wordsList = words;
    let checkedCount = +count;
    let list = [];

    if (checkedCount > wordsList.length) checkedCount = wordsList.length;

    for (let ii = 0; ii < STOP_COUNTER; ii++) {
        list = [...list, ...getRandomList(wordsList, checkedCount - list.length, { state: WORD_STATE.init })];

        list = filterUnique(list);

        if (list.length === checkedCount) break;
    }

    if (isRerurn) return list;

    context.setState({ wordsList: list, mode: MODE.learn });
}

export default generate;
