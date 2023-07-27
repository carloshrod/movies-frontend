import { motion } from 'framer-motion';
import { variants } from '../../utils';
import { useGlobalContext } from '../../hooks';

function NoData() {
	const {
		noData: { msg, state },
	} = useGlobalContext();

	return (
		<motion.div
			className={`noData noData--${state}`}
			initial='scaleOut'
			animate='scaleIn'
			variants={variants}
		>
			<span>
				{msg}
				{state === 'error' && (
					<>
						<br />
						Please try it later!
					</>
				)}
			</span>
		</motion.div>
	);
}

export default NoData;
