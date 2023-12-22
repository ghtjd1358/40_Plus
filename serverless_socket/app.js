const WebSocket = require("ws");
const AWS = require("aws-sdk");

const lambda = new AWS.Lambda({
  region: "ap-northeast-2", // Lambda 함수가 속한 리전으로 변경
  accessKeyId: "AKIA2SP45FJULY6JEDXI",
  secretAccessKey: "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",
});

const WebSocketURL =
  "wss://q2ggee9bte.execute-api.ap-northeast-2.amazonaws.com/dev/"; // AWS API Gateway WebSocket API의 엔드포인트로 변경

// WebSocket 연결 생성
const ws = new WebSocket(WebSocketURL);

ws.on("open", () => {
  console.log("WebSocket connection opened");

  // Connect 이벤트 시뮬레이션
  lambda.invoke(
    {
      FunctionName:
        "websocket-api-chat-app-tuto-ConnectHandler2FFD52D8-KzMHDG4oMYNn", // Connect 핸들러를 실행하는 Lambda 함수 이름으로 변경
      InvocationType: "Event",
      Payload: JSON.stringify({
        requestContext: {
          connectionId: "your-connection-id", // 임의의 connectionId 값을 사용하거나, 실제로 저장된 connectionId 값을 사용
        },
      }),
    },
    (err, data) => {
      if (err) {
        console.error("Error calling Connect Lambda function:", err);
      } else {
        console.log("Connect Lambda function called successfully:", data);

        // SendMessage 이벤트 시뮬레이션
        const messageData = {
          action: "sendmessage",
          message: "Hello from the JavaScript code!",
        };

        lambda.invoke(
          {
            FunctionName:
              "websocket-api-chat-app-tu-SendMessageHandlerDCEABF-DI3lX25xweCl", // SendMessage 핸들러를 실행하는 Lambda 함수 이름으로 변경
            InvocationType: "Event",
            Payload: JSON.stringify(messageData),
          },
          (err, data) => {
            if (err) {
              console.error("Error calling SendMessage Lambda function:", err);
            } else {
              console.log(
                "SendMessage Lambda function called successfully:",
                data
              );
            }
          }
        );
      }
    }
  );
});

ws.on("message", (data) => {
  console.log("Received message from server:", data);
});

ws.on("close", () => {
  console.log("WebSocket connection closed");
});
