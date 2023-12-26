const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
// express 앱으로 http 서버를 생성
const server = http.createServer(app);
// socket.io를 http 서버에 연결
const io = socketIO(server);
const PORT = 8000;

// 사용자 아이디 모음 객체
const userObjs = {};

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('chat');
})

// io.on(): socket 관련한 통신 작업을 처리
io.on('connection', (socket) => {
    // connection 이벤트는 클라이언트가 접속했을 때 발생
    // 콜백 함수의 인자로 소켓 객체를 제공

    // socket.id : 소켓 고유 아이디 (브라우저 탭 단위)
    console.log('서버 연결 완료 >', socket.id);

    // [실습 1]
    socket.on('hello', (data) => {
        // console.log(data);
        console.log(`${data.who} : ${data.msg}`);

        socket.emit('helloKR', { who: 'hello', msg: '안녕!' })
    })

    // [실습3] 채팅창 입장 안내 문구
    /**
     * 같은 채팅방이니까
        한쪽에 다른 유저가 접속하더라도
        다른쪽(다른 브라우저 탭)에도 나와야 할거에요
     */
    // emit() from server
    // - socket.emit(event_name, data): 해당 클라이언트에게만 이벤트, 데이터를 전송
    // - io.emit(event_name, data): 서버에 접속된 모든 클라이언트 전송
    // - io.to(소켓 아이디).emit(event_name, data): 소켓 아이디에 해당하는 클라이언트에게만 전송

    // 전체 클라이언트에게 입장 안내
    // io.emit('notice', `${socket.id} 님이 입장하셨습니다.`);

    // [실습4] 채팅창 메세지 전송
    socket.on('send', (data) => {
        console.log('send 이벤트로 받은 data >', data);
        // { id: '9TOKNefDwCFiHFZhAAAF', msg: '안녕', dm: ? }

        // [실습5] DM인지 아닌지 구분
        // dm: io.to(소켓아이디).emit() -> 소켓 아이디에 해당하는 클라이언트에게만 전송

        if (data.dm === 'all') {
            // "전체" 발송
            io.emit('newMessage', { id: data.id, msg: data.msg });
        } else {
            // "DM" 발송
            const dmSocketId = data.dm;
            const sendData = {
                id: data.id,
                msg: data.msg,
                dm: '(DM) ',
            }

            // dm을 받는 사람한테 메세지 갔음
            io.to(dmSocketId).emit('newMessage', sendData)
            // dm을 보낸 사람한테 자기자신의 메세지를 띄워줘야함
            socket.emit('newMessage', sendData);
        }
    })

    // [실습5] DM Step1
    socket.on('setUserList', (data) => {
        console.log(`유저 입장 : `, data.id);
        // 입장 전체 공지
        io.emit('notice', `${data.id} 님이 입장하셨습니다.`);

        // 전체 사용자 아이디 모음 객체 전달
        // 새로운 유저
        // {data.id : data.id}
        userObjs[data.id] = data.id;
        socket.emit('entrySuccess', socket.id); // 현재 입장한 사람에게 입장 완료
        io.emit('updateUsers', userObjs); // 전체 사용자에게 사용자 업데이트
    })
})

server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})