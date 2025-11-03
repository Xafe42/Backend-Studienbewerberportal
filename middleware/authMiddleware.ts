// Verifizieren von Token 

// Retrieve the token from the header or as a cookie
…
// If there is a token, verify it the with secret key
try {
var payload = jwt.verify(token, jwtKey)
} catch (e) {
// if the token is wrong, an exception is thrown
if (e instanceof jwt.JsonWebTokenError) {
// Not logged in, redirect to error page
}
// Do the action the user requested
…

// Token Erneuern

var payload
try {
payload = jwt.verify(token, jwtKey)
} catch (e) {
if (e instanceof jwt.JsonWebTokenError) {
return res.status(401).end()
}
return res.status(400).end()
}
const nowUnixSeconds = Math.round(Number(new Date()) / 1000)
if (payload.exp - nowUnixSeconds > 30) {
return res.status(400).end()
}
const newToken = jwt.sign({ username: payload.username }, jwtKey, {
algorithm: 'HS256',
expiresIn: jwtExpirySeconds
})