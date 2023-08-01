// import {signalR} from './signalr'
var ctiObj = {};

ctiObj.agent = 8001; //坐席工号
ctiObj.password = 'pfyk123123'; //坐席密码（必须字符串）
ctiObj.dn = 8001; //话机(必须字符串)
ctiObj.cid = 9002; //企业编号
ctiObj.webrtc_exten = 'C' + ctiObj.cid + ctiObj.dn; //分机号
ctiObj.webrtc_password = 'pfyk123123'; // 分机密码
ctiObj.isWebrtc = '2'; // 是否开启webrtc 1是 2不是

ctiObj.withUrl = 'https://cti.kqtyun.com/wss/esl';
ctiObj.popScreen = 'https://www.baidu.com/'; // 弹屏地址

ctiObj.caller = ''; // 主叫号码（中继号）
ctiObj.callee = ''; // 被叫号码
ctiObj.transferCallee = ''; // 转接号码
ctiObj.enquireCallee = ''; // 询问号码
ctiObj.trilateralCallee = ''; // 三方号码
ctiObj.status = ''; // 状态类型
ctiObj.currentState = '0'; // 当前话机状态
ctiObj.connection = null; // 连接对象
ctiObj.currentRinging = ''; // 振铃状态
ctiObj.currentRingingBack = ''; // 回铃状态
ctiObj.currentPhone = ''; // 手机号
ctiObj.currentSeatPhone = ''; // 坐席号码
ctiObj.currentTransferType = ''; // 转接类型(blind盲转，consult询问，treeway三方，answered IP话机(自动应答), “” 空字符是正常呼入呼出振铃)
ctiObj.currentTransferTypeBack = ''; // 回铃状态
ctiObj.callType = ''; // 类型(0呼出1呼入)

// 初始化默认值
function initDefault() {
    ctiObj.currentRinging = '';
    ctiObj.currentRingingBack = '';
    ctiObj.currentPhone = '';
    ctiObj.currentSeatPhone = '';
    ctiObj.transferCallee = '';
    ctiObj.enquireCallee = '';
    ctiObj.trilateralCallee = '';
    ctiObj.callType = '';
    ctiObj.currentTransferType = '';
    ctiObj.currentTransferTypeBack = '';
}

// 离线0
// 空闲1
// 忙碌2
// 小休3
// 振铃4
// 通话5
// 保持6
// 后处理7
var statusList = [
    {
        val: '离线',
        status: '0',
        show: false,
        class: 'phone-red',
        func: '',
    },
    {
        val: '空闲',
        status: '1',
        show: true,
        class: 'phone-green',
        func: 'ready',
    },
    {
        val: '忙碌',
        status: '2',
        show: true,
        class: 'phone-red',
        func: 'busy',
    },
    {
        val: '小休',
        status: '3',
        show: true,
        class: 'phone-red',
        func: 'rest',
    },
    {
        val: '振铃',
        status: '4',
        show: false,
        class: 'phone-green',
        func: '',
    },
    {
        val: '通话',
        status: '5',
        show: false,
        class: 'phone-green',
        func: '',
    },
    {
        val: '保持',
        status: '6',
        show: false,
        class: 'phone-green',
        func: '',
    },
    {
        val: '后处理',
        status: '7',
        show: true,
        class: 'phone-red',
        func: 'dispose',
    },
];
ctiObj.connection = new signalR.HubConnectionBuilder()
    .withUrl(ctiObj.withUrl)
    .build();

/**
 * 连接事件
 */
ctiObj.connection
    .start()
    .then(function() {
        checkIn();
    })
    .catch(function(err) {
        return console.error(err);
    });

/**
 * 处理异常
 */
ctiObj.connection.on('Error', function(code, error) {});

/**
 * 签入成功事件
 */
