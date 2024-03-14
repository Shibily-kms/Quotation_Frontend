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
import { YYYYMMDDFormat } from '../../assets/js/help-functions'

function Installation() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState('')
    const [find, setFind] = useState('')
    const [form, setForm] = useState({})
    const [states, setStates] = useState([])
    const [districts, setDistricts] = useState([])
    const [posts, setPosts] = useState([])
    const [zoneList, setZoneList] = useState([])
    const [purifierList, setPurifierList] = useState([])
    const [whList, setWHList] = useState([])
    const [purifierUsageList, setPurifierUsageList] = useState([])


    const modes = [
        { option: 'NEW MACHINE', value: 'NEW MACHINE' },
        { option: 'CHANGE MACHINE IN WARRANTY', value: 'CHANGE MACHINE IN WARRANTY' }
    ]

    const handleFindSubmit = (e) => {
        e.preventDefault();
        setLoading('find')
        customerAxios.get(`/profile?cid=${find}`).then((response) => {
            setForm({
                cid: response.data.data.cid,
                first_name: response.data.data?.first_name,
                last_name: response.data.data?.last_name,
                address: response.data.data.address?.address,
                place: response.data.data.address?.place,
                post: response.data.data.address?.post,
                district: response.data.data.address?.district,
                state: response.data.data.address?.state,
                pin_code: response.data.data.address?.pin_code,
                land_mark: response.data.data.address?.land_mark,
                contact1: response.data.data?.contact1,
                contact2: response.data.data?.contact2,
                whatsapp1: response.data.data?.whatsapp1,
                zone_id: response.data.data?.zone_id,
                purifier: response.data.data?.purifier_customer_status ? true : false,
                whole_house: response.data.data?.wh_customer_status ? true : false,
                installed_at: YYYYMMDDFormat(new Date())
            })

            customerAxios.get('/zone-list').then((res) => {
                const zones = res?.data?.data || []
                setZoneList(zones.map((obj) => ({ option: obj.zone, value: obj._id, selected: response.data.data?.zone_id === obj._id })))
            })

            customerAxios.get('/post-office-list').then((res) => {
                let dtList = [], poList = []
                // State
                const stateList = (res?.data?.data || []).map((obj) => {
                    if (obj.state === response?.data?.data?.address?.state) {
                        dtList = obj.districts
                        return { option: obj.state, value: obj.state, districts: obj.districts, selected: true }
                    }
                    return { option: obj.state, value: obj.state, districts: obj.districts, }
                })
                setStates([...stateList, { option: 'other', value: 'other' }])

                // District
                const districtList = dtList.map((obj) => {
                    if (obj.name === response?.data?.data?.address?.district) {
                        poList = obj.posts
                        return { option: obj.name, value: obj.name, posts: obj.posts, selected: true }
                    }
                    return { option: obj.name, value: obj.name, posts: obj.posts }
                })
                setDistricts([...districtList, { option: 'other', value: 'other' }])

                // Post
                const postList = poList.map((obj) => {
                    if (obj.name === response?.data?.data?.address?.post) {
                        return { option: obj.name, value: obj.name, selected: true }
                    }
                    return { option: obj.name, value: obj.name }
                })
                setPosts([...postList, { option: 'other', value: 'other' }])

                setLoading('')
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

        userAxios.post('/setup/installation', form).then(() => {
            setForm({})
            setFind('')
            setLoading('')
            navigate('/')
            toast.success('Form successfully submitted !')
        }).catch((error) => {
            setLoading('')
            toast.error(error.message)
        })

    }

    const splitAtFirst = (str, delimiter) => {
        let parts = str.split(delimiter, 2); // Limit to 2 parts to ensure it only splits at the first occurrence
        if (parts.length === 1) return parts; // Delimiter not found, return original string in an array
        return [parts[0], parts.slice(1).join(delimiter)]; // Re-join the second part in case the delimiter appears more than once
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })

        if (e.target.name === 'state') {
            states?.map((obj) => {
                if (obj.option === e.target.value) {
                    const dtList = (obj?.districts || [])?.map((dt) => ({ option: dt.name, value: dt.name, posts: dt.posts }))
                    setDistricts([...dtList, { option: 'other', value: 'other' }])
                }
                return obj;
            })

            setForm({
                ...form,
                [e.target.name]: e.target.value,
                district: null,
                post: null
            })
        }

        if (e.target.name === 'district') {
            districts?.map((obj) => {
                if (obj.option === e.target.value) {
                    const postList = (obj?.posts || [])?.map((dt) => ({ option: dt.name, value: dt.name, pin: dt.pin_code }))
                    setPosts([...postList, { option: 'other', value: 'other' }])
                }
                return obj
            })

            setForm({
                ...form,
                [e.target.name]: e.target.value,
                post: null
            })
        }

        if (e.target.name === 'post') {
            let pin = null
            posts?.map((obj) => {
                if (obj.option === e.target.value) {
                    pin = obj.pin
                }
                return obj;
            })
            setForm({
                ...form,
                [e.target.name]: e.target.value,
                pin_code: pin || form?.pin_code
            })

        }

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
                        <Title title={'Installation'} />
                    </div>
                    <div className="bottom">
                        <div className="boarder">
                            <div className="form-border-div">
                                <div className="section-one-div">
                                    <form action="" onSubmit={handleFindSubmit}>
                                        <NormalInput label='Customer Id' name='cid' value={find} onChangeFun={(e) => setFind(e.target.value)} type={'number'} />
                                        <div className="button-div">
                                            <button type='button' onClick={resetData}>Reset</button>
                                            <button>{loading === 'find' ? <span className='loading-icon'><BiLoaderAlt /></span> : 'Find'}</button>
                                        </div>
                                    </form>
                                </div>
                                {form?.cid && <div className="section-three-div">
                                    <h3>{form?.cid || ''} Customer Info</h3>
                                    <form action="" onSubmit={handleFormSubmit}>
                                        <div className="info-one">
                                            <NormalInput label='First name' name='first_name' value={form.first_name} onChangeFun={handleChange} />
                                            <NormalInput label='Last name' name='last_name' value={form.last_name} onChangeFun={handleChange} />
                                            <NormalInput label='Address' name='address' value={form.address} onChangeFun={handleChange} />
                                            <NormalInput label='Place' name='place' value={form.place} onChangeFun={handleChange} />
                                            <SelectInput label='State' name='state' values={states} firstOption={{ option: 'Choose', value: '' }}
                                                onChangeFun={handleChange} />
                                            <SelectInput label='District' name='district' values={districts} firstOption={{ option: 'Choose', value: '' }}
                                                onChangeFun={handleChange} />
                                            <SelectInput label='Post' name='post' values={posts} firstOption={{ option: 'Choose', value: '' }}
                                                onChangeFun={handleChange} />
                                            <NormalInput label='Pin code' name='pin_code' value={form.pin_code} type={'number'} onChangeFun={handleChange} />
                                            <NormalInput label='Land mark' name='land_mark' value={form.land_mark} onChangeFun={handleChange} />

                                            <SelectInput label='Zone' name='zone_id' values={zoneList} firstOption={{ option: 'Choose', value: '' }}
                                                onChangeFun={handleChange} />
                                            <NormalInput label='Contact (Primary)' name='contact1' value={form.contact1} type={'number'} onChangeFun={handleChange} />
                                            <NormalInput label='Contact (Secondary)' name='contact2' value={form.contact2} type={'number'} onChangeFun={handleChange} isRequired={false} />
                                            <NormalInput label='Whatsapp' name='whatsapp1' value={form.whatsapp1} type={'number'} onChangeFun={handleChange} />

                                        </div>
                                        {(form?.purifier && form?.whole_house)
                                            ? <>
                                                <InfoBox type={'warning'} description={'Purifier and whole-house system user'} />
                                            </>
                                            : <>
                                                <h3>Installation Info</h3>
                                                <SelectInput label='Mode of Installation' name='mode_of_installation' values={modes} firstOption={{ option: 'Choose', value: '' }}
                                                    onChangeFun={handleChange} />
                                                <NormalInput label='Installation Date' type={'date'} name='installed_at' value={form?.installed_at} onChangeFun={handleChange} max={YYYYMMDDFormat(new Date())} />


                                                <div className="radio-input-border-div">
                                                    <div className="sub-title"><h5>Type of product</h5></div>
                                                    <div className="radio-inputs">
                                                        {!form?.purifier && <RadioInput label={"Purifier"} name={'product'} value={'purifier'} onChangeFun={handleChange} />}
                                                        {!form?.whole_house && <RadioInput label={"WH Filter"} name={'product'} value={'wh_filter'} onChangeFun={handleChange} />}
                                                        {(!form?.purifier && !form?.whole_house) && <RadioInput label={"Purifier & WH Filter"} name={'product'} value={'package'} onChangeFun={handleChange} />}
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

export default Installation