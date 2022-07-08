import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchingData, fetchingFailed, fetchingSuccess } from '../../actions'
import Table from './tableComponent/table'
/** =====================================================================
 *  Feel free to change anything you wish as well as using
 *  Classes instead of Functional Components.
 *
 *  More info on README.md file
 *  Doubts? <vinicius@choicely.com>
 *  ======================================================================= */
const url = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql'
const query = `{
  stop(id: "HSL:1020453") {
   name
   stoptimesWithoutPatterns(numberOfDepartures: 8) {
	stop {
		gtfsId
		platformCode
	}
	    serviceDay 
		realtimeDeparture 
	    scheduledArrival
	    scheduledDeparture
	    headsign
             
      } 
  }  

}`
const options = {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify({
    query,
  }),
}
const Stops = (props) => {
  const { stops, fetchData, fetchFailed, fetchSuccess } = props
  const { data, loading, error, columns } = stops

  useEffect(() => {
    fetchData()
    setInterval(() => {
      fetch(url, options)
        .then((res) => res.json())
        .then((data) => fetchSuccess(data))
        .catch((e) => fetchFailed(e.message))
    }, 5000)
  }, [fetchData, fetchFailed, fetchSuccess])
  return (
    <div id="div">
      {error && <span>{error}</span>}
      {loading && <span>Loading ...</span>}
      {data && data.stoptimesWithoutPatterns && (
        <div>
          {data.name}
          <div>
            {new Date(
              data.stoptimesWithoutPatterns[0].serviceDay * 1000,
            ).toLocaleDateString('en-US', {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
            <div>
              <span>
                Stop Id:
                <span id="span1">
                  {''}
                  {data.stoptimesWithoutPatterns[0].stop.gtfsId}
                </span>
              </span>
              <span id="span">
                Platform:
                <span id="span1">
                  {data.stoptimesWithoutPatterns[0].stop.platformCode}
                </span>
              </span>
            </div>
          </div>
          <Table columns={columns} data={data.stoptimesWithoutPatterns} />
        </div>
      )}
    </div>
  )
}
Stops.protoTypes = {
  data: PropTypes.object,
  fetchData: PropTypes.func,
  fetchFailed: PropTypes.func,
  fetchSuccess: PropTypes.func,
}
function mapStateToProps(state) {
  const { stops } = state
  return {
    stops,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    fetchData: () => {
      dispatch(fetchingData())
    },
    fetchFailed: (error) => {
      dispatch(fetchingFailed(error))
    },
    fetchSuccess: (data) => {
      dispatch(fetchingSuccess(data))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Stops)
