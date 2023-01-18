import { useMoviesContext } from "../context/MoviesContext";

function NoData({ noDataClass }) {
    const { noDataMsg } = useMoviesContext();

    return (
        <div className={`noData ${noDataClass}`}>
            {noDataMsg}
        </div>
    )
}

export default NoData;