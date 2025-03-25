# n8n-mcp-server

A Model-Controller-Provider (MCP) server implementation for n8n workflow automation. This server provides a standardized interface for executing and managing n8n workflows through a JSON-RPC protocol.

## Features

- JSON-RPC 2.0 compliant API
- Workflow execution and management
- Environment-based configuration
- TypeScript support
- Comprehensive logging
- Docker support

## Prerequisites

- Node.js >= 14.0.0
- n8n instance running and accessible
- n8n API key

## Installation

1. Clone the repository:
```bash
git clone https://github.com/S17S17/n8n-mcp-server.git
cd n8n-mcp-server
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

## Configuration

The server can be configured through environment variables. See `.env.example` for all available options.

Required environment variables:
- `N8N_URL`: URL of your n8n instance API
- `N8N_API_KEY`: Your n8n API key
- `N8N_API_HEADER`: Header name for API key (default: X-N8N-API-KEY)

## Usage

### Starting the Server

Several startup options are available:

```bash
# Standard start
npm start

# Development mode with hot reload
npm run start:dev

# Simple mode (minimal features)
npm run start:simple

# Debug mode
npm run debug
```

### Docker Support

Build and run with Docker:

```bash
docker build -t n8n-mcp-server .
docker run -p 3000:3000 --env-file .env n8n-mcp-server
```

Or use Docker Compose:

```bash
docker-compose up
```

## API Documentation

The server implements a JSON-RPC 2.0 interface with the following methods:

- `initialize`: Initialize the server connection
- `shutdown`: Gracefully shutdown the server
- `listTools`: List available workflow tools
- `callTool`: Execute a specific workflow tool

See [API.md](API.md) for detailed API documentation.

## Development

### Building from Source

```bash
npm run build
```

### Running Tests

```bash
npm test
```

### Linting

```bash
npm run lint
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository.