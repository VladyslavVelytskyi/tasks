let pizza = [
    {
        name: "Пепперони Блюз",
        ingredients: ["Бергадер Блю", "Пепперони", "Моцарелла", "Соус Альфредо"],
        calories: 0,
        price: 114.99
    },
    {
        name: "Тони Пепперони",
        ingredients: ["Пепперони", "Моцарелла", "Соус Domino's"],
        calories: 0,
        price: 114.99
    },
    {
        name: "Гавайская",
        ingredients: ["Ананас", "Курица", "Моцарелла", "Соус Domino's"],
        calories: 0,
        price: 114.99
    },
    {
        name: "Барбекю",
        ingredients: [ "Лук", "Курица", "Бекон", "Грибы", "Моцарелла", "Соус Барбекю"],
        calories: 0,
        price: 114.99
    },
    {
        name: "Кантри",
        ingredients: ["Лук", "Огурцы маринованные", "Грибы", "Бекон", "Ветчина", "Моцарелла", "Соус Чесночный"],
        calories: 0,
        price: 139.99
    },
    {
        name: "Овощная Феерия",
        ingredients: ["Оливки", "Лук", "Зеленый перец", "Помидоры", "Грибы", "Моцарелла", "Соус Domino's"],
        calories: 0,
        price: 139.99
    },
    {
        name: "Прованс",
        ingredients: [ "Бергадер Блю", "Помидоры", "Ветчина", "Пепперони", "Моцарелла", "Соус Альфредо"],
        calories: 0,
        price: 139.99
    },
    {
        name: "ПапараZZи",
        ingredients: ["Оливки", "Помидоры", "Пепперони", "Моцарелла", "Соус Альфредо"],
        calories: 0,
        price: 139.99
    },
    {
        name: "Карбонара",
        ingredients: ["Лук", "Бекон", "Грибы", "Ветчина", "Моцарелла", "Соус Альфредо"],
        calories: 0,
        price: 139.99
    },
    {
        name: "Баварская",
        ingredients: [ "Пармезан", "Колбаски баварские", "Моцарелла", "Соус Барбекю"],
        calories: 0,
        price: 139.99
    },
    {
        name: "Тоскана",
        ingredients: ["Шпинат", "Курица", "Помидоры черри", "Фета", "Моцарелла", "Соус Альфредо"],
        calories: 0,
        price: 159.99
    },
    {
        name: "Мюнхенска DeLUX",
        ingredients: ["Горчица", "Сосиски белые", "Колбаски баварские", "Помидоры", "Ветчина", "Моцарелла", "Соус Барбекю"],
        calories: 0,
        price: 159.99
    },
    {
        name: "Спайси",
        ingredients: ["Халапеньо", "Бекон", "Помидоры", "Пепперони", "Моцарелла", "Соус Domino's"],
        calories: 0,
        price: 159.99
    },
    {
        name: "BBQ Делюкс",
        ingredients: ["Пармезан", "Фрикадельки", "Зеленый перец", "Лук", "Грибы", "Пепперони", "Моцарелла", "Соус Барбекю"],
        calories: 0,
        price: 159.99
    },
    {
        name: "Тунец",
        ingredients: ["Тунец", "Моцарелла", "Соус Domino's"],
        calories: 0,
        price: 159.99
    },
    {
        name: "Американа",
        ingredients: ["Бекон", "Ветчина", "Пепперони", "Моцарелла", "Соус Domino's"],
        calories: 0,
        price: 159.99
    },
    {
        name: "Пять Сыров",
        ingredients: ["Пармезан", "Бергадер Блю", "Чедер", "Фета", "Моцарелла", "Соус Альфредо"],
        calories: 0,
        price: 174.99
    },
    {
        name: "Шпинат и Фета",
        ingredients: ["Шпинат", "Оливки", "Зеленый перец", "Помидоры", "Грибы", "Фета", "Моцарелла", "Соус Альфредо"],
        calories: 0,
        price: 174.99
    },
    {
        name: "МитZZa",
        ingredients: ["Пармезан", "Колбаски баварские", "Бекон", "Ветчина", "Пепперони", "Моцарелла", "Соус Domino's"],
        calories: 0,
        price: 174.99
    },
];

let ingredients = [
    {
        name: "Пармезан",
        img: "url(img/parmezan.svg)",
        price: 18.99,
        calories: 215
    },
    {
        name: "Бекон",
        img: "url(img/becon.svg)",
        price: 18.99,
        calories: 270
    },
    {
        name: "Моцарелла",
        img: "url(img/mozarella.svg)",
        price: 18.99,
        calories: 140
    },
    {
        name: "Ветчина",
        img: "url(img/ham.svg)",
        price: 18.99,
        calories: 72
    },
    {
        name: "Колбаски баварские",
        img: "url(img/bavarian-sausage.svg)",
        price: 18.99,
        calories: 180
    },
    {
        name: "Пепперони",
        img: "url(img/pepperoni.svg)",
        price: 18.99,
        calories: 247
    },
    {
        name: "Соус Domino's",
        img: "url(img/dominos-sauce.svg)",
        price: 9.99,
        calories: 116
    },
    {
        name: "Зеленый перец",
        img: "url(img/green-pepper.svg)",
        price: 18.99,
        calories: 125
    },
    {
        name: "Фета",
        img: "url(img/feta.svg)",
        price: 18.99,
        calories: 132
    },
    {
        name: "Шпинат",
        img: "url(img/spinach.svg)",
        price: 18.99,
        calories: 11
    },
    {
        name: "Помидоры",
        img: "url(img/tomato.svg)",
        price: 18.99,
        calories: 10
    },
    {
        name: "Грибы",
        img: "url(img/mushroom.svg)",
        price: 18.99,
        calories: 14
    },
    {
        name: "Оливки",
        img: "url(img/olives.svg)",
        price: 18.99,
        calories: 58
    },
    {
        name: "Соус Альфредо",
        img: "url(img/alfredo-sauce.svg)",
        price: 9.99,
        calories: 116
    },
    {
        name: "Бергадер Блю",
        img: "url(img/bergader-blue.svg)",
        price: 18.99,
        calories: 181
    },
    {
        name: "Чедер",
        img: "url(img/cheddar.svg)",
        price: 18.99,
        calories: 201
    },
    {
        name: "Курица",
        img: "url(img/chicken.svg)",
        price: 18.99,
        calories: 85
    },
    {
        name: "Помидоры черри",
        img: "url(img/tomato-cherry.svg)",
        price: 18.99,
        calories: 8
    },
    {
        name: "Тунец",
        img: "url(img/tuna.svg)",
        price: 18.99,
        calories: 75
    },
    {
        name: "Фрикадельки",
        img: "url(img/meatball.svg)",
        price: 18.99,
        calories: 123
    },
    {
        name: "Лук",
        img: "url(img/onion.svg)",
        price: 18.99,
        calories: 20
    },
    {
        name: "Соус Барбекю",
        img: "url(img/bbq-sauce.svg)",
        price: 9.99,
        calories: 116
    },
    {
        name: "Халапеньо",
        img: "url(img/jalapeno.svg)",
        price: 18.99,
        calories: 14
    },
    {
        name: "Горчица",
        img: "url(img/mustard.svg)",
        price: 9.99,
        calories: 33
    },
    {
        name: "Сосиски белые",
        img: "url(img/white-sausage.svg)",
        price: 18.99,
        calories: 130
    },
    {
        name: "Огурцы маринованные",
        img: "url(img/cucumber.svg)",
        price: 18.99,
        calories: 6
    },
    {
        name: "Соус Чесночный",
        img: "url(img/onion-sauce.svg)",
        price: 9.99,
        calories: 116
    },
    {
        name: "Ананас",
        img: "url(img/pineapple.svg)",
        price: 18.99,
        calories: 25
    }
];
