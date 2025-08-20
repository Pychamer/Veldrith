// Gaming-specific configuration for Veldrith proxy
// Handles now.gg, Roblox, and other gaming sites

const gamingConfig = {
	// Sites that need special handling
	gamingSites: [
		'now.gg',
		'roblox.com',
		'robloxlabs.com',
		'web.roblox.com',
		'www.roblox.com'
	],
	
	// User agents that work better with gaming sites
	gamingUserAgents: [
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/121.0',
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
	],
	
	// Transport preferences for gaming sites
	gamingTransports: {
		primary: 'Libcurl',
		fallback: 'Epoxy',
		options: {
			timeout: 30000,
			keepAlive: true,
			maxRedirects: 10,
			http2: true
		}
	},
	
	// Bypass patterns for sites that don't work well with proxy
	bypassPatterns: [
		/^https?:\/\/(.*\.)?now\.gg/,
		/^https?:\/\/(.*\.)?roblox\.com/,
		/^wss?:\/\//,
		/^https?:\/\/(.*\.)?cloudflare\.com/
	]
};

// Function to check if a URL is a gaming site
function isGamingSite(url) {
	return gamingConfig.gamingSites.some(site => url.includes(site));
}

// Function to get optimal transport for gaming sites
function getGamingTransport() {
	return localStorage.getItem('dropdown-selected-text-transport') || gamingConfig.gamingTransports.primary;
}

// Function to apply gaming-specific headers
function applyGamingHeaders(headers = {}) {
	const gamingHeaders = {
		'User-Agent': gamingConfig.gamingUserAgents[0],
		'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
		'Accept-Language': 'en-US,en;q=0.5',
		'Accept-Encoding': 'gzip, deflate, br',
		'DNT': '1',
		'Connection': 'keep-alive',
		'Upgrade-Insecure-Requests': '1',
		'Sec-Fetch-Dest': 'document',
		'Sec-Fetch-Mode': 'navigate',
		'Sec-Fetch-Site': 'none',
		'Sec-Fetch-User': '?1',
		'Cache-Control': 'max-age=0'
	};
	
	return { ...gamingHeaders, ...headers };
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
	module.exports = { gamingConfig, isGamingSite, getGamingTransport, applyGamingHeaders };
} else {
	window.gamingConfig = { gamingConfig, isGamingSite, getGamingTransport, applyGamingHeaders };
}