ctiObj.connection.on('Login', function(agentId) {
    window.parent.postMessage({
        cmd: 'changeCode',
        params: { code: 1 },
    });
    // 拉取外显号码
    ctiObj.connection.invoke('RelayList').catch(function(err) {
        return console.error(err);
    });
});

/**
 * 签出成功
 */
ctiObj.connection.on('Logout', function(agentId) {
    modifyState('0');
});

/**
 * 取消三方
 */
ctiObj.connection.on('ThreeWayCancel', function(callerNumber, calleeNumber) {
    ctiObj.currentTransferTypeBack = '';
    changeHeaderStatus({
        phoneNumber: true, // 呼入/呼出号码
        hangUp: true, // 挂断
        holdOn: true, // 保持
        transfer: true, // 转接
        enquire: true, // 询问
        trilateral: true, // 三方
        evaluate: true, // 评价
        enquireStart: true, // 开始询问
        // enquireCancel:true,// 取消询问
        trilateralStart: true, // 开始三方
        // trilateralCancel:true,// 取消三方
    });
});

/**
 * 取消询问
 */
ctiObj.connection.on('AskCancel', function(callerNumber, calleeNumber) {
    ctiObj.currentTransferTypeBack = '';
    changeHeaderStatus({
        phoneNumber: true, // 呼入/呼出号码
        hangUp: true, // 挂断
        holdOn: true, // 保持
        transfer: true, // 转接
        enquire: true, // 询问
        trilateral: true, // 三方
        evaluate: true, // 评价
        enquireStart: true, // 开始询问
        // enquireCancel:true,// 取消询问
        trilateralStart: true, // 开始三方
        // trilateralCancel:true,// 取消三方
    });
});

/**
 * 确定询问
 *
 */
ctiObj.connection.on('AskTransfer', function(callerNumber, calleeNumber) {
    ctiObj.currentTransferTypeBack = '';
    ctiObj.currentTransferType = '';
    changeHeaderStatus({
        phoneNumber: true, // 呼入/呼出号码
        hangUp: true, // 挂断
        holdOn: true, // 保持
        transfer: true, // 转接
        enquire: true, // 询问
        trilateral: true, // 三方
        evaluate: true, // 评价
        enquireStart: true, // 开始询问
        // enquireCancel:true,// 取消询问
        trilateralStart: true, // 开始三方
        // trilateralCancel:true,// 取消三方
    });
});

/**
 * 回铃(回调)
 *
 * transferType [转接类型]
 * transferNumber [转接来源]
 *                [outbound 呼出回铃]
 *                [consult 询问回铃]
 *                [treeway 三方回铃]
 */
ctiObj.connection.on('RingBack', function(transferType, transferNumber) {
    ctiObj.currentTransferTypeBack = transferType;
    if (transferType == 'outbound') {
        $('#ringtone')[0].pause();
        //  window.open(ctiObj.popScreen,'_blank')
        changeHeaderStatus({
            hangUp: true, // 挂断
        });
    } else if (transferType == 'consult') {
        changeHeaderStatus({
            phoneNumber: true, // 呼入/呼出号码
            hangUp: true, // 挂断
            enquire: true, // 询问
            enquireCancel: true, // 取消询问
        });
    } else if (transferType == 'treeway') {
        changeHeaderStatus({
            phoneNumber: true, // 呼入/呼出号码
            hangUp: true, // 挂断
            // holdOn:true, // 保持
            trilateral: true, // 三方
            trilateralCancel: true, // 取消三方
        });
    } else {
    }
});

/**
 * 振铃(回调)
 *
 * custom [客户号码]
 * callType [类型 (0呼出 1呼入)]
 * transferType 空字符是正常呼入呼出振铃
 *               [blind 盲转(转接)]
 *               [consult 询问]
 *               [treeway 三方]
 *               [answered IP话机(自动应答)]
 * transferFrom [转接来源]
 * relayNumber  [中继号码(呼入判断来源)]
 */
