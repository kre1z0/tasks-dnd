function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomSex() {
    return Math.random() > 0.5 ? 'women' : 'men';
}

export const getRandomImg = () =>
    `https://randomuser.me/api/portraits/${getRandomSex()}/${getRandomInt(
        1,
        99,
    )}.jpg`;
