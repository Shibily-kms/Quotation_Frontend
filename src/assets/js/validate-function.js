function form1Validate(data, type) {
    if (data.customer.pin.length < 6) {
        return { status: false, message: 'Add 6 pin numbers' }
    } else if (data.customer.mobile.length < 10) {
        return { status: false, message: 'Add min 10 mobile numbers' }
    } else if (!data?.test_report?.source) {
        return { status: false, message: 'Choose Source' }
    } else if (data?.findings?.length < 1 || !data?.findings) {
        return { status: false, message: 'Add additional findings' }
    } else if ((type === 'purifier' || type === 'wh-and-purifier') && (!data?.pws_report?.site
        || !data?.pws_report?.usage || !data?.pws_report?.iMode
        || !data?.pws_report?.water_point || !data?.pws_report?.plug_point)
    ) {
        return { status: false, message: 'Fill PWS Report Feilds' }
    } else if ((type === 'whole-house' || type === 'wh-and-purifier') && (!data?.vfws_report?.site
        || !data?.vfws_report?.usage || !data?.vfws_report?.inlet
        || !data?.vfws_report?.outlet || !data?.vfws_report?.bathroom_in_top)
    ) {
        return { status: false, message: 'Fill VFWS Report Feilds' }
    } else {
        return { status: true }
    }
}

function form2Validate(data, type) {
   
    if (data?.preferred_solution?.length < 1 || !data?.preferred_solution) {
        return { status: false, message: 'Select Preferred Solutions' }
    } else if (data?.cust_preferred_solution?.length < 1 || !data?.cust_preferred_solution) {
        return { status: false, message: 'Select Custormer Preferred Solutions' }
    }
    if (type === 'purifier' || type === 'wh-and-purifier') {
        if (data?.purifier_component?.length < 1 || !data?.purifier_component) {
            return { status: false, message: 'Select Any Purifier Components' }
        }
    }
    if (type === 'whole-house' || type === 'wh-and-purifier') {
        if (data?.materials?.length < 1 || !data?.materials) {
            return { status: false, message: 'Select Any Materials' }
        } else if (data?.vfs_component?.length < 1 || !data?.vfs_component) {
            return { status: false, message: 'Select Any Vessel Component' }
        }
    }
    return { status: true }

}

function form3Validate(data, fill) {
    if (data?.tac?.length < 1 || !data?.tac) {
        return { status: false, message: 'Add Terms and Conditions' }
    } else if (!data?.sign?.customer || !data?.sign?.authorized) {
        return { status: false, message: 'Add Signature' }
    } else if (!fill.one) {
        return { status: false, message: 'Section one required' }
    } else if (!fill.two) {
        return { status: false, message: 'Section two required' }
    } else {
        return { status: true }
    }
}

export { form1Validate, form2Validate, form3Validate }