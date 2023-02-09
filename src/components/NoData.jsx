import { useMoviesContext } from "../context/MoviesContext";
import { motion } from "framer-motion"
import { variants } from '../utils';

function NoData({ noDataClass }) {
    const { noDataMsg } = useMoviesContext();

    return (
        <motion.div
            className={`noData ${noDataClass}`}
            initial="scaleOut"
            animate="scaleIn"
            variants={variants}
        >
            {noDataMsg}
        </motion.div>
    )
}

export default NoData;