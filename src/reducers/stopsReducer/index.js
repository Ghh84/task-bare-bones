import { FETCHING_DATA, FETCHING_FAILED, FETCHING_SUCCESS,UPDATE_DATA } from '../../constants';

const initialState = {
	loading: false,
	data: {},
	error: '',
	columns : [
		{ refId:'time', path: 'realtimeDeparture', label: 'Departure Time' },
		{ refId:'delay',path: ['scheduledDeparture','realtimeDeparture'], label: 'Timing diff.' },
		{ refId:'dueIn', path: 'realtimeDeparture', label: 'Departure in' },
		{ refId:'desc',path: 'headsign', label: 'Destination' },
	  ],
};

const stopsReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCHING_DATA:
			return { loading: true, data: {}, error: '',columns:state.columns};
		case FETCHING_FAILED:
			return { loading: false, data: {}, error: action.payload,columns:"" };
		case FETCHING_SUCCESS:
			return { loading: false, data: action.payload, error: '',columns:state.columns };
		default:
			return state;
	}
};

export default stopsReducer;