ctiObj.connection.on('Ringing', function(
    custom,
    callType,
    transferType,
    transferFrom,
    relayNumber,
) {
    ctiObj.currentPhone = custom; // 手机号
    ctiObj.callType = callType; // 类型(0呼出1呼入)
    ctiObj.currentTransferType = transferType; // 转接类型(blind盲转，consult询问，treeway三方，answered IP话机(自动应答), “” 空字符是正常呼入呼出振铃)
    ctiObj.currentSeatPhone = transferFrom; // 坐席号码

    $('.header-phone-val').html(custom);
    if (transferType == 'treeway') {
        $('#ringtone')[0].play();
        changeHeaderStatus({
            phoneNumber: true, // 呼入/呼出号码
            hangUp: true, // 挂断
            trilateral: true, // 三方
        });
    } else if (transferType == 'consult') {
        $('#ringtone')[0].play();
        changeHeaderStatus({
            phoneNumber: true, // 呼入/呼出号码
            hangUp: true, // 挂断
            enquire: true, // 询问
        });
    } else {
        $('#ringtone')[0].play();
    }
});

// 坐席状态改变事件回调
ctiObj.connection.on('StatusChange', function(code) {
    window.parent.postMessage({
        cmd: 'changeCode',
        params: { code: code },
    });
    modifyState(code);
});

// 挂机事件处理
ctiObj.connection.on('Hangup', function() {
    initDefault();
    $('#ringtone')[0].pause();
    $('#ringbacktone')[0].play();
    changeHeaderStatus({
        checkOut: true, // 签出
        telephone: true, // 电话
        relayNumber: true, // 主叫号码
    });
});

// 中继号列表回调
ctiObj.connection.on('RelayList', function(list) {

    $('.relay-number-select').html('');
    for (i = 0; i < list.length; i++) {
        $('.relay-number-select').append(
            `<option value="${list[i].relayNumber}">${list[i].relayNumber}</option>`,
        );
    }
});

// 签入
function checkIn() {
    ctiObj.connection
        .invoke(
            'Login',
            ctiObj.cid,
            ctiObj.agent,
            ctiObj.dn.toString(),
            ctiObj.password.toString(),
        )
        .catch(function(err) {
            return console.error(err);
        });
}

// 应答
function answer() {
    ctiObj.connection.invoke('Answer').catch(function(err) {
        return console.error(err);
    });
    $('#ringtone')[0].pause();
}

// 签出
function checkOut() {
    ctiObj.connection.invoke('Logout').catch(function(err) {
        return console.error(err);
    });
}

// 保持
function holdOn() {
    ctiObj.connection.invoke('Hold').catch(function(err) {
        return console.error(err);
    });
}

// 取消保持
function holdOff() {
    ctiObj.connection.invoke('Unhold').catch(function(err) {
        return console.error(err);
    });
}

// 拨号
function callout(custom) {
    ctiObj.connection
        .invoke('Callout', ctiObj.callee, ctiObj.caller, custom)
        .catch(function(err) {
            return console.error(err);
        });
    $('.keyboard-header-input').val('');
}

// 开始转接
function transfer() {
    ctiObj.connection
        .invoke('Transfer', ctiObj.transferCallee, ctiObj.caller)
        .catch(function(err) {
            return console.error(err);
        });
    $('.transfer-input').val('');
}

// 开始询问
function askStart() {
    ctiObj.connection
        .invoke('AskStart', ctiObj.enquireCallee, ctiObj.caller)
        .catch(function(err) {
            return console.error(err);
        });
    $('.enquire-input').val('');
}

// 取消询问
function askCancel() {
    ctiObj.connection.invoke('AskCancel').catch(function(err) {
        return console.error(err);
    });
}

// 确定询问
function askTransfer() {
    ctiObj.connection.invoke('AskTransfer').catch(function(err) {
        return console.error(err);
    });
}

