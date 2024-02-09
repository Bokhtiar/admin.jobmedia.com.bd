import { Link } from 'react-router-dom';
import { NetworkServices } from '../../network';
import DataTable from 'react-data-table-component';
import { Toastify } from '../../components/toastify';
import { useCallback, useEffect, useState } from 'react';
import { networkErrorHandeller } from '../../utils/helper';
import { SkeletonTable } from '../../components/loading/skeleton-table';


export const SkillList = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    /* fetch Data */
    const fetchData = useCallback(async () => {
        try {
            setLoading(true)
            const response = await NetworkServices.Skill.index()
            if (response.status === 200) {
                setData(response.data.data)
                setLoading(false)
            }
        } catch (error) {
            setLoading(true)
            networkErrorHandeller(error)
        }
    }, [])

    /* destory */
    const destroy = async(id) => {
        try {
            const response = await NetworkServices.Skill.destroy(id)
            if (response.status === 200) {
                fetchData()
                return Toastify.Success(response.data.message) 
            }
        } catch (error) {
            networkErrorHandeller(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const columns = [
        {
            name: 'Skill name',
            selector: row => row.name,
            sortable: true,
        },

        {
            name: "Action",
            cell: (row) => (
                <div className="flex gap-1">
                    <Link to={`/dashboard/skill/edit/${row._id}`}>
                        <span className="bg-green-500 text-white btn btn-sm material-symbols-outlined">
                            edit
                        </span>
                    </Link>

                    <span onClick={()=> destroy(row._id)}>
                        <span className="bg-red-500 text-white btn btn-sm material-symbols-outlined">
                            delete
                        </span>
                    </span>
                </div>
            ),
        },
    ];

    return <>
        <section className="flex justify-between shadow-md p-4 px-6 rounded-md">
            <h2 className=" font-semibold text-xl">Skill</h2>
            <Link to="/dashboard/skill/create">
                <span class="border border-green-500 rounded-full material-symbols-outlined p-1">
                    add
                </span>
            </Link>
        </section>

        <section className='my-5'>
            <div className='shadow-md p-4 px-6 rounded-md'>
                {loading ? <SkeletonTable /> :
                    <DataTable
                        columns={columns}
                        data={data}
                        pagination
                        title="Skill List"
                    />
                }
            </div>
        </section >
    </>
}