import { useCallback, useEffect, useState } from "react";
import { NetworkServices } from "../../network";
import { useParams } from "react-router-dom";
import { networkErrorHandeller } from "../../utils/helper";
import { Toastify } from "../../components/toastify";


export const CvRequestShow = () => {
    const { id } = useParams();
    const [data, setData] = useState()

    /* reosure show */
    const fetchData = useCallback(async () => {
        try {
            const response = await NetworkServices.CvRequest.show(id)
            if (response.status === 200) {
                setData(response.data.data)
            }
        } catch (error) {
            networkErrorHandeller(error)
        }
    }, [])

    /** payment status */
    const paymentStatus =  async(id) => {
        const response = await NetworkServices.CvRequest.PaymentStatusUpdate(id)
        if (response.status === 200) {
            fetchData()
            Toastify.Success("Payment Status Updated")
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return <>

        <div className=" mb-9">
            <h3 className="text-2xl pb-3 font-bold">Payment Status</h3>
            {
                data?.payment_status === true ? <input type="checkbox" className="toggle" checked /> : <input type="checkbox" className="toggle" onClick={() => paymentStatus(id)} />
            }

        </div>

        <div className=" border p-7 rounded">
            <h3 className="text-2xl pb-3 font-bold">Provider Information</h3>
            <div className="grid grid-cols-3">
                <div className=" col-span-1">
                    <img className=" rounded" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmwzLqF3wM_eeZSv4I5rNtTYKECuiU-aMbcqiERXV7k5ivwMMihWipgF8O1VYToJscnwA&usqp=CAU" alt="" />
                </div>
                <div className=" col-span-2">
                    <p className="">
                        <span>Email: {data?.provider?.email}</span> <br />
                        <span>Name: {data?.provider?.name_in_english}</span> <br />
                        <span>Working Area: {data?.provider?.working_area}</span><br />
                        <span>Trade License: {data?.provider?.trade_license}</span><br />
                    </p>
                </div>
            </div>

            {/* applicant list */}
            <section className="my-5">
                <h3 className="text-2xl pb-3 font-bold">Applicant List Information</h3>
                <div className="">
                    {/* personal info */}
                    {
                        data?.cv.map((seeker, i) => {
                            return <>
                                <div className="p-4 border">

                                    <div className="flex">
                                        <img className=" h-32 w-32 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBcmeKw3zX-4JGyMj73dHZ2si1luYlfS047bqvFp-UFWWsIKysc99IYdYE5R9aC2yfvjU&usqp=CAU" alt="" />
                                        <div className="my-auto px-5">
                                            <span className="flex items-center gap-10">Seeker Name: <span>{seeker?.name}</span> </span>
                                            <span className="flex items-center gap-10">Seeker Email: <span>{seeker?.email}</span> </span>
                                            <span className="flex items-center gap-10">Seeker Phone: <span>{seeker?.phone}</span> </span>
                                        </div>
                                    </div>

                                </div>
                            </>
                        })
                    }
                </div>
            </section>
        </div>
    </>
}