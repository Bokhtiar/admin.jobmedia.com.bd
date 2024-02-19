import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NetworkServices } from "../../network";
import { networkErrorHandeller } from "../../utils/helper";
import { Toastify } from "../../components/toastify";
import DataTable from "react-data-table-component";

export const DivisionList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);

    const columns = [
        {
            name: 'Division Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: "Action",
            cell: (row) => (
                <div className="flex gap-1">
                    <Link to={`/dashboard/division/edit/${row.id}`}>
                        <span className="bg-green-500 text-white btn btn-sm material-symbols-outlined">
                            edit
                        </span>
                    </Link>

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
                const response = await NetworkServices.Division.index();
                console.log("response dvision", response);
                if (response && response.status === 200) {
                    setData(response?.data);
                    // setTotalRows(response?.data?.paginate?.total_items);
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

    // pagination daynamic use then pass 1 fetchdata
    // useEffect(() => {
    //     fetchData(1);
    // }, []);

    useEffect(() => {
        fetchData();
    }, []);

    /* handle paginate page change */
    const handlePageChange = (page) => fetchData(page);

    /* handle paginate row change */
    const handlePerRowsChange = async (newPerPage, page) => {
        setLoading(true);
        const response = await NetworkServices.Division.index({
            page,
            limit: newPerPage,
        });
        setData(response.data.data);
        setPerPage(newPerPage);
        setLoading(false);
    };

    /* destory */
    const destroy = async (id) => {
        try {
            const response = await NetworkServices.Division.destroy(id)
            console.log("response", response);
            if (response.status === 204) {
                fetchData()
                return Toastify.Info("Division deleted")
            }
        } catch (error) {
            networkErrorHandeller(error)
        }
    }

    return <section>
        <div className="flex justify-between shadow-md p-4 px-6 rounded-md">
            <h2 className=" font-semibold text-xl">Division List</h2>
            <Link to="/dashboard/division/create">
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
