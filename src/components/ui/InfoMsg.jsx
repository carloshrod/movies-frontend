const InfoMsg = () => {
	return (
		<div>
			<i className='fa-solid fa-circle-exclamation' />
			Backend of this app is running on a render.com free instance, so it might
			be inactive. This will cause a delay in the response of the first request
			after a period of inactivity while the instance is up again.
			<i className='fa-solid fa-circle-exclamation' />
			<br />
			<div>Please try again in 30 seconds!</div>
		</div>
	);
};

export default InfoMsg;
