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
        movePanel: cc.Node,
        linkPrefab: cc.Prefab,
        sswPrefab: cc.Prefab,
        initRow: 7,
        initCol: 3,
        _newTopRow: null,
        _curBottomRow: null,
        _curTouchRow: -1,
        _startPosition: null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function() {
        //加载 填满屏幕中央
        this._curBottomRow = 0;
        this._newTopRow = 7;
        this._startPosition = this.movePanel.position;
        for (let row = 0; row < 7; row++) {
            let randomBlackCol = Math.floor(Math.random() * 3);
            for (let col = 0; col < 3; col++) {
                let ssw = null;
                if (randomBlackCol == col) {
                    ssw = cc.instantiate(this.sswPrefab);
                    ssw.getComponent('block-script').init('ssw', this);
                } else {
                    ssw = cc.instantiate(this.linkPrefab);
                    ssw.getComponent('block-script').init('link', this);
                }
                this.movePanel.addChild(ssw);
                ssw.name = row + '#' + col;
                ssw.position = cc.v2(col, row).mul(100);
            }
        }
    },
    move: function() {
        let movePosition = cc.v2(
            this._startPosition.x,
            this._startPosition.y + (this._curBottomRow + 1) * -100
        );
        this.movePanel.runAction(
            cc.sequence(
                cc.moveTo(0.2, movePosition),
                cc.callFunc(this.updateRender.bind(this))
            )
        );
    },
    updateRender: function() {
        let row = this._newTopRow;
        let randomBlackCol = Math.floor(Math.random() * 3);
        for (let col = 0; col < 3; col++) {
            let ssw = null;
            if (randomBlackCol == col) {
                ssw = cc.instantiate(this.sswPrefab);
                ssw.getComponent('block-script').init('ssw', this);
            } else {
                ssw = cc.instantiate(this.linkPrefab);
                ssw.getComponent('block-script').init('link', this);
            }
            this.movePanel.addChild(ssw);
            ssw.name = row + '#' + col;
            ssw.position = cc.v2(col, row).mul(100);
        }
        let oldRow = this._curBottomRow;
        for (let col = 0; col < 3; col++) {
            this.movePanel
                .getChildByName(oldRow + '#' + col)
                .removeFromParent();
        }
        this._curBottomRow++;
        this._curTouchRow++;
        this._newTopRow++;
    }
});
