const DEFAULT_WORDS_COUNT = 10;

const WORD_STATE = {
    init: 0,
    hidden: 1,
    ok: 2,
    fail: 3,
};
const MODE = {
    learn: 1,
    guess: 2,
};

export { WORD_STATE, MODE, DEFAULT_WORDS_COUNT };
