### Instructions for a short programming task

- Make a `React-based` web application to see the next buses arriving at _Rautatieasema_.
- There is a plus if the application is implemented also using `Redux`.
- The application should show all relevant information to the passenger.
- No relevant information can be skipped out
- Interface should be simple and only important fields should be displayed.

**Endpoints** - [source:](https://digitransit.fi/en/developers/apis/1-routing-api/stops)

The routing API for Helsinki region is available at:

- https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql

### API requirements

When sending queries, there are some things you should be aware of:

- The HTTP method must be **POST**
- You will get a HTTP 405 error when / if using other methods.
- Content-Type must be either `application/graphql` or `application/json` (In our case the **second one**)
- You will get a HTTP 415 Error if this header is not present.

### Implementation barebone

```javascript
const url = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';
const query = `{
  stop(id: "HSL:1020453") {
   name
   	stoptimesWithoutPatterns {
        serviceDay
        scheduledArrival
        headsign
        trip {
          route {
            shortName
            agency {
              name
            }
          }
          wheelchairAccessible
          bikesAllowed
        }
        
      } 
  }  
}`;

const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/json',
	},
	body: JSON.stringify({
		query,
	}),
};

fetch(url, options)
	.then((res) => res.json())
	.then((data) => console.log(data));
```

##### Response Data

```json
{
	"data": {
		"stop": {
			"name": "Rautatieasema",
			"stoptimesWithoutPatterns": [
				{
					"headsign": "Meilahti via Kallio",
					"serviceDay": 1618261200,
					"scheduledArrival": 36660,
					"scheduledDeparture": 36660,
					"trip": {
						"route": {
							"shortName": "3",
							"agency": {
								"name": "Helsingin seudun liikenne"
							}
						},
						"wheelchairAccessible": "POSSIBLE",
						"bikesAllowed": "NOT_ALLOWED"
					}
				},
				{
					"headsign": "Tikkurila"
					// so on and so forth
				}
			]
		}
	}
}
```

**Note:** This is a routing API implemented using `GraphQL` but it is enough using the `REST API` approach.
