class BinaryProtocolParser {
    constructor (buffer) {
        this.buffer = buffer;
        this.offset = 0;
        this.view = new DataView(buffer);

    }
    readUInt8(){
        const value = this.view.getUint8(this.offset);
        this.offset += 1;
        return value;
    }
    readUInt32() {
        const value = this.view.getUint32(this.offset,true);
        this.offset += 4;
        return value;
    }

    readFloat () {
        const value = this.view.getFloat32(this.offset, true);
        this.offset += 4;
        return value;
    }

    readString(length) {
        const chars = [];
        for (let i = 0; i <length; i++) {
         chars.push(String.fromCharCode(this.readUInt8()));
        }
        return chars.join('');
    }

    parse() {
        const type = this.readUInt8();

        switch (type) {
            case 0x01:
                return {
                    type: "temperature",
                    value: this.readFloat(),
                    Timestamp: this.readUInt32()
                };
                case 0x02:
                    return {
                        type: "status",
                        code: this.readUInt8(),
                        message: this.readString(20)
                    };
                    default:
                        throw new Error('Unknown packet type');
        }
    }
}

const buffer = new ArrayBuffer(29);
const parser = new BinaryProtocolParser(buffer);
const packet = parser.parse();