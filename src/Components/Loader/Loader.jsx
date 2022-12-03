import loader from "../../assets/icons/loader-animated.svg"
export default function Loader({trigger}) {

	return <>
		{
			trigger
			? <div>
				<img src={loader} alt="loader" />
			</div>
			: null
		}
	</>
}