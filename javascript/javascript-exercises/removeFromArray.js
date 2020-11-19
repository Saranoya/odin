function removeFromArray(array) {
    for (arg=1; arg<arguments.length;arg++) {
        for (i=0; i<array.length; i++) {
            if (array[i] == arguments[arg]) {
                array.splice(i, 1);
            }
        }
    }
    return array;
}
