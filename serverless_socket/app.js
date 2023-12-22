const WebSocket = require("ws");
const AWS = require("aws-sdk");

const lambda = new AWS.Lambda({
  region: "ap-northeast-2", // Lambda 함수가 속한 리전으로 변경
  accessKeyId: "AKIA2SP45FJUHMQHHHPU",
  secretAccessKey: "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",
});

const WebSocketURL =
  "wss://plkcqxmi24.execute-api.ap-northeast-2.amazonaws.com/dev/"; // AWS API Gateway WebSocket API의 엔드포인트로 변경

const connectHandler =
  "websocket-api-chat-app-tuto-ConnectHandler2FFD52D8-6cMbnVsnSYRc";
const sendmessageHandler =
  "websocket-api-chat-app-tu-SendMessageHandlerDCEABF-1jeF26CMsVwg";
const disconnectHandler =
  "websocket-api-chat-app-tu-DisconnectHandlerCB7ED6F-LshTNgmzkCUu";

// WebSocket 연결 생성
let ws;

// 홈페이지 구성
const express = require("express");
const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
  console.log("메인홈페이지 입장");

  // WebSocket 연결 생성 (처음 한 번만)
  if (!ws) {
    ws = new WebSocket(WebSocketURL);

    ws.on("open", () => {
      console.log("WebSocket connection opened");

      // Connect 이벤트 시뮬레이션
      lambda.invoke(
        {
          FunctionName: connectHandler,
          InvocationType: "RequestResponse", // 동기 호출
        },
        (err, data) => {
          if (err) {
            console.error("Error calling Connect Lambda function:", err);
          } else {
            console.log("Lambda response:", data);
            console.log("lambda payload > ", data.Payload);
          }
        }
      );
    });

    ws.on("message", (data) => {
      console.log("Received message from server:", data);
    });

    ws.on("close", () => {
      console.log("WebSocket connection closed");
      ws = null; // 연결이 종료되면 ws 객체 초기화
    });
  }

  res.render("index");
});

// 채팅방 떠나기
app.get("/leave", (req, res) => {
  if (ws) {
    console.log("disconnect handler on");
    lambda.invoke(
      {
        FunctionName: disconnectHandler,
        InvocationType: "Event",
        Payload: JSON.stringify({
          requestContext: {
            connectionId: "your-connection-id", // 현재 연결된 WebSocket의 connectionId 값을 사용
          },
        }),
      },
      (err, data) => {
        if (err) {
          console.error("Error calling Disconnect Lambda function:", err);
        } else {
          console.log("Disconnect Lambda function called successfully:", data);

          // WebSocket 연결 종료
          ws.close();
        }
      }
    );
  }
  res.render("leave");
});

app.listen(PORT, function () {
  console.log("server open");
});
