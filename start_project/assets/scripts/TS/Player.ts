// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export class Player extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';
    @property(cc.Integer)
    private jumpHeight:number = 0;

    @property(cc.Integer)
    private jumpDuration:number = 0;

    @property(cc.Integer)
    private maxMoveSpeed : number=0;
    
    @property(cc.Integer)
    private accel : number = 0;
    @property(cc.AudioClip)
    private jumpAudio : cc.AudioClip = null;

    xSpeed:number=0;
    accLeft:boolean = false;
    accRight:boolean = false;
    jumpAction :cc.Action=null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.jumpAction = this.setJumpAction();
        this.node.runAction(this.jumpAction);

        this.accLeft=this.accRight=false;
        this.xSpeed=0;
        this.addEventListeners();
    }

    // start () {

    // }
    private setJumpAction ():cc.ActionInterval
    {
        let jumpUp = cc.moveBy(this.jumpDuration,new cc.Vec2(0,this.jumpHeight)).easing(cc.easeCubicActionInOut);
        let jumpDown = cc.moveBy(this.jumpDuration,cc.p(0,-this.jumpHeight)).easing(cc.easeCubicActionInOut);
        let callback = cc.callFunc(this.playJumpSound,this);
        return cc.repeatForever(cc.sequence(jumpUp,jumpDown,callback));
    }
    private playJumpSound() {
        cc.audioEngine.play(this.jumpAudio,false,1);
    }
    private addEventListeners()
    {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this);
        cc.find("Canvas").on(cc.Node.EventType.TOUCH_START,this.onTouchStart,this);
        cc.find("Canvas").on(cc.Node.EventType.TOUCH_CANCEL,this.onTouchCancel,this);
        cc.find("Canvas").on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);

    }
    private onKeyUp(event:cc.macro.KEY)
    {
        switch (event) {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                this.stopMove();
                break;
        }
    }
    private onKeyDown(event:cc.macro.KEY)
    {
        switch (event) {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                this.moveLeft();
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                this.moveRight();
                break;
        }
    }
    private moveLeft()
    {
        this.accLeft=true;
        this.accRight=false;
    }
    private moveRight()
    {
        this.accLeft=false;
        this.accRight=true;
    }
    private stopMove()
    {
        this.accLeft=false;
        this.accRight=false;
    }
    private onTouchStart(event:cc.Event.EventTouch){
        if (event.getLocationX() > cc.winSize.width/2) {
            this.moveRight();
        }else
        {
            this.moveLeft();
        }
    }
    private onTouchCancel(){}
    private onTouchEnd(){
        this.stopMove();
    }
    update (dt) {
        if (this.accLeft) {
            this.xSpeed-=this.accel*dt;
        }else if (this.accRight) {
            this.xSpeed+=this.accel*dt;
        }
        if (Math.abs(this.xSpeed)>this.maxMoveSpeed) {
            this.xSpeed = this.maxMoveSpeed*(this.xSpeed/Math.abs(this.xSpeed));
        }
        this.node.x+=this.xSpeed*dt;
        if (this.node.x <= -this.node.parent.x/2) {
            this.node.x=-this.node.parent.x;
        }
        if (this.node.x>=this.node.parent.x/2) {
            this.node.x=this.node.parent.x;    
        }
    }
}
