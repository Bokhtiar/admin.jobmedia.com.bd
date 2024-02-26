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

export const SujbectEdit = () => {
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
            const response = await NetworkServices.Subject.show(id)
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
            }
            const response = await NetworkServices.Subject.update(id, payload)
            if (response.status === 200) {
                navigate('/dashboard/subject')
                return Toastify.Success(response.data.message);
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
        <section className="flex justify-between shadow-md p-4 px-6 rounded-md bg-white mb-3">
            <h2 className=" font-semibold text-xl">Subject Create</h2>
            <Link to="/dashboard/subject">
                <span class="border border-green-500 rounded-full material-symbols-outlined p-1">
                    list
                </span>
            </Link>
        </section>
        {data ?
            <section className="shadow-md my-5 p-4 px-6">
                <form className="px-4" onSubmit={handleSubmit(onSubmit)}>
                   
                    <div>
                        {/* subject name */}
                        <TextInput
                            label="Subject Name"
                            name="name"
                            type="text"
                            placeholder="Enter subject name"
                            control={control}
                            error={errors.name && errors.name.message}
                            defaultvalue={data ? data?.name : "s"}
                            rules={{ required: "Subject name is required" }}
                        />
                    </div>

                    {/* submit button */}
                    <div className="my-4 flex justify-center">
                        <PrimaryButton loading={loading} name="Subject Update"></PrimaryButton>
                    </div>

                </form>
            </section>
            : <>
                <SkeletonForm></SkeletonForm>
            </>}

       

    </>
}