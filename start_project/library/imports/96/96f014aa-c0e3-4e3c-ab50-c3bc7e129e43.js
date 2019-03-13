"use strict";
cc._RF.push(module, '96f01SqwONOPKtQw7x+Ep5D', 'Player');
// scripts/TS/Player.ts

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        // @property(cc.Label)
        // label: cc.Label = null;
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // @property
        // text: string = 'hello';
        _this.jumpHeight = 0;
        _this.jumpDuration = 0;
        _this.maxMoveSpeed = 0;
        _this.accel = 0;
        _this.jumpAudio = null;
        _this.xSpeed = 0;
        _this.accLeft = false;
        _this.accRight = false;
        _this.jumpAction = null;
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    Player.prototype.start = function () {
    };
    Player.prototype.setJumpAction = function () {
        var jumpUp = cc.moveBy(this.jumpDuration, new cc.Vec2(0, this.jumpHeight)).easing(cc.easeCubicActionInOut);
        var jumpDown = cc.moveBy(this.jumpDuration, cc.p(0, -this.jumpHeight)).easing(cc.easeCubicActionInOut);
        var callback = cc.callFunc(this.playJumpSound, this);
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown, callback));
    };
    Player.prototype.playJumpSound = function () {
        cc.audioEngine.play(this.jumpAudio, false, 1);
    };
    Player.prototype.addEventListeners = function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        cc.find("Canvas").on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        cc.find("Canvas").on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        cc.find("Canvas").on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    };
    Player.prototype.onKeyUp = function () {
    };
    Player.prototype.onKeyDown = function (event) {
        switch (event) {
            case :
                break;
            default:
                break;
        }
    };
    Player.prototype.onTouchStart = function () { };
    Player.prototype.onTouchCancel = function () { };
    Player.prototype.onTouchEnd = function () { };
    __decorate([
        property(cc.Integer)
    ], Player.prototype, "jumpHeight", void 0);
    __decorate([
        property(cc.Integer)
    ], Player.prototype, "jumpDuration", void 0);
    __decorate([
        property(cc.Integer)
    ], Player.prototype, "maxMoveSpeed", void 0);
    __decorate([
        property(cc.Integer)
    ], Player.prototype, "accel", void 0);
    __decorate([
        property(cc.AudioClip)
    ], Player.prototype, "jumpAudio", void 0);
    Player = __decorate([
        ccclass
    ], Player);
    return Player;
}(cc.Component));
exports.Player = Player;

cc._RF.pop();