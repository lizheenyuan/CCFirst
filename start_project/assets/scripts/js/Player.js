// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        jumpHeight:0,
        jumpDuration:0,
        maxMoveSpeed:0,
        accel:0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.runAction(this.setJumpAction());
        this.accLeft=this.accRight=false;
        this.xspeed=0;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this);
    },

    start () {

    },
    setJumpAction:function()
    {
        var jumpUp = cc.moveBy(this.jumpDuration,cc.v2(0,this.jumpHeight)).easing(cc.easeCubicActionInOut());
        var jumpDown = cc.moveBy(this.jumpDuration,cc.v2(0,-this.jumpHeight)).easing(cc.easeCubicActionInOut());
        return cc.repeatForever(cc.sequence(jumpUp,jumpDown));
    },
    onKeyDown(event)
    {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = true;
                break;
            case cc.macro.KEY.d:
                this.accRight=true;
                break;
        }
    },
    onKeyUp(event)
    {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft=false;
                break;
        
            case cc.macro.KEY.d:
                this.accRight=false;
                break;
        }
    },
    update (dt) 
    {
        if (this.accLeft) {
            this.xspeed -=this.accel*dt;
        }else if (this.accRight) {
            this.xspeed += this.accel*dt;
        }
        if (Math.abs(this.xspeed)>this.maxMoveSpeed) {
            this.xspeed = this.maxMoveSpeed*this.xspeed/Math.abs(this.xspeed);
        }
        this.node.x+=this.xspeed*dt;
    },
});
