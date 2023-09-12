// 本文件由FirstUI授权予行道京雄（北京）信息技术有限公司（手机号：1 3 0    310 5 5 52 7，身份证尾号：DWQD02）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
import GContext2D from '../context-2d/RenderingContext';
import GContextWebGL from '../context-webgl/RenderingContext';

export default class GCanvas {

    // static GBridge = null;

    id = null;// echo建议

    _needRender = true;

    constructor(id, { disableAutoSwap }) {
        this.id = id;// 新特性待增加

        this._disableAutoSwap = disableAutoSwap;
        if (disableAutoSwap) {
            this._swapBuffers = () => {
                GCanvas.GBridge.render(this.id);
            }
        }
    }
// 2021-5-6变更
    getContext(type) {

        let context = null;

        if (type.match(/webgl/i)) {
            context = new GContextWebGL(this);

            context.componentId = this.id;

            if (!this._disableAutoSwap) {
                const render = () => {
                    if (this._needRender) {
                        GCanvas.GBridge.render(this.id);
                        this._needRender = false;
                    }
                }
                setInterval(render, 16);
            }

            GCanvas.GBridge.callSetContextType(this.id, 1); // 0 for 2d; 1 for webgl
        } else if (type.match(/2d/i)) {
            context = new GContext2D(this);

            context.componentId = this.id;

//             const render = ( callback ) => {
//
//                 const commands = context._drawCommands;
//                 context._drawCommands = '';// 新特性待增加
//
//                 GCanvas.GBridge.render2d(this.id, commands, callback);
//                 this._needRender = false;
//             }
// 			//draw方法触发
// 			context._flush = render;
//             //setInterval(render, 16);

            GCanvas.GBridge.callSetContextType(this.id, 0);
        } else {
            throw new Error('not supported context ' + type);
        }

        return context;

    }

    reset() {// 功能需要优化
        GCanvas.GBridge.callReset(this.id);
    }


}