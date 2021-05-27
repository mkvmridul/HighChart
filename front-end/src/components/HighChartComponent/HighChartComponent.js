import {useEffect, useState} from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { Box, Container } from '@material-ui/core';
import axios from 'axios';
import Alert from "@material-ui/lab/Alert";


function HighChartComponent(props) {
	const [channelName, setChannelName] = useState([]);
	const [views, setViews] = useState([]);
	const [spentInUsd, setSpentInUsd] = useState([]);
	const [error, setError] = useState(false);

	useEffect(()=>{
		axios.get(
			`${props.baseUrl}/api/advertisement `,
			{
				headers: {
				"Accept": "application/json",
				}
			}).then(res => {
						// console.log(res.data.advertisements);
						setViews(res.data.views);
						setChannelName(res.data.channelName);
						setSpentInUsd(res.data.spentInUsd);
			}).catch(error => {
					console.log(error.message);
					setError(error.message);
					if(error.response) setError(error.response.data.msg);
			});
		},
	[]);


	const channelViews = {
	title: {
		text: 'channel vs views'
	},
	xAxis: {
		categories: channelName && channelName,
	},
	yAxis: {
		title: {
			text: 'Views'
		}
	},
	series: [{
		data: views && views
	}]
	}

	const channelSpent = {
	title: {
		text: 'channel vs usd Spent'
	},
	xAxis: {
		categories: channelName && channelName,
	},
	yAxis: {
		title: {
			text: 'Channel'
		}
	},
	series: [{
		data:  spentInUsd && spentInUsd
	}]
	}

	console.log({spentInUsd, views, channelName})

	return (
		<Box>
			{error && (
				<Alert  severity="error">{error}</Alert>
			)}
			<br /><br /><br />
			{ spentInUsd && views && (<Container>
				<HighchartsReact
					highcharts={Highcharts}
					options={channelViews}
				/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<HighchartsReact
					highcharts={Highcharts}
					options={channelSpent}
				/>
			</Container>)}
		</Box>
	);
}

export default HighChartComponent;