// 开始三方
function threeWayStart() {
    ctiObj.connection
        .invoke('ThreeWayStart', ctiObj.trilateralCallee, ctiObj.caller)
        .catch(function(err) {
            return console.error(err);
        });
    $('.trilateral-input').val('');
}

// 取消三方
function threeWayCancel() {
    ctiObj.connection.invoke('ThreeWayCancel').catch(function(err) {
        return console.error(err);
    });
}

// 空闲
function ready() {
    ctiObj.status = '1';
    ctiObj.connection.invoke('ChangeState', ctiObj.status).catch(function(err) {
        return console.error(err);
    });
}

// 小休
function rest() {
    ctiObj.status = '3';
    ctiObj.connection.invoke('ChangeState', ctiObj.status).catch(function(err) {
        return console.error(err);
    });
}

// 后处理
function dispose() {
    ctiObj.status = '7';
    ctiObj.connection.invoke('ChangeState', ctiObj.status).catch(function(err) {
        return console.error(err);
    });
}

// 忙碌
function busy() {
    ctiObj.status = '2';
    ctiObj.connection.invoke('ChangeState', ctiObj.status).catch(function(err) {
        return console.error(err);
    });
}

// 评价
function evaluate() {
    ctiObj.connection.invoke('Evaluate').catch(function(err) {
        return console.error(err);
    });
}

// 挂断
function hangUp() {
    ctiObj.connection.invoke('Hangup').catch(function(err) {
        return console.error(err);
    });
}

// 监控
$('.monitor').click(function() {
    monitoring();
});

// 签出
$('.check-out').click(function() {
    checkOut();
});

// 签入
$('.check-in').click(function() {
    checkIn();
});

//签出
$('.check-out').click(function() {
    checkOut();
});
// 拨打回车
$('.keyboard-header-input').keydown(function(e) {
    if (e.keyCode == 13) {
        $('.keyboard-footer').click();
    }
});
// 三方回车
$('.trilateral-input').keydown(function(e) {
    if (e.keyCode == 13) {
        $('.trilateral-call-start').click();
    }
});
// 转接回车
$('.transfer-input').keydown(function(e) {
    if (e.keyCode == 13) {
        $('.transfer-call').click();
    }
});
// 询问回车
$('.enquire-input').keydown(function(e) {
    if (e.keyCode == 13) {
        $('.enquire-call').click();
    }
});
// 拨号
$('.keyboard-footer').click(function() {
    let res = getPageSelectStatus({
        callee: true, // 主叫号码
    });
    if (res.code != 200) {
        alert(res.msg);
        return false;
    }
    $('#dtmf')[0].play();

    callout();
    $('.keyboard-box').css('display', 'none');
});

// 保持
$('.hold-on').click(function() {
    holdOn();
});

// 取消保持
$('.hold-off').click(function() {
    holdOff();
});

// 转接
$('.transfer-call').click(function() {
    let res = getPageSelectStatus({
        transferCallee: true, // 转接号码
    });
    if (res.code != 200) {
        alert(res.msg);
        return false;
    }
    transfer();
    $('.transfer-tabs').css('display', 'none');
});

// 开始询问
$('.enquire-call').click(function() {
    let res = getPageSelectStatus({
        enquireCallee: true, // 询问号码
    });
    if (res.code != 200) {
        alert(res.msg);
        return false;
    }
    askStart();
});

// 取消询问
$('.enquire-call-cancel').click(function() {
    $('.enquire-tabs').css('display', 'none');
    askCancel();
});

// 确定询问
$('.enquire-call-confirm').click(function() {
    $('.enquire-tabs').css('display', 'none');
    askTransfer();
});

//开始三方
$('.trilateral-call-start').click(function() {
    let res = getPageSelectStatus({
        trilateralCallee: true, // 三方号码
    });
    if (res.code != 200) {
        alert(res.msg);
        return false;
    }
    threeWayStart();
});

