import { Toastify } from "../../components/toastify"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { NetworkServices } from '../../network/index'
import { PrimaryButton } from "../../components/button"
import { useState } from "react"
import { networkErrorHandeller } from "../../utils/helper"
import { TextInput, SearchableSelect } from '../../components/input';

export const DistrictCreate = () => {
    const navigate = useNavigate()
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
                division:data.division.value
            }
            const response = await NetworkServices.District.store(payload)
            console.log("response", response);
            if (response && response.status === 201) {
                navigate('/dashboard/district')
                return Toastify.Success(response.data.message);
            }
        } catch (error) {
            setLoading(false)
            console.log("error", error);
            networkErrorHandeller(error)
        }
    }

    /* Handle search */
    const handleSearch = async (input) => {
        try {
            const results = [];

            const response = await NetworkServices.Division.search(input);
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

    return <>
        <section className="flex justify-between shadow-md p-4 px-6 rounded-md">
            <h2 className=" font-semibold text-xl">District Create</h2>
            <Link to="/dashboard/district">
                <span class="border border-green-500 rounded-full material-symbols-outlined p-1">
                    list
                </span>
            </Link>
        </section>

        <section className="shadow-md my-5 p-4 px-6">
            <form className="px-4" onSubmit={handleSubmit(onSubmit)}>
                {/* division */}
                <div className='my-3'>
                    <SearchableSelect
                        label="Division"
                        name="division"
                        control={control}
                        error={errors.division && errors.division.message}
                        isClearable={true}
                        placeholder="Search division"
                        rules={{ required: "Division is required" }}
                        // defaultvalue={
                        //     props.data
                        //         ? {
                        //             label: `${props.data.division.name} - ${props.data.division.bn_name}`,
                        //             value: props.data.division._id,
                        //         }
                        //         : null
                        // }
                        onSearch={(inputData) => handleSearch(inputData)}
                    />
                </div>
                {/* Name */}
                <div className="mb-6 lg:mb-2">
                    <TextInput
                        label="District Name"
                        name="name"
                        type="text"
                        placeholder="Enter district name"
                        control={control}
                        error={errors.name && errors.name.message}
                        rules={{ required: "District name is required" }}
                    />
                </div>

                {/* submit button */}
                <div className="my-4 flex justify-center">
                    <PrimaryButton loading={loading} name="District create"></PrimaryButton>
                </div>

            </form>
        </section>
    </>
}