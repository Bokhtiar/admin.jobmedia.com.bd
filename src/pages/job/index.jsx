import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NetworkServices } from "../../network";
import { networkErrorHandeller } from "../../utils/helper";
import { Toastify } from "../../components/toastify";
import DataTable from "react-data-table-component";

export const JobList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);

    const columns = [
        {
            name: 'Reference id',
            selector: row => row.reference_id,
            sortable: true,
        },
        {
            name: 'Organization name',
            selector: row => row.organization_name,
            sortable: true,
        },
        {
            name: 'Job position',
            selector: row => row.job_position,
            sortable: true,
        }, 
        {
            name: 'Circular date',
            selector: row => row.circular_date,
            sortable: true,
        },
        {
            name: 'Application start',
            selector: row => row.application_start,
            sortable: true,
        },
        {
            name: 'Application end',
            selector: row => row.application_end,
            sortable: true,
        },
        {
            name: "Action",
            cell: (row) => (
                <div className="flex gap-1">
                    <span>
                        <span className=" btn btn-sm material-symbols-outlined">
                            visibility
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
                const response = await NetworkServices.Job.index({
                    page,
                    limit: perPage,
                });

                if (response && response.status === 200) {
                    setData(response?.data?.data);
                    setTotalRows(response?.data?.paginate?.total_items);
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
        fetchData(1);
    }, []);

    /* handle paginate page change */
    const handlePageChange = (page) => fetchData(page);

    /* handle paginate row change */
    const handlePerRowsChange = async (newPerPage, page) => {
        setLoading(true);
        const response = await NetworkServices.Job.index({
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
            const response = await NetworkServices.Job.destroy(id)
            if (response.status === 200) {
                fetchData()
                return Toastify.Success(response.data.message)
            }
        } catch (error) {
            networkErrorHandeller(error)
        }
    }

    return <section>
        <div className="flex justify-between shadow-md p-4 px-6 rounded-md">
            <h2 className=" font-semibold text-xl">Job List</h2>
        </div>
        <DataTable
            columns={columns}
            data={data}
            progressPending={loading}
            pagination
            paginationServer
            paginationTotalRows={totalRows}
            onChangeRowsPerPage={handlePerRowsChange}
            onChangePage={handlePageChange}
        />
    </section>
}