//取消三方
$('.trilateral-call-cancel').click(function() {
    $('.trilateral-tabs').css('display', 'none');
    threeWayCancel();
});

//邀请评价
$('.evaluate').click(function() {
    evaluate();
});

// 挂断
$('.ring-off').on('click', function() {
    $('#ringtone')[0].pause();
    // $("#ringbacktone")[0].play()
    hangUp();
    changeHeaderStatus({
        callNotification: false, // 来电通知
    });
});

//应答
$('.answer').on('click', function() {
    if (ctiObj.isWebrtc == 1) {
        webrtcAnswer();
    } else {
        answer();
    }
    changeHeaderStatus({
        callNotification: false, // 来电通知
    });
});

// 挂断
$('.hang-up').click(function() {
    // $("#ringbacktone")[0].play()

    hangUp();
});

// 隐藏页面弹框
function hidePagePopup() {
    $('.keyboard-box').css('display', 'none');
    $('.trilateral-tabs').attr('style', 'display:none;');
    $('.transfer-tabs').attr('style', 'display:none;');
    $('.enquire-tabs').attr('style', 'display:none;');
}

// 隐藏状态
function hidePhonePopup() {
    $('.phone-status').css('display', 'none');
}

// 获取更新页面选中的所有状态
function getPageSelectStatus(settings) {
    // 默认配置
    let defaultSetting = {
        caller: false, // 主叫号码
        callee: false, // 被叫号码
        trilateralCallee: false, // 三方号码
        enquireCallee: false, // 询问号码
        transferCallee: false, // 转接号码
    };
    $.extend(defaultSetting, settings);

    // 主叫号码

    ctiObj.caller = ($('.relay-number select')
        .find('option:selected')
        .val()
        ? $('.relay-number select')
              .find('option:selected')
              .val()
        : ''
    ).toString();
    // 被叫号码
    ctiObj.callee = settings.callee;
    //   ctiObj.callee = ($(".keyboard-header-input").val() ? $(".keyboard-header-input").val() : '').toString()
    // 三方号码
    ctiObj.trilateralCallee = ($('.trilateral-input').val()
        ? $('.trilateral-input').val()
        : ''
    ).toString();
    // 询问号码
    ctiObj.enquireCallee = ($('.enquire-input').val()
        ? $('.enquire-input').val()
        : ''
    ).toString();
    // 转接号码
    ctiObj.transferCallee = ($('.transfer-input').val()
        ? $('.transfer-input').val()
        : ''
    ).toString();

    if (defaultSetting.caller && ctiObj.caller == '') {
        return { code: 0, msg: '号码不能为空' };
    }
    if (defaultSetting.callee && ctiObj.callee == '') {
        return { code: 0, msg: '号码不能为空' };
    }
    if (defaultSetting.trilateralCallee && ctiObj.trilateralCallee == '') {
        return { code: 0, msg: '号码不能为空' };
    }
    if (defaultSetting.enquireCallee && ctiObj.enquireCallee == '') {
        return { code: 0, msg: '号码不能为空' };
    }
    if (defaultSetting.transferCallee && ctiObj.transferCallee == '') {
        return { code: 0, msg: '号码不能为空' };
    }
    return { code: 200, msg: '' };
}

// 手动更改状态
function changeModifyState(status) {
    let obj = {};
    $.each(statusList, function(key, item) {
        if (item.status == status) {
            obj = item;
        }
    });
    if (obj.func) {
        let func = obj.func;
        eval(func + '()');
    }
}

