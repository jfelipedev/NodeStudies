import http from "node:http";
import { Transform } from "node:stream";

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;
    console.log(transformed);
    callback(null, Buffer.from(String(transformed)));
  }
}

const server = http.createServer(async(req, res) => {
    const buffers = []

    for await(const chunk of res){
        buffers.push(chunk)
    }

    const fullStremContent = Buffer.concat(buffers).toString()

    console.log(fullStremContent)

    return res.end(fullStremContent)


});

server.listen(3334);
