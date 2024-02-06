let api

if (process.env.NODE_ENV === "development") {
	api = "https://api-backend.devasmriti.com"
}
else if (process.env.REACT_APP_BUILD && process.env.REACT_APP_BUILD.trim() === "staging") {
	api = "https://api-backend.devasmriti.com"
}
else {
	api = "https://api-backend.devasmriti.com"
}
api = 'https://api-backend.devasmriti.com'

export default api