// 更改状态
function modifyState(status) {
    ctiObj.currentState = status;
    $('.header-status-right')
        .removeClass('phone-red')
        .removeClass('phone-red');

    let obj = {};
    $.each(statusList, function(key, item) {
        if (item.status == status) {
            obj = item;
        }
    });
    $('.header-status-right')
        .children('span')
        .eq(0)
        .text(obj.val);
    $('.header-status-right').addClass(obj.class);
    hidePagePopup();
    // 离线
    if (status == 0) {
        changeHeaderStatus({
            checkIn: true, // 签入
        });
    } else if (status == 1) {
        // 空闲
        $('#ringtone')[0].pause();
        changeHeaderStatus({
            checkOut: true, // 签出
            telephone: true, // 电话
            relayNumber: true, // 主叫号码
        });
    } else if (status == 2) {
        // 忙碌
        changeHeaderStatus({
            checkOut: true, // 签出
            telephone: true, // 电话
        });
    } else if (status == 3) {
        // 小休
        changeHeaderStatus({
            checkOut: true, // 签出
        });
    } else if (status == 4) {
        if (ctiObj.currentTransferType == 'answered') {
            // 振铃
            changeHeaderStatus({
                hangUp: true, // 挂断
            });
        } else {
            // 振铃
            changeHeaderStatus({
                callNotification: true, // 来电通知
                hangUp: true, // 挂断
            });
        }
    } else if (status == 5) {
        // 通话
        hidePhonePopup();

        $('#ringtone')[0].pause();
        // 判断是否为坐席呼入
        if (ctiObj.currentPhone.split('')[0] == 'C') {
            changeHeaderStatus({
                phoneNumber: true, // 呼入/呼出号码
                hangUp: true, // 挂断
                // holdOn:true, // 保持
            });
        } else if (['treeway'].indexOf(ctiObj.currentTransferTypeBack) != -1) {
            changeHeaderStatus({
                phoneNumber: true, // 呼入/呼出号码
                hangUp: true, // 挂断
                trilateral: true, // 三方
                enquireCancel: true, // 取消询问
                trilateralCancel: true, // 取消三方
            });
        } else if (['consult'].indexOf(ctiObj.currentTransferTypeBack) != -1) {
            changeHeaderStatus({
                phoneNumber: true, // 呼入/呼出号码
                hangUp: true, // 挂断
                enquire: true, // 询问
                enquireCancel: true, // 取消询问
                trilateralCancel: true, // 取消三方
            });
        } else if (
            ['consult', 'treeway'].indexOf(ctiObj.currentTransferType) != -1
        ) {
            changeHeaderStatus({
                phoneNumber: true, // 呼入/呼出号码
                hangUp: true, // 挂断
                enquireStart: true, // 开始询问
                trilateralStart: true, // 开始三方
            });
        } else {
            changeHeaderStatus({
                phoneNumber: true, // 呼入/呼出号码
                hangUp: true, // 挂断
                holdOn: true, // 保持
                transfer: true, // 转接
                enquire: true, // 询问
                trilateral: true, // 三方
                evaluate: true, // 评价
                enquireStart: true, // 开始询问
                trilateralStart: true, // 开始三方
            });
        }
    } else if (status == 6) {
        // 保持
        changeHeaderStatus({
            phoneNumber: true, // 呼入/呼出号码
            holdOff: true, // 解除保持
        });
    } else if (status == 7) {
        $('#ringtone')[0].pause();
        changeHeaderStatus({
            checkOut: true, // 签出
            telephone: true, // 电话
            relayNumber: true, // 主叫号码
        });
    }
}

modifyState('0');

