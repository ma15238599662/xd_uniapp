// 本文件由FirstUI授权予行道京雄（北京）信息技术有限公司（手机号：1   3 031 055 5  2  7，身份证尾号：DWQD02）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
class FillStyleLinearGradient {

    constructor(x0, y0, x1, y1) {
        this._start_pos = { _x: x0, _y: y0 };
        this._end_pos = { _x: x1, _y: y1 };
        this._stop_count = 0;
        this._stops = [0, 0, 0, 0, 0];
    }

    addColorStop = function (pos, color) {
        if (this._stop_count < 5 && 0.0 <= pos && pos <= 1.0) {
            this._stops[this._stop_count] = { _pos: pos, _color: color };
            this._stop_count++;
        }
    }
}

export default FillStyleLinearGradient;