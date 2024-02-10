import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NetworkServices } from "../../network";
import { networkErrorHandeller } from "../../utils/helper";
import { Toastify } from "../../components/toastify";
import DataTable from "react-data-table-component";

export const CvRequestList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);

    const columns = [
        {
            name: 'Provider Name',
            selector: row => row?.provider?.name_in_english,
            sortable: true,
        },
        {
            name: 'Trade License',
            selector: row => row?.provider?.trade_license,
            sortable: true,
        },
        {
            name: 'Payment status',
            selector: row => row.payment_status === true ? "done" : "pending" ,
            sortable: true,
        },
        {
            name: "Action",
            cell: (row) => (
                <div className="flex gap-1">
                    <Link to={`/dashboard/cv-request/show/${row._id}`}>
                        <span className="bg-green-500 text-white btn btn-sm material-symbols-outlined">
                            visibility
                        </span>
                    </Link>
                </div>
            ),
        },
    ];

    /* Fetch data */
    const fetchData = useCallback(
        async (page) => {
            try {
                setLoading(true);
                const response = await NetworkServices.CvRequest.index({
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
        const response = await NetworkServices.CvRequest.index({
            page,
            limit: newPerPage,
        });
        setData(response.data.data);
        setPerPage(newPerPage);
        setLoading(false);
    };

    return <section>
        <div className="flex justify-between shadow-md p-4 px-6 rounded-md">
            <h2 className=" font-semibold text-xl">Cv Request List</h2>
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
