import { Toastify } from "../../components/toastify"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { NetworkServices } from '../../network/index'
import { PrimaryButton } from "../../components/button"
import { useState } from "react"
import { networkErrorHandeller } from "../../utils/helper"
import { TextInput } from '../../components/input';

export const SkillCreate = () => {
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

            const response = await NetworkServices.Skill.store(payload)
            if (response && response.status === 201) {
                navigate('/dashboard/skill')
                return Toastify.Success(response.data.message);
            }
        } catch (error) {
            setLoading(false)
            networkErrorHandeller(error)
        }
    }

    return <>
        <section className="flex justify-between shadow-md p-4 px-6 rounded-md bg-white mb-3">
            <h2 className=" font-semibold text-xl">Skill Create</h2>
            <Link to="/dashboard/skill">
                <span class="border border-green-500 rounded-full material-symbols-outlined p-1">
                    list
                </span>
            </Link>
        </section>

        <section className="shadow-md my-5 p-4 px-6">
            <form className="px-4" onSubmit={handleSubmit(onSubmit)}>

                {/* skill name */}
                <div className="mb-6 lg:mb-2">
                    <TextInput
                        label="Skill Name"
                        name="name"
                        type="text"
                        placeholder="Enter skill name"
                        control={control}
                        error={errors.name && errors.name.message}
                        rules={{ required: "Skill Name is required" }}
                    />
                </div>

                {/* submit button */}
                <div className="my-4 flex justify-center">
                    <PrimaryButton loading={loading} name="Skill Create"></PrimaryButton>
                </div>

            </form>
        </section>
    </>
}