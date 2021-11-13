# canvas-pixels

Простая библиотека для быстрого рисования пикселей.

Вот демка: https://yuuretsu.github.io/canvas-pixels/

## Как подключить

В браузере:
```html
<script src="https://cdn.jsdelivr.net/npm/cnv-pxls@1.0.2/dist/cnv-pxls.min.js"></script>
```

Через npm:
```
npm i -D cnv-pxls
```

## Как пользоваться

Можно прямо этот код запустить. Главное не забыть перед этим подключить саму библиотеку :)
```js
// ширина, высота, размер пикселя
const pixels = new Pixels(256, 256, 2);

// так можно добавить канвас на страницу
// source это канвас
document.body.appendChild(pixels.source);

// x, y, red, green, blue, alpha
pixels.setPixel(0, 0, 255, 0, 0, 255);

// еще можно так
/** @type {[number, number, number, number]} */
const GREEN = [0, 255, 0, 255];
pixels.setPixel(1, 1, ...GREEN);

// обязательно надо вызвать этот метод,
// чтобы картинка обновилась
pixels.update();


// попробуем измерить время рисования кучи (65.5 тыс) пикселей

const START = performance.now();
for (let x = 0; x < pixels.width; x++) {
  for (let y = 0; y < pixels.height; y++) {
    const ALPHA = (x ^ y) % 256;
    pixels.setPixel(x, y, 0, 0, 0, ALPHA);
  }
}

pixels.update();
console.log(performance.now() - START);
// у меня получилось около 13 мс, что укладывается в 60 фпс


// а тут анимация

function step() {
  pixels.clear(); // так можно стереть нарисованное
  for (let x = 0; x < pixels.width; x++) {
    for (let y = 0; y < pixels.height; y++) {
      const ALPHA = (Math.sin(Math.hypot(x - 128, y - 128) + time / 10) * 255) % 256;
      pixels.setPixel(x, y, 0, 0, 0, ALPHA);
    }
  }
  pixels.update(); // да-да, ваще не забывай обновлять
  time += 1;
}

const FPS = 60;

let time = 0;
setInterval(step, 1000 / FPS); // тут запускается луп
```