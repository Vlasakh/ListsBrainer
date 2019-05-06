import React from 'react';

import Layout from './components/Layout';
import generateWords from './actions/generateWords';
import setGuessMode from './actions/setGuessMode';
import setWord from './actions/setWord';
import surrender from './actions/surrender';
import setBaseWords from './actions/setBaseWords';
import setWordsCount from './actions/setWordsCount';
import replaceWord from './actions/replaceWord';
import words from './lists/list01';
import { MODE, DEFAULT_WORDS_COUNT } from './constants';

class App extends React.Component {
    state = {
        wordsCount: DEFAULT_WORDS_COUNT,
        wordsList: [],
        baseWordsList: [],
        mode: MODE.learn,
    };

    constructor(...args) {
        super(...args);

        this.state.baseWordsList = setBaseWords(this, words, true);
        this.state.wordsList = generateWords(this, this.state.baseWordsList, this.state.wordsCount, true);
    }

    setWordsCount = count => setWordsCount(this, count);

    setBaseWords = newWords => setBaseWords(this, newWords);
    generateWords = () => generateWords(this, this.state.baseWordsList, this.state.wordsCount);

    setGuessMode = () => setGuessMode(this);
    setLearnMode = () => surrender(this);
    setWord = (value, event) => setWord(this, value, event);
    replaceWord = index => () => replaceWord(this, index);

    render() {
        // prettier-ignore
        return <Layout 
            storage={this.state} 
            actions={{
                setWordsCount: this.setWordsCount,
                generateWords: this.generateWords,
                setBaseWords: this.setBaseWords,
                setGuessMode: this.setGuessMode,
                setLearnMode: this.setLearnMode,
                setWord: this.setWord,
                replaceWord: this.replaceWord,
            }}
        />;
    }
}

export default App;