// 更改头部页面状态
function changeHeaderStatus(settings) {
    // 默认配置
    let defaultSetting = {
        phoneNumber: false, // 呼入/呼出号码
        checkIn: false, // 签入
        checkOut: false, // 签出
        telephone: false, // 电话
        hangUp: false, // 挂断
        holdOn: false, // 保持
        holdOff: false, // 解除保持
        transfer: false, // 转接
        enquire: false, // 询问
        trilateral: false, // 三方
        evaluate: false, // 评价
        relayNumber: false, // 主叫号码
        callNotification: false, // 来电通知
        enquireStart: false, // 开始询问
        enquireCancel: false, // 取消询问
        trilateralStart: false, // 开始三方
        trilateralCancel: false, // 取消三方
    };
    $.extend(defaultSetting, settings);
    // 呼入/呼出号码
    defaultSetting.phoneNumber
        ? $('.phone-num').css('display', 'block')
        : $('.phone-num').css('display', 'none');
    // 签入
    defaultSetting.checkIn
        ? $('.check-in')
              .parent()
              .removeClass('header-item-non')
        : $('.check-in')
              .parent()
              .addClass('header-item-non');
    // 签出
    defaultSetting.checkOut
        ? $('.check-out')
              .parent()
              .removeClass('header-item-non')
        : $('.check-out')
              .parent()
              .addClass('header-item-non');
    // 电话
    defaultSetting.telephone
        ? $('.telephone')
              .parent()
              .removeClass('header-item-non')
        : $('.telephone')
              .parent()
              .addClass('header-item-non');
    // 挂断
    defaultSetting.hangUp
        ? $('.hang-up')
              .parent()
              .removeClass('header-item-non')
        : $('.hang-up')
              .parent()
              .addClass('header-item-non');
    // 保持
    defaultSetting.holdOn
        ? $('.hold-on')
              .parent()
              .removeClass('header-item-non')
        : $('.hold-on')
              .parent()
              .addClass('header-item-non');
    // 解除保持
    defaultSetting.holdOff
        ? $('.hold-off')
              .parent()
              .removeClass('header-item-non')
        : $('.hold-off')
              .parent()
              .addClass('header-item-non');
    // 转接
    defaultSetting.transfer
        ? $('.transfer')
              .parent()
              .removeClass('header-item-non')
        : $('.transfer')
              .parent()
              .addClass('header-item-non');
    // 询问
    defaultSetting.enquire
        ? $('.enquire')
              .parent()
              .removeClass('header-item-non')
        : $('.enquire')
              .parent()
              .addClass('header-item-non');

    // 三方
    defaultSetting.trilateral
        ? $('.trilateral')
              .parent()
              .removeClass('header-item-non')
        : $('.trilateral')
              .parent()
              .addClass('header-item-non');

    // 评价
    defaultSetting.evaluate
        ? $('.evaluate')
              .parent()
              .removeClass('header-item-non')
        : $('.evaluate')
              .parent()
              .addClass('header-item-non');
    // 主叫号码
    defaultSetting.relayNumber
        ? $('.relay-number')
              .parent()
              .removeClass('header-item-non')
        : $('.relay-number')
              .parent()
              .addClass('header-item-non');
    // 来电通知
    defaultSetting.callNotification
        ? $('.call-content').css('display', 'block')
        : $('.call-content').css('display', 'none');
    // 开始询问
    defaultSetting.enquireStart
        ? $('.enquire-start').css('display', 'block')
        : $('.enquire-start').css('display', 'none');
    // 取消询问
    defaultSetting.enquireCancel
        ? $('.enquire-cancel').css('display', 'block')
        : $('.enquire-cancel').css('display', 'none');
    // 开始三方
    defaultSetting.trilateralStart
        ? $('.trilateral-start').css('display', 'block')
        : $('.trilateral-start').css('display', 'none');
    // 取消三方
    defaultSetting.trilateralCancel
        ? $('.trilateral-cancel').css('display', 'block')
        : $('.trilateral-cancel').css('display', 'none');
}

//接受vue 组件传送的数据
window.addEventListener('message', function(e) {
    const { data } = e;

    switch (data.cmd) {
        case 'call':
            getPageSelectStatus({
                callee: data.params.mobile,
            });
            callout(data.params.id);
            break;
        default:
            return false;
    }
});
// 生成电话状态
let statusStr = '';
$.each(statusList, function(key, item) {
    if (item.show) {
        statusStr +=
            `<div data-val=` +
            item.status +
            `><span>` +
            item.val +
            `</span></div>`;
    }
});
$('.phone-status').append(statusStr);
