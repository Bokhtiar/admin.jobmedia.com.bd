import { Toastify } from "../../components/toastify"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { NetworkServices } from '../../network/index'
import { PrimaryButton } from "../../components/button"
import { useEffect, useState } from "react"
import { networkErrorHandeller } from "../../utils/helper"
import { TextInput, SearchableSelect, SingleSelect } from '../../components/input';

export const UpazilaCreate = () => {
    const navigate = useNavigate()
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false)

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    /* submit reosurce */
    const onSubmit = async (data) => {
        try {
            setLoading(true)
            const payload = {
                ...data,
                district:data.district.value
            }
            const response = await NetworkServices.Upazila.store(payload)
            if (response && response.status === 201) {
                navigate('/dashboard/upazila')
                return Toastify.Success("Upazila created.");
            }
        } catch (error) {
            setLoading(false)
            networkErrorHandeller(error)
        }
    }

    /* Handle search */
    const handleSearch = async () => {
        try {
            const results = [];
            const response = await NetworkServices.District.index()
            if (response.status === 200) {
                const arrLenght = response.data.length;
                if (arrLenght > 0) {
                    for (let i = 0; i < arrLenght; i++) {
                        results.push({
                            value: response.data[i].id,
                            label: response.data[i].name,
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
        handleSearch()
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

        <section className="shadow-md my-5 p-4 px-6">
            <form className="px-4" onSubmit={handleSubmit(onSubmit)}>
                {/* district */}
                <div className='my-3'>
                    <SingleSelect
                        label="District"
                        name="district"
                        control={control}
                        error={errors.district && errors.district.message}
                        options={options}
                        isClearable={true}
                        placeholder="Select district"

                    />
                </div>
                {/* Name */}
                <div className="mb-6 lg:mb-2">
                    <TextInput
                        label="Upazila Name"
                        name="name"
                        type="text"
                        placeholder="Enter upazila name"
                        control={control}
                        error={errors.name && errors.name.message}
                        rules={{ required: "Upazila name is required" }}
                    />
                </div>

                {/* submit button */}
                <div className="my-4 flex justify-center">
                    <PrimaryButton loading={loading} name="Upazila create"></PrimaryButton>
                </div>

            </form>
        </section>
    </>
}