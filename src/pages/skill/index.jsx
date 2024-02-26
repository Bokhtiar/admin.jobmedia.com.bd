import { Link } from "react-router-dom";
import { NetworkServices } from "../../network";
import DataTable from "react-data-table-component";
import { Toastify } from "../../components/toastify";
import { useCallback, useEffect, useState } from "react";
import { networkErrorHandeller } from "../../utils/helper";

export const SkillList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);

    const columns = [
        {
            name: 'Skill Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: "Action",
            cell: (row) => (
                <div className="flex gap-1">
                    {/* <Link to={`/dashboard/skill/edit/${row.id}`}>
                        <span className="bg-green-500 text-white btn btn-sm material-symbols-outlined">
                            edit
                        </span>
                    </Link> */}

                    <span onClick={() => destroy(row.id)}>
                        <span className="bg-red-500 text-white btn btn-sm material-symbols-outlined">
                            delete
                        </span>
                    </span>
                </div>
            ),
        },
    ];

    /* Fetch data */
    const fetchData = useCallback(
        async (page) => {
            try {
                setLoading(true);
                const response = await NetworkServices.Skill.index();
                console.log("response skll", response);
                if (response && response.status === 200) {
                    setData(response?.data?.results);
                    //setTotalRows(response?.data?.paginate?.total_items);
                }
                setLoading(false);
            } catch (error) {
                if (error) {
                    setLoading(false);
                    networkErrorHandeller(error);
                }
            }
        },
        [perPage]
    );

    useEffect(() => {
        fetchData();
    }, []);

    // /* handle paginate page change */
    // const handlePageChange = (page) => fetchData(page);

    // /* handle paginate row change */
    // const handlePerRowsChange = async (newPerPage, page) => {
    //     setLoading(true);
    //     const response = await NetworkServices.Skill.index({
    //         page,
    //         limit: newPerPage,
    //     });
    //     setData(response.data.data);
    //     setPerPage(newPerPage);
    //     setLoading(false);
    // };

    /* destory */
    const destroy = async (id) => {
        try {
            const response = await NetworkServices.Skill.destroy(id)
            if (response.status === 204) {
                fetchData()
                return Toastify.Info("Skill Deleted")
            }
        } catch (error) {
            networkErrorHandeller(error)
        }
    }

    return <section>
        <div className="flex justify-between shadow-md p-4 px-6 rounded-md bg-white mb-3">
            <h2 className=" font-semibold text-xl">Skill List</h2>
            <Link to="/dashboard/skill/create">
                <span class="border border-green-500 rounded-full material-symbols-outlined p-1">
                    add
                </span>
            </Link>
        </div>
        <DataTable
            columns={columns}
            data={data}
            progressPending={loading}
            pagination
            // paginationServer
            // paginationTotalRows={totalRows}
            // onChangeRowsPerPage={handlePerRowsChange}
            // onChangePage={handlePageChange}
        />
    </section>
}
