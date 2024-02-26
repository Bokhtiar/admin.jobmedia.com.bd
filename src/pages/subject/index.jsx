import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NetworkServices } from "../../network";
import { networkErrorHandeller } from "../../utils/helper";
import { Toastify } from "../../components/toastify";
import DataTable from "react-data-table-component";
import { SingleSelect } from "../../components/input";
import Select from 'react-select'

export const SubjectList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [degree, setDegree] = useState("MASTERS")
    const [options, setOptions] = useState([]);

    const columns = [
        {
            name: 'Degree level',
            selector: row => row?.degree_level,
            sortable: true,
        },
        {
            name: 'Suject Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: "Action",
            cell: (row) => (
                <div className="flex gap-1">
                    {/* <Link to={`/dashboard/subject/edit/${row.id}`}>
                        <span className="bg-green-500 text-white btn btn-sm material-symbols-outlined">
                            edit
                        </span>
                    </Link> */}

                    <span onClick={() => destroy(row?.degree_level,row.id)}>
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
        async (degree) => {
            try {
                setLoading(true);
                const response = await NetworkServices.Subject.index(
                     degree 
                );

                if (response && response.status === 200) {
                    setData(response?.data);
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
        []
    );

    /** degree search*/
    const handleSearch = async () => {
        try {
            const results = [];
            const response = await NetworkServices.Degree.index()
            if (response.status === 200) {
                const arrLenght = response.data.length;
                if (arrLenght > 0) {
                    for (let i = 0; i < arrLenght; i++) {
                        results.push({
                            value: response.data[i].id,
                            label: response.data[i].level,
                        });
                    }
                }
            }
            setOptions(results)
            return results;
        } catch (error) {
            if (error) {
                networkErrorHandeller(error);
                return [];
            }
        }
    };


    useEffect(() => {
        fetchData("MASTERS");
        handleSearch()
    }, []);

    /* destory */
    const destroy = async (degree, id) => {
        try {
            const response = await NetworkServices.Subject.destroy(degree,id)
            if (response.status === 204) {
                fetchData(degree)
                return Toastify.Info("Subject deleted")
            }
        } catch (error) {
            networkErrorHandeller(error)
        }
    }

    const degreeSelect = (e) =>{
        setDegree(e.label)
        fetchData(e.label)
    }



    return <section>
        <div className="flex justify-between shadow-md p-4 px-6 rounded-md">
            <h2 className=" font-semibold text-xl capitalize">Subject List {degree}</h2>
            <Link to="/dashboard/subject/create">
                <span class="border border-green-500 rounded-full material-symbols-outlined p-1">
                    add
                </span>
            </Link>
        </div>

        <div className="my-2">
            <Select placeholder="Select degree" onChange={(e) => degreeSelect(e)} options={options} />
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
