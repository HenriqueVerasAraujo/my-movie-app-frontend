export const imagesArray = [
    'https://image.tmdb.org/t/p/original/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
    'https://image.tmdb.org/t/p/original/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg',
    'https://image.tmdb.org/t/p/original/or1gBugydmjToAEq7OZY0owwFk.jpg',
    'https://image.tmdb.org/t/p/original/s5HQf2Gb3lIO2cRcFwNL9sn1o1o.jpg',
    'https://image.tmdb.org/t/p/original/xA7N41glw17MBQtcWSm2eBlBRuG.jpg',
    'https://image.tmdb.org/t/p/original/e3DXXLJHGqMx9yYpXsql1XNljmM.jpg',
    'https://image.tmdb.org/t/p/original/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg'
]

export const randomImage = () => {
    const randomNumber = Math.round(Math.floor(Math.random() * 7));
    return imagesArray[randomNumber];
}