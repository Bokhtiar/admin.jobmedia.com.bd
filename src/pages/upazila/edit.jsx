import { useParams } from "react-router-dom";
import { SearchableSelect, TextInput } from '../../components/input';
import { Toastify } from "../../components/toastify"
import { Link, useNavigate } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import { NetworkServices } from '../../network/index'
import { PrimaryButton } from "../../components/button"
import { useCallback, useEffect, useState } from "react"
import { networkErrorHandeller } from "../../utils/helper"
import { SkeletonForm } from '../../components/loading/skeleton-table';

export const UpazilaEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    /* reosure show */
    const fetchData = useCallback(async () => {
        try {
            const response = await NetworkServices.Upazila.show(id)
            if (response.status === 200) {
                setData(response.data.data)
            }
        } catch (error) {
            networkErrorHandeller(error)
        }
    }, [])
    
    /* submit reosurce */
    const onSubmit = async (data) => {
        try {
            setLoading(true)
            const payload = {
                ...data,
                district: data.district.value
            }
            console.log("payload", payload);
            const response = await NetworkServices.Upazila.update(id, payload)
            if (response && response.status === 200) {
                navigate('/dashboard/upazila')
                return Toastify.Success(response.data.message);
            }
        } catch (error) {
            setLoading(false)
            networkErrorHandeller(error)
        }
    }


    /* Handle search */
    const handleSearch = async (input) => {
        try {
            const results = [];

            const response = await NetworkServices.Upazila.search(input);
            if (response.status === 200) {
                const arrLenght = response.data.data.length;
                if (arrLenght > 0) {
                    for (let i = 0; i < arrLenght; i++) {
                        results.push({
                            value: response.data.data[i]._id,
                            label: `${response.data.data[i].name}`,
                        });
                    }
                }
            }
            return results;
        } catch (error) {
            if (error) {
                networkErrorHandeller(error);
                return [];
            }
        }
    };

    useEffect(() => {
        fetchData()
    }, [])

    return <>
        <section className="flex justify-between shadow-md p-4 px-6 rounded-md bg-white mb-3">
            <h2 className=" font-semibold text-xl">Upazila Create</h2>
            <Link to="/dashboard/upazila">
                <span class="border border-green-500 rounded-full material-symbols-outlined p-1">
                    list
                </span>
            </Link>
        </section>
        {data ?
            <section className="shadow-md my-5 p-4 px-6">
                <form className="px-4" onSubmit={handleSubmit(onSubmit)}>

                    <div className='my-3'>
                        <SearchableSelect
                            label="District"
                            name="district"
                            control={control}
                            error={errors.district && errors.district.message}
                            isClearable={true}
                            placeholder="Search district"
                            rules={{ required: "District is required" }}
                            defaultvalue={
                                data
                                    ? {
                                        label: `${data?.district.name}`,
                                        value: data?.district._id,
                                    }
                                    : null
                            }
                            onSearch={(inputData) => handleSearch(inputData)}
                        />
                    </div>
                   
                    <div>
                        {/* Upazila name */}
                        <TextInput
                            label="Upazila Name"
                            name="name"
                            type="text"
                            placeholder="Enter upazila name"
                            control={control}
                            error={errors.name && errors.name.message}
                            defaultvalue={data ? data?.name : ""}
                            rules={{ required: "Upazila name is required" }}
                        />
                    </div>

                    {/* submit button */}
                    <div className="my-4 flex justify-center">
                        <PrimaryButton loading={loading} name="Upazila Update"></PrimaryButton>
                    </div>

                </form>
            </section>
            : <>
                <SkeletonForm></SkeletonForm>
            </>}

       

    </>
}