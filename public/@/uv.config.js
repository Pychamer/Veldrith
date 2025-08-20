self.__uv$config = {
	prefix: '/@/space/',
	bare: '/baremux/',
	encodeUrl: Ultraviolet.codec.xor.encode,
	decodeUrl: Ultraviolet.codec.xor.decode,
	handler: '/@/uv.handler.js',
	client: '/@/uv.client.js',
	bundle: '/@/uv.bundle.js',
	config: '/@/uv.config.js',
	sw: '/@/uv.sw.js',
	// Enhanced configuration for gaming sites
	bypass: [
		// Allow WebSocket connections for games
		/^wss?:\/\//,
		// Allow now.gg and related gaming domains
		/^https?:\/\/(.*\.)?now\.gg/,
		/^https?:\/\/(.*\.)?roblox\.com/,
		/^https?:\/\/(.*\.)?robloxlabs\.com/,
		// Allow common game CDNs
		/^https?:\/\/(.*\.)?cloudflare\.com/,
		/^https?:\/\/(.*\.)?amazonaws\.com/
	]
};
