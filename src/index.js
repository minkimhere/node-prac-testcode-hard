class Sensor {
    constructor(id) {
        this.id = id;
        this.powerStatus = 'off';
        this.status = '';
        this.reportingInterval = 10000;
    }

    turn(onOff) {
        if (onOff === 'on' && this.powerStatus === 'on') {
            return new error('에러입니다.');
        } else if (onOff === 'on') {
            this.powerStatus = 'on';
            this.status = 'idle';
            setTimeout(() => {
                this.status = 'sensingDistance';
            }, this.reportingInterval);
            setTimeout(() => {
                this.status = 'reportingData';
            }, this.reportingInterval + 500);
            setTimeout(() => {
                this.status = 'idle';
            }, this.reportingInterval + 500 + 1000);
        } else if (onOff === 'off') {
            this.powerStatus = 'off';
            this.status = '';
            setTimeout(() => {
                this.status = '';
            }, this.reportingInterval);
        }
    }
}

class IotServer {
    constructor() {
        this.iotServer = [];
    }

    start([sensor]) {
        // 센서 추가
        this.iotServer.push(sensor);
    }

    publish(server) {
        const { deviceId, actionId, payload } = server;
        for (let sensorElement of this.iotServer) {
            // CHANGE_REPORTING_INTERVAL 액션이 발생
            if (sensorElement.powerStatus === 'on' && server.actionId === 'CHANGE_REPORTING_INTERVAL') {
                sensorElement.reportingInterval = server.payload;
            }
        }
    }
}

module.exports = {
    Sensor,
    IotServer,
};

// Test9, 10 아이디어 노트-------------------------------------------------------
// 서버가 Array안에 들어있으니 Array 돌아주기 (서버가 더 추가될 수 있나?)
// 센서의 actionId가 'CHANGE_REPORTING_INTERVAL'일 때
// this.server의 reportingInterval을 payload로 변경
// * 같은 id 조건을 추가했었으나, 센서 아이디 === 서버 디바이스 아이디가 동일해야한다는 조건이 없으므로 삭제함
// sensorElement.id === server.deviceId &&

// this.server의 powerStatus가 on 일 때만으로 해서 off일 때는 10000 그대로이게 함
