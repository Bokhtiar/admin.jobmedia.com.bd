import { Toastify } from "../../components/toastify"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { NetworkServices } from '../../network/index'
import { PrimaryButton } from "../../components/button"
import { useEffect, useState } from "react"
import { networkErrorHandeller } from "../../utils/helper"
import { SingleSelect, TextInput } from '../../components/input';

export const SubjectCreate = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false) 
    const [options, setOptions] = useState([]);

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
            }
            
            const response = await NetworkServices.Subject.store(data?.degree?.label ,payload)
            if (response && response.status === 201) {
                navigate('/dashboard/subject')
                return Toastify.Success("Subject created");
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
            const response = await NetworkServices.Degree.index()
            console.log("response", response);
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
        handleSearch()
    }, [])

    return <>
        <section className="flex justify-between shadow-md p-4 px-6 rounded-md bg-white mb-3">
            <h2 className=" font-semibold text-xl">Subject Create</h2>
            <Link to="/dashboard/subject">
                <span class="border border-green-500 rounded-full material-symbols-outlined p-1">
                    list
                </span>
            </Link>
        </section>

        <section className="shadow-md my-5 p-4 px-6">
            <form className="px-4" onSubmit={handleSubmit(onSubmit)}>

                <SingleSelect
                    label="Degree"
                    name="degree"
                    control={control}
                    error={errors.degree && errors.degree.message}
                    options={options}
                    isClearable={true}
                    placeholder="Select degree"

                />

                {/* subject name */}
                <div className="mb-6 lg:mb-2">
                    <TextInput
                        label="Subject Name"
                        name="name"
                        type="text"
                        placeholder="Enter subject name"
                        control={control}
                        error={errors.name && errors.name.message}
                        rules={{ required: "Subject name is required" }}
                    />
                </div>

                {/* submit button */}
                <div className="my-4 flex justify-center">
                    <PrimaryButton loading={loading} name="Subject create"></PrimaryButton>
                </div>

            </form>
        </section>
    </>
}