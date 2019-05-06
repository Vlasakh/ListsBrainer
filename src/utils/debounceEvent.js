import debounce from 'debounce';

function debounceEvent(fn, delay) {
    const functionDebounced = debounce((value, event) => fn(value, event), delay);

    return event => functionDebounced(event.target.value, { ...event });
}

export default debounceEvent;
