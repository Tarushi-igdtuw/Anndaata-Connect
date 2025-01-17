import { UserCircleIcon } from '@heroicons/react/24/solid';
import React, { useState, useEffect } from 'react';
import Banner from "../../Components/Banner";
import './Form.css';
import { database } from '../../FirebaseConfig'
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { imgDB } from "../../FirebaseConfig";
import { useNavigate } from 'react-router-dom';

export default function DonorForm() {
    const [img, setImg] = useState('');
    const [nameOrg, setNameOrg] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [time, setTime] = useState('');
    const [mealno, setMealno] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();


    const [id, setId] = useState('')

    const [show, setShow] = useState(false)

    const [val, setVal] = useState([])

    const value = collection(database, "ngoAdmin")


    useEffect(() => {
        const getData = async () => {
            const dbVal = await getDocs(value)
            setVal(dbVal.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        }
        getData()
    })

    const handleUpload = async (e) => {
        const imgFile = e.target.files[0];
        const imgRef = ref(imgDB, `Imgs/${v4()}`);

        try {
            await uploadBytes(imgRef, imgFile);
            const imgUrl = await getDownloadURL(imgRef);
            setImg(imgUrl);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const handleCreate = async () => {
        await addDoc(value, { nameOrg: nameOrg, name: name, email: email, time: time, mealno: mealno, address: address })
        setName("")
        setNameOrg("")
        setAddress("")
        setEmail("")
        setMealno("")
        setTime("")

        // After the item is created, navigate to the next page
        navigate('/ngoList'); // Replace '/next-page' with the path of the next page
    }

    const handleDelete = async (id) => {
        const deleteVal = doc(database, "ngoAdmin", id)
        await deleteDoc(deleteVal)
    }

    const handleEdit = async (id, name1, name2) => {
        setName(name)
        setNameOrg(nameOrg)
        setAddress(address)
        setEmail(email)
        setTime(time)
        setMealno(mealno)

        setId(id)
        setShow(true)
    }

    const handleUpdate = async () => {
        const updateData = doc(database, "ngoAdmin", id)
        await updateDoc(updateData, { nameOrg: nameOrg, name: name, email: email, time: time, mealno: mealno, address: address })
        setShow(false)
        setName("")
        setNameOrg("")
        setAddress("")
        setEmail("")
        setMealno("")
        setTime("")
    }
    return (
        <>
            <Banner />
            <div className='p-[60px] bgImg' >
                <h2 className="text-4xl text-center leading-7 text-gray-900"
                    style={{ fontFamily: 'Inter' }}
                >Profile</h2>
                <div className='box'>
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className=" text-left mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full ">
                                <label htmlFor="photo" className="block text-lg font-medium leading-6 text-gray-900">
                                    Logo
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    <UserCircleIcon className="h-[75px] w-[75px] text-gray-300" aria-hidden="true" />
                                    <input type="file"
                                        className="rounded-md bg-white px-1.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                        onChange={(e) => handleUpload(e)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-left border-b border-gray-900/10">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Name of Organization
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="full-name"
                                        id="full-name"
                                        value={nameOrg}
                                        onChange={(e) => setNameOrg(e.target.value)}
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address of Organization
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="number" className="block text-sm font-medium leading-6 text-gray-900">
                                    Name of Person
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="first-name"
                                        id="first-name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        autoComplete="number"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="Time" className="block text-sm font-medium leading-6 text-gray-900">
                                    Time
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="Time"
                                        name="Time"
                                        autoComplete="time-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                    >
                                        <option>Morning</option>
                                        <option>AfterNoon</option>
                                        <option>Evening</option>
                                    </select>
                                </div>
                            </div>


                            <div className="col-span-full">
                                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                    Street address
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="street-address"
                                        id="street-address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        autoComplete="street-address"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                    City
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="city"
                                        id="city"
                                        autoComplete="address-level2"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                    Number of Meals
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="region"
                                        id="region"
                                        autoComplete="address-level1"
                                        value={mealno}
                                        onChange={(e) => setMealno(e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                    ZIP / Postal code
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="postal-code"
                                        id="postal-code"
                                        autoComplete="postal-code"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" flex items-center justify-end gap-x-6">
                    <button type="reset" className="cancelbtn">
                        Cancel
                    </button>
                    {!show ? <button className="savebtn" onClick={handleCreate}>Create</button> :
                        <button onClick={handleUpdate}>Update</button>}
                </div>
            </div>
        </>
    )
}
