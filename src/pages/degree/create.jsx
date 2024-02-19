import { Toastify } from "../../components/toastify"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { NetworkServices } from '../../network/index'
import { PrimaryButton } from "../../components/button"
import { useState } from "react"
import { networkErrorHandeller } from "../../utils/helper"
import { TextInput } from '../../components/input';

export const DegreeCreate = () => {
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
            }

            const response = await NetworkServices.Degree.store(payload)
            if (response && response.status === 201) {
                navigate('/dashboard/degree')
                return Toastify.Success("Degree level name created.");
            }
        } catch (error) {
            setLoading(false)
            networkErrorHandeller(error)
        }
    }

    return <>
        <section className="flex justify-between shadow-md p-4 px-6 rounded-md">
            <h2 className=" font-semibold text-xl">Degree level name create</h2>
            <Link to="/dashboard/degree">
                <span class="border border-green-500 rounded-full material-symbols-outlined p-1">
                    list
                </span>
            </Link>
        </section>

        <section className="shadow-md my-5 p-4 px-6">
            <form className="px-4" onSubmit={handleSubmit(onSubmit)}>

                {/* level name */}
                <div className="mb-6 lg:mb-2">
                    <TextInput
                        label="Degree level name"
                        name="level"
                        type="text"
                        placeholder="Enter level name"
                        control={control}
                        error={errors.level && errors.level.message}
                        rules={{ required: "Degree level name is required" }}
                    />
                </div>

                {/* submit button */}
                <div className="my-4 flex justify-center">
                    <PrimaryButton loading={loading} name="Degree create"></PrimaryButton>
                </div>

            </form>
        </section>
    </>
}