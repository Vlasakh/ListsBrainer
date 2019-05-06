export default function filterUnique(list) {
    // test
    // var a1 = ['a', 1, 'a', 2, '1', 'a', 'b', "1", 'a'];
    const onlyUnique = (value, index, self) => self.indexOf(value) === index;

    return list.filter(onlyUnique);
}
