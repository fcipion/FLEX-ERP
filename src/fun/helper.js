function getNextValue(array, currentValue, type) {
    // console.log(
    //     'currentValue',
    //     array.find((data) => {})
    // );
    const currentIndex = array.indexOf(JSON.stringify(currentValue));

    if (currentIndex === -1) {
        return 0;
    }
    if (currentIndex === array.length - 1 && type === '+') {
        return 0;
    }
    if (currentIndex === 0 && type === '-') {
        return 0;
    }
    /* eslint no-underscore-dangle: 0 */
    console.log('_ID', array[currentIndex + 1]._id);
    /* eslint no-underscore-dangle: 0 */
    if (type === '+') return array[currentIndex + 1]._id;

    /* eslint no-underscore-dangle: 0 */
    return array[currentIndex - 1]._id;
}

function generateId() {
    return Date.now().toString() + Math.random().toString().slice(2);
}

export { getNextValue, generateId };
