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

export const DivisionEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [data, setData] = useState()
    const [options, setOptions] = useState([]);
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
            const response = await NetworkServices.Division.show(id)
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
            const response = await NetworkServices.Division.update(id, payload)
            console.log("res", response);
            if (response.status === 200) {
                navigate('/dashboard/division')
                return Toastify.Success(response.data.message);
            }
        } catch (error) {
            setLoading(false)
            networkErrorHandeller(error)
        }
    }

    /* district */
    const fetchDistrict = useCallback(async () => {
        try {
            const response = await NetworkServices.District.index()
            if (response.status === 200) {
                const options = response.data.data.map(item => ({
                    "value": item._id,
                    "label": item.name,
                }))
                setOptions(options)
            }

        } catch (error) {
            networkErrorHandeller(error)
        }
    }, [])


    useEffect(() => {
        fetchData()
        fetchDistrict()
    }, [])



    return <>
        <section className="flex justify-between shadow-md p-4 px-6 rounded-md">
            <h2 className=" font-semibold text-xl">Division Create</h2>
            <Link to="/dashboard/division">
                <span class="border border-green-500 rounded-full material-symbols-outlined p-1">
                    list
                </span>
            </Link>
        </section>
        {data ?
            <section className="shadow-md my-5 p-4 px-6">
                <form className="px-4" onSubmit={handleSubmit(onSubmit)}>
                   
                    <div>
                        {/* division name */}
                        <TextInput
                            label="Division Name"
                            name="name"
                            type="text"
                            placeholder="Enter division name"
                            control={control}
                            error={errors.name && errors.name.message}
                            defaultvalue={data ? data?.name : "s"}
                            rules={{ required: "Division name is required" }}
                        />
                    </div>

                    {/* submit button */}
                    <div className="my-4 flex justify-center">
                        <PrimaryButton loading={loading} name="Division Update"></PrimaryButton>
                    </div>

                </form>
            </section>
            : <>
                <SkeletonForm></SkeletonForm>
            </>}

       

    </>
}