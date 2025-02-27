import React, { useEffect, useState } from 'react'
import './style.scss'
import Header from '../../components/header/Header'
import Title from '../../components/title/Title'
import { useNavigate } from 'react-router-dom'
import NormalInput from '../../components/common/inputs/NormalInput'
import SelectInput from '../../components/common/inputs/SelectInput'
import RadioInput from '../../components/common/inputs/RadioInput'
import SignCanvas from '../../components/common/signatureCanvas/SignCanvas';
import InfoBox from '../../components/common/info-box/InfoBox'
import { BiLoaderAlt } from 'react-icons/bi'
import { customerAxios, purifierAxios, userAxios, wholeAxios } from '../../config/axios'
import { toast } from 'react-hot-toast'
import { product_usages } from '../../assets/js/const-data'

function ReInstallation() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState('')
    const [find, setFind] = useState('')
    const [form, setForm] = useState({})
    const [purifierList, setPurifierList] = useState([])
    const [whList, setWHList] = useState([])
    const [purifierUsageList, setPurifierUsageList] = useState([])
    const [cityList, setCityList] = useState([])
    const [pinCodeList, setPinCodeList] = useState([])


    const modes = [
        { option: 'RE-INSTALLATION', value: 'RE-INSTALLATION' }
    ]

    const handleFindSubmit = (e) => {
        e.preventDefault();
        setLoading('find')

        customerAxios.get(`/profile?cid=${find}`).then((response) => {
            const customerData = {
                cid: response.data.data.cid,
                first_name: response.data.data?.first_name,
                last_name: response.data.data?.last_name,
                address: response.data.data.address?.address,
                place: response.data.data.address?.place,
                city_id: response.data.data.address?.city_id,
                state: response.data.data.address?.state_name,
                pin_code: response.data.data.address?.pin_code,
                land_mark: response.data.data.address?.land_mark,
                contact1: response.data.data?.contact1,
                contact2: response.data.data?.contact2,
                whatsapp1: response.data.data?.whatsapp1,
                zone_id: response.data.data?.zone_id,
                purifier: response.data.data?.purifier_customer_status ? true : false,
                whole_house: response.data.data?.wh_customer_status ? true : false,
            }

            setForm(customerData)

            customerAxios.get('/l/area?branch_id=AWS').then((resCity) => {
                setCityList(resCity?.data?.data || [])

                const currentCity = resCity?.data?.data?.filter((obj) => obj?.city_id === customerData?.city_id)
                setPinCodeList(currentCity?.[0]?.pin_codes || [])

                setLoading("")
            })


        }).catch((error) => {
            toast.error(error.response.data.message)
            setLoading('')
        })
    }

    const resetData = () => {
        setForm({})
        setFind('')
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setLoading('submit')

        userAxios.post('/setup/reinstallation', form).then(() => {
            setForm({})
            setFind('')
            setLoading('')
            navigate('/')
            toast.success('Form successfully submitted !')
        }).catch((error) => {
            toast.error(error.response.data.message)
            setLoading('')
        })

    }

    const splitAtFirst = (str, delimiter) => {
        let parts = str.split(delimiter, 2); // Limit to 2 parts to ensure it only splits at the first occurrence
        if (parts.length === 1) return parts; // Delimiter not found, return original string in an array
        return [parts[0], parts.slice(1).join(delimiter)]; // Re-join the second part in case the delimiter appears more than once
    }

    const handleChange = (e) => {

        if (e.target.name === 'city') {
            let selectedCity = null
            cityList?.map((obj) => {
                if (obj.city_id === e.target.value) {
                    selectedCity = obj
                }
                return obj;
            })

            setForm({
                ...form,
                city: selectedCity?.city_name,
                city_id: selectedCity?.city_id,
                state: selectedCity?.state_name,
                pin_code: '',
            })
            setPinCodeList(selectedCity?.pin_codes || [])

            return;
        }

        setForm({
            ...form,
            [e.target.name]: e.target.value
        })


        if (e.target.name === 'product') {
            setForm({
                ...form,
                [e.target.name]: e.target.value,
                purifier_id: null,
                purifier_name: null,
                wh_id: null,
                wh_name: null,
                purifier_usage: null,
                wh_description: null,
                pr_description: null
            })
        }

        if (e.target.name === 'purifier_id') {
            const result = splitAtFirst(e.target.value, '_$$_')
            setForm({
                ...form,
                purifier_id: result[0],
                purifier_name: result[1]
            })
        }

        if (e.target.name === 'wh_id') {
            const result = splitAtFirst(e.target.value, '_$$_')
            setForm({
                ...form,
                wh_id: result[0],
                wh_name: result[1]
            })
        }
    }

    const saveSignature = (url) => {
        setForm({
            ...form,
            signature: {
                ...(form.signature || {}),
                url: url
            }
        })
    }

    const resetSignature = () => {
        setForm({
            ...form,
            signature: {
                ...(form.signature || {}),
                url: null
            }
        })
    }

    useEffect(() => {
        purifierAxios.get('/products?all=YES').then((response) => {
            setPurifierList(response.data.data?.map((obj) => ({ option: `${obj.product_name} (${obj.product_category})`, value: `${obj._id}_$$_${obj.product_name} (${obj.product_category})` })))
        })
        wholeAxios.get('/products?all=YES').then((response) => {
            setWHList(response.data.data?.map((obj) => ({ option: `${obj.product_name}`, value: `${obj._id}_$$_${obj.product_name}` })))
        })
        setPurifierUsageList(product_usages.map((value) => ({ option: value, value: value })))
    }, [])

    return (
        <div>
            <div className="header-div">
                <Header />
            </div>
            <div className="installation-div">
                <div className="container">
                    <div className="title">
                        <Title title={'Re-Installation'} />
                    </div>
                    <div className="bottom">
                        <div className="boarder">
                            <div className="form-border-div">
                                <div className="section-one-div">
                                    <form action="" onSubmit={handleFindSubmit}>
                                        <NormalInput label='Customer Id' name='cid' value={find} onChangeFun={(e) => setFind(e.target.value)} type={'number'} />
                                        <div className="button-div">
                                            <button type='button' onClick={resetData}>Reset</button>
                                            {!form?.cid && <button>{loading === 'find' ? <span className='loading-icon'><BiLoaderAlt /></span> : 'Find'}</button>}
                                        </div>
                                    </form>
                                </div>
                                {form?.cid && <div className="section-three-div">
                                    <h3>Customer Info</h3>
                                    <form action="" onSubmit={handleFormSubmit}>
                                        <div className="info-one">
                                            <NormalInput label='First name' name='first_name' value={form.first_name} onChangeFun={handleChange} />
                                            <NormalInput label='Last name' name='last_name' value={form.last_name} onChangeFun={handleChange} />
                                            <NormalInput label='Address' name='address' value={form.address} onChangeFun={handleChange} isRequired={false} />
                                            <NormalInput label='Place' name='place' value={form.place} onChangeFun={handleChange} isRequired={false} />
                                            <SelectInput label='City*' value={form?.city} name='city' onChangeFun={handleChange}
                                                values={cityList?.map((obj) => ({ option: obj?.city_name, value: obj?.city_id, selected: obj?.city_id === form?.city_id }))}
                                                firstOption={{ option: 'Choose...', value: '' }} isRequired={false} />
                                            <NormalInput label='State*' value={form?.state} name='state' />
                                            <SelectInput label='Pin code*' name='pin_code' onChangeFun={handleChange}
                                                values={pinCodeList?.map((value) => ({ option: value, value, selected: value === form?.pin_code }))}
                                                firstOption={{ option: 'Choose...', value: '' }} />
                                            <NormalInput label='Land mark' name='land_mark' value={form.land_mark} onChangeFun={handleChange} isRequired={false} />
                                            <NormalInput label='Contact (Primary)' name='contact1' value={form.contact1} type={'number'} onChangeFun={handleChange} />
                                            <NormalInput label='Contact (Secondary)' name='contact2' value={form.contact2} type={'number'} onChangeFun={handleChange} isRequired={false} />
                                            <NormalInput label='Whatsapp' name='whatsapp1' value={form.whatsapp1} type={'number'} onChangeFun={handleChange} isRequired={false} />

                                        </div>
                                        {(!form?.purifier && !form?.whole_house)
                                            ? <>
                                                <InfoBox type={'warning'} description={'This is not a purifier or whole-house system user'} />
                                            </>
                                            : <>
                                                <h3>Re-installation Info</h3>
                                                <SelectInput label='Mode of Re-installation' name='mode_of_installation' values={modes} firstOption={{ option: 'Choose', value: '' }}
                                                    onChangeFun={handleChange} />
                                                <NormalInput label='Received amount' name='amount' value={form.amount} type={'number'} onChangeFun={handleChange} />

                                                <div className="radio-input-border-div">
                                                    <div className="sub-title"><h5>Type of product</h5></div>
                                                    <div className="radio-inputs">
                                                        {form?.purifier && <RadioInput label={"Purifier"} name={'product'} value={'purifier'} onChangeFun={handleChange} />}
                                                        {form?.whole_house && <RadioInput label={"WH Filter"} name={'product'} value={'wh_filter'} onChangeFun={handleChange} />}
                                                        {(form?.purifier && form?.whole_house) && <RadioInput label={"Purifier & WH Filter"} name={'product'} value={'package'} onChangeFun={handleChange} />}
                                                    </div>
                                                    <div className="info-one">
                                                        {(form?.product === 'purifier' || form?.product === 'package') && <SelectInput label='Purifier Model' name='purifier_id' values={purifierList} firstOption={{ option: 'Choose', value: '' }}
                                                            onChangeFun={handleChange} />}
                                                        {(form?.product === 'wh_filter' || form?.product === 'package') && <SelectInput label='Whole house Model' name='wh_id' values={whList} firstOption={{ option: 'Choose', value: '' }}
                                                            onChangeFun={handleChange} />}
                                                        {(form?.product === 'purifier' || form?.product === 'package') && <SelectInput label='Purifier usage' name='purifier_usage' values={purifierUsageList} firstOption={{ option: 'Choose', value: '' }}
                                                            onChangeFun={handleChange} />}
                                                        {(form?.product === 'wh_filter' || form?.product === 'package') && <NormalInput label='Whole house description' name='wh_description' value={form.wh_description} onChangeFun={handleChange} />}
                                                        {(form?.product === 'purifier' || form?.product === 'package') && <NormalInput label='Purifier description' name='pr_description' value={form.pr_description} onChangeFun={handleChange} />}
                                                    </div>
                                                </div>

                                                <NormalInput label='Condition signed customer name' name='customer_name' value={form.customer_name} onChangeFun={handleChange} />
                                                <SignCanvas signImg={form?.signature?.url} saveSign={saveSignature} resetSign={resetSignature} />
                                                <div className="button-div">
                                                    <button type={loading === 'submit' ? 'button' : 'submit'}>{loading === 'submit' ? <span className='loading-icon'><BiLoaderAlt /></span> : 'Submit'}</button>
                                                </div>
                                            </>}
                                    </form>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReInstallation