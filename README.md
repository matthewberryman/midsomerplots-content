# MidsomerPlots content
This is a Midsomer Murders plot generator, available as a Node.js package and as an open web API, as used in the [@midsomerplots](https://twitter.com/midsomerplots) Twitter bot ([code](https://github.com/matthewberryman/midsomerplots)) and [Alexa skill](https://www.amazon.com/Across-the-Cloud-Pty-Ltd/dp/B07K87CPPQ) ([code](https://github.com/matthewberryman/midsomerplots-Alexa))

# Use as a Node.js module:

```javascript
const midsomerplots = require('midsomerplots-content');

// need to pass a seed = an integer, here just the time
midsomerplots.generate(Math.round((new Date()).getTime()/1000));
```

# Web API

```shell
curl "https://midsomerplots.acrossthecloud.net/plot?seed=n"
```
for some 32-bit integer n (if ommitted, will default to current Unix time in seconds)

Example response:
```json
{
  "plot": "A misunderstood Scottish flight attendant is found killed in a model village and tied down like Gulliver in Lilliput. Suspicion falls on Upton Snodsbury’s real ale appreciation society, confused that the local date night might threaten to reveal that due to an off-by-one error, the meaning of life is actually 43.",
  "seed": 13
}
```
Alternatively, a maximum character limit may be passed:
```shell
curl "https://midsomerplots.acrossthecloud.net/plot?characterLimit=200"
```
Note that this is incompatible with the seed querystring parameter, and for low numbers introduces a delay or even the possibility of a timeout (after 30s) while it finds a short enough plot at random.

