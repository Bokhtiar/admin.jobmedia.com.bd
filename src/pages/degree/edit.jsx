import { useParams } from "react-router-dom";
import { TextInput } from '../../components/input';
import { Toastify } from "../../components/toastify"
import { Link, useNavigate } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import { NetworkServices } from '../../network/index'
import { PrimaryButton } from "../../components/button"
import { useCallback, useEffect, useState } from "react"
import { networkErrorHandeller } from "../../utils/helper"
import { SkeletonForm } from '../../components/loading/skeleton-table';

export const DegreeEdit = () => {
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
            const response = await NetworkServices.Degree.show(id)
            if (response.status === 200) {
                setData(response.data)
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
            }
            const response = await NetworkServices.Degree.update(id, payload)
            if (response.status === 200) {
                navigate('/dashboard/degree')
                return Toastify.Success("Degree level updated");
            }
        } catch (error) {
            setLoading(false)
            networkErrorHandeller(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return <>
        <section className="flex justify-between shadow-md p-4 px-6 rounded-md">
            <h2 className=" font-semibold text-xl">Degree level name update</h2>
            <Link to="/dashboard/degree">
                <span class="border border-green-500 rounded-full material-symbols-outlined p-1">
                    list
                </span>
            </Link>
        </section>
        {data ?
            <section className="shadow-md my-5 p-4 px-6">
                <form className="px-4" onSubmit={handleSubmit(onSubmit)}>
                   
                    <div>
                        {/* degree name */}
                        <TextInput
                            label="Degree level name"
                            name="level"
                            type="text"
                            placeholder="Enter level name"
                            control={control}
                            error={errors.level && errors.level.message}
                            defaultvalue={data ? data?.level : ""}
                            rules={{ required: "Degree level name is required" }}
                        />
                    </div>

                    {/* submit button */}
                    <div className="my-4 flex justify-center">
                        <PrimaryButton loading={loading} name="Degree Update"></PrimaryButton>
                    </div>

                </form>
            </section>
            : <>
                <SkeletonForm></SkeletonForm>
            </>}

       

    </>
}