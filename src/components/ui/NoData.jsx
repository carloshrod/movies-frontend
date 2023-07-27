import { motion } from 'framer-motion';
import { variants } from '../../utils';
import { useGlobalContext } from '../../hooks';

function NoData({ noDataClass = '' }) {
	const { noDataMsg } = useGlobalContext();

	return (
		<motion.div
			className={`noData ${noDataClass}`}
			initial='scaleOut'
			animate='scaleIn'
			variants={variants}
		>
			{noDataMsg}
		</motion.div>
	);
}

export default NoData;
