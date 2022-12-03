import loader from "../../assets/icons/loader-animated.svg"
export default function Loader({trigger, customStyles}) {

	return <>
		{
			trigger
			? <div style={{...customStyles}}>
				<img src={loader} alt="loader" />
			</div>
			: null
		}
	</>
}