var constraints = { audio: true, video: { faceMode: 'user' } };
var ctiWebrtc = {};
ctiWebrtc.remote_session;
ctiWebrtc.service = 'cti-test.ukayun.com';
ctiWebrtc.answer = 'cti-test.ukayun.com';
ctiWebrtc.me_uri_joint = '';
ctiWebrtc.contact_uri = '';
ctiWebrtc.ws_uri = '';
ctiWebrtc.socket = '';
ctiWebrtc.configuration = '';
ctiWebrtc.sip = '';
ctiWebrtc.session = '';

var audio = new Audio(); //音频播放

// 注册话机
function registerWebrtc() {
    ctiWebrtc.me_uri_joint =
        'sip:' + ctiObj.webrtc_exten + '@' + ctiWebrtc.service;

    ctiWebrtc.contact_uri = ctiWebrtc.me_uri_joint + ';transport=ws';

    ctiWebrtc.ws_uri = 'wss://' + ctiWebrtc.service + ':7443';

    //   创建websocket
    ctiWebrtc.socket = new JsSIP.WebSocketInterface(ctiWebrtc.ws_uri);
    //  配置参数
    ctiWebrtc.configuration = {
        sockets: [ctiWebrtc.socket],
        // outbound_proxy_set: ctiWebrtc.ws_uri,
        uri: ctiWebrtc.me_uri_joint,
        password: ctiObj.webrtc_password,
        register: true, //指示JsSIP用户代理是否应在启动时自动注册
        contact_uri: ctiWebrtc.contact_uri,
        ws_servers: ctiWebrtc.ws_uri,
        //session_timers: false  //启用会话定时器,默认值是true。
    };
    //   return
    ctiWebrtc.sip = new JsSIP.UA(ctiWebrtc.configuration);
    // 关闭调试
    JsSIP.debug.disable('*');
    // 打开调试
    // JsSIP.debug.enable('JsSIP:*');
    ctiWebrtc.sip.on('newRTCSession', function(data) {
        ctiWebrtc.session = data.session;
        // 呼入处理
        if (data.originator === 'remote') {
            ctiWebrtc.remote_session = data.session;
        }
        // 建立连接
        ctiWebrtc.session.on('peerconnection', function(data) {
            data.peerconnection.onaddstream = function(ev) {
                audio.srcObject = ev.stream;
                audio.play();
            };
        });
        // 信令协商
        ctiWebrtc.session.on('sdp', function(e) {
            //e.sdp = e.sdp.replace('a=candidate.*', '');
            if (e.originator === 'local') {
                e.sdp = e.sdp.replace(/a=candidate.*\.local .*/, '');
            }
        });
        // 振铃
        ctiWebrtc.session.on('progress', function(data) {
            webrtcAnswer();
        });
        // 结束
        ctiWebrtc.session.on('ended', function(data) {
            ctiWebrtc.remote_session = '';
        });
        // ICE处理
        ctiWebrtc.session.on('icecandidate', function(e) {

        });
    });
    // 注册
    ctiWebrtc.sip.on('registered', function(e) {

    });
    // 注册失败
    ctiWebrtc.sip.on('registrationFailed', function(e) {

    });

    ctiWebrtc.sip.start();
}

// 应答
function webrtcAnswer() {
    ctiWebrtc.remote_session.answer({
        mediaConstraints: constraints,
        mediaStream: null,
        pcConfig: {
            iceServers: [{ urls: 'stun:' + ctiWebrtc.answer }],
        },
    });
}
