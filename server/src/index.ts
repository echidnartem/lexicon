import { createServer } from "node:http";

const port = Number(process.env.PORT ?? 4000);

const server = createServer((_request, response) => {
  response.writeHead(204);
  response.end();
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
