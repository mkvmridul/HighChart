import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core';
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import { useState } from "react";


const useStyles = makeStyles({
	field: {
		width: "100%",
		fontSize: "1rem",
	}
});


function AdvertisementForm(props) {
	const classes = useStyles();
	const [channelName, setChannelName] = useState("");
	const [views, setViews] = useState("");
	const [spentInUsd, setSpentInUsd] = useState("");
	const [error, setError] = useState(false);


	const submitForm= () =>{
		if (channelName.length > 0 && views.length > 0 && spentInUsd.length > 0) {
		axios.post(
			`${props.baseUrl}/api/advertisement`,{
					channelName, views, spentInUsd,
				},
			{
				headers: {
				"Accept": "application/json",
				}
			}).then(res => {
				console.log(res);
				window.location.href = '/';
			}).catch(error => {
				console.log(error.message);
				setError(error.message);
				if(error.response) setError(error.response.data.msg);
			});
		}else{
			setError('All fields are required');
		}
	}

	return (
		<Box mb={5}>
			{error && (
				<Alert  severity="error">{error}</Alert>
			)}
			<br /><br /><br />
			<Container maxWidth="sm">
					<FormControl className={classes.field}>
						<InputLabel id="channel name">channel Name</InputLabel>
						<Select
						labelId="channel name"
						id="channel-name"
						value={channelName}
						onChange={(e) => setChannelName(e.target.value)}
						>
						<MenuItem value="facebook">Facebook</MenuItem>
						<MenuItem value="google">Google</MenuItem>
						<MenuItem value="youtube">YouTube</MenuItem>
						<MenuItem value="instagram">Instagram</MenuItem>
						</Select>
					</FormControl>
					<br />
					<br />
					<br />
					<TextField 
					aria-label="enter views" 
					className={classes.field} 
					name="views"
					value={views}
					onChange={(e) => setViews(e.target.value)}
					rowsMin={3} placeholder="enter views" 
					required
					/>
					<br />
					<br />
					<br />
					<TextField 
					aria-label="Enter your spent in USD" 
					className={classes.field} 
					name="spentInUsd"
					value={spentInUsd}
					onChange={(e) => setSpentInUsd(e.target.value)}
					rowsMin={3} placeholder="Enter your spent in USD"
					required
					 />
					<br />
					<br />
					<br />
					<Button
						variant="contained"
						onClick={submitForm}
					>
						Submit
					</Button>
			</Container>
		</Box>
	);
}

export default AdvertisementForm;