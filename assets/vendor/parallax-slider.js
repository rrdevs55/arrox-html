const _0xe26999 = _0x1854;
(function (_0x42e8ca, _0x241e03) {
    const _0x685d44 = _0x1854,
        _0x2af7d6 = _0x42e8ca();
    while (!![]) {
        try {
            const _0xc41802 = -parseInt(_0x685d44(0x1f3)) / 0x1 + parseInt(_0x685d44(0x1f8)) / 0x2 + -parseInt(_0x685d44(0x1ea)) / 0x3 * (-parseInt(_0x685d44(0x1ee)) / 0x4) + parseInt(_0x685d44(0x1f0)) / 0x5 + -parseInt(_0x685d44(0x1df)) / 0x6 * (-parseInt(_0x685d44(0x1e8)) / 0x7) + parseInt(_0x685d44(0x1e1)) / 0x8 * (parseInt(_0x685d44(0x1eb)) / 0x9) + -parseInt(_0x685d44(0x1fa)) / 0xa * (parseInt(_0x685d44(0x1f5)) / 0xb);
            if (_0xc41802 === _0x241e03) break;
            else _0x2af7d6['push'](_0x2af7d6['shift']());
        } catch (_0x42b824) {
            _0x2af7d6['push'](_0x2af7d6['shift']());
        }
    }
}(_0x3170, 0xf206c));

function _0x3170() {
    const _0x3da65d = ['scrollY', 'querySelector', 'url(./assets/imgs/slider/protfolio-', '12145axookR', 'backgroundImage', '9goEwqA', '924975mZlGHy', 'innerWidth', 'querySelectorAll', '905516trcLBZ', 'px)', '2194430nfDKQA', 'style', 'addEventListener', '1258053qnALBs', 'forEach', '17587636xRwcmD', 'width', 'translateX(', '1549984bcedHV', 'getBoundingClientRect', '20luaMiB', 'transform', 'innerHeight', 'body', 'toFixed', '5538xilAhf', 'translateX(-', '152cfLbSx', 'length', '.parallax-img', 'height'];
    _0x3170 = function () {
        return _0x3da65d;
    };
    return _0x3170();
}
let images = [...document[_0xe26999(0x1ed)](_0xe26999(0x1e3))],
    slider = document[_0xe26999(0x1e6)]('.parallax-slider'),
    sliderWidth, imageWidth, current = 0x0,
    target = 0x0,
    ease = 0.05;
window[_0xe26999(0x1f2)]('resize', init), images[_0xe26999(0x1f4)]((_0x59e5c9, _0xb30069) => {
    const _0x4dc42e = _0xe26999;
    _0x59e5c9[_0x4dc42e(0x1f1)][_0x4dc42e(0x1e9)] = _0x4dc42e(0x1e7) + (_0xb30069 + 0x1) + '.jpg)';
});

function _0x1854(_0x516179, _0x48a19a) {
    const _0x317032 = _0x3170();
    return _0x1854 = function (_0x185403, _0x39e75b) {
        _0x185403 = _0x185403 - 0x1db;
        let _0x3bea27 = _0x317032[_0x185403];
        return _0x3bea27;
    }, _0x1854(_0x516179, _0x48a19a);
}

function lerp(_0x2983b1, _0x11adb6, _0x1c37d5) {
    return _0x2983b1 * (0x1 - _0x1c37d5) + _0x11adb6 * _0x1c37d5;
}

function setTransform(_0x374881, _0x369ef7) {
    const _0x43ba82 = _0xe26999;
    _0x374881[_0x43ba82(0x1f1)][_0x43ba82(0x1db)] = _0x369ef7;
}

function init() {
    const _0x1c83ea = _0xe26999;
    sliderWidth = slider[_0x1c83ea(0x1f9)]()[_0x1c83ea(0x1f6)], imageWidth = sliderWidth / images[_0x1c83ea(0x1e2)], document[_0x1c83ea(0x1dd)]['style'][_0x1c83ea(0x1e4)] = sliderWidth - (window[_0x1c83ea(0x1ec)] - window[_0x1c83ea(0x1dc)]) + 'px';
}

function animate() {
    const _0x2a8f56 = _0xe26999;
    current = parseFloat(lerp(current, target, ease))[_0x2a8f56(0x1de)](0x2), target = window[_0x2a8f56(0x1e5)], setTransform(slider, _0x2a8f56(0x1e0) + current + _0x2a8f56(0x1ef)), animateImages(), requestAnimationFrame(animate);
}

function animateImages() {
    const _0x5a8261 = _0xe26999;
    let _0x19de3d = current / imageWidth,
        _0x172712;
    images[_0x5a8261(0x1f4)]((_0x2ee735, _0x25d055) => {
        const _0x141403 = _0x5a8261;
        _0x172712 = _0x19de3d - _0x25d055 * 0.7, setTransform(_0x2ee735, _0x141403(0x1f7) + _0x172712 * 0x64 + _0x141403(0x1ef));
    });
}
init(), animate();