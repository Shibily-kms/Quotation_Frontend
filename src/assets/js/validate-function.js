function form1Validate(data, type) {
    if (data.to.pin.length < 6) {
        return { status: false, message: 'Add 6 pin numbers' }
    } else if (data.to.mobile.length < 10) {
        return { status: false, message: 'Add min 10 mobile numbers' }
    } else if (!data?.testReport?.source || data?.testReport?.source === 'Choose...') {
        return { status: false, message: 'Choose Source' }
    } else if (data?.findings?.length < 1 || !data?.findings) {
        return { status: false, message: 'Add additional findings' }
    } else if ((type === 'purifier' || type === 'wh-and-perifier') && (!data?.pwsReport?.site || data?.pwsReport?.site === 'Choose...'
        || !data?.pwsReport?.usage || data?.pwsReport?.usage === 'Choose...'
        || !data?.pwsReport?.iMode || data?.pwsReport?.iMode === 'Choose...'
        || !data?.pwsReport?.waterPoint || data?.pwsReport?.waterPoint === 'Choose...'
        || !data?.pwsReport?.plugPoint || data?.pwsReport?.plugPoint === 'Choose...')
    ) {
        return { status: false, message: 'Fill PWS Report Feilds' }
    } else if ((type === 'whole-house' || type === 'wh-and-perifier') && (!data?.vfwsReport?.site || data?.vfwsReport?.site === 'Choose...'
        || !data?.vfwsReport?.usage || data?.vfwsReport?.usage === 'Choose...'
        || !data?.vfwsReport?.inlet || data?.vfwsReport?.inlet === 'Choose...'
        || !data?.vfwsReport?.outlet || data?.vfwsReport?.outlet === 'Choose...'
        || !data?.vfwsReport?.brInTop || data?.vfwsReport?.brInTop === 'Choose...')
    ) {
        return { status: false, message: 'Fill VFWS Report Feilds' }
    } else {
        return { status: true }
    }
}

function form2Validate(data, type) {
    if (data?.preferred?.length < 1 || !data?.preferred) {
        return { status: false, message: 'Select Preferred Solutions' }
    } else if (data?.custPreferred?.length < 1 || !data?.custPreferred) {
        return { status: false, message: 'Select Custormer Preferred Solutions' }
    }
    if (type === 'purifier' || type === 'wh-and-perifier') {
        if (data?.purifierComponent?.length < 1 || !data?.purifierComponent) {
            return { status: false, message: 'Select Any Purifier Components' }
        }
    } else if (type === 'whole-house' || type === 'wh-and-perifier') {
        if (data?.materials?.length < 1 || !data?.materials) {
            return { status: false, message: 'Select Any Materials' }
        } else if (data?.vfcComponent?.length < 1 || !data?.vfcComponent) {
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