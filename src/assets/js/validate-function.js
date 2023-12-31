function form1Validate(data, type) {
    if (data.customer.pin.length < 6) {
        return { status: false, message: 'Add 6 pin numbers' }
    } else if (data.customer.mobile.length < 10) {
        return { status: false, message: 'Add min 10 mobile numbers' }
    } else if (!data?.test_report?.source) {
        return { status: false, message: 'Choose Source' }
    } else if ((type === 'purifier' || type === 'wh-and-purifier') && (!data?.pws_report?.site
        || !data?.pws_report?.usage || !data?.pws_report?.iMode
        || !String(data?.pws_report?.water_point) || !String(data?.pws_report?.plug_point))
    ) {
        return { status: false, message: 'Fill PWS Report Fields' }
    } else if ((type === 'whole-house' || type === 'wh-and-purifier') && (!data?.vfs_report?.site
        || !data?.vfs_report?.usage || !data?.vfs_report?.inlet
        || !data?.vfs_report?.outlet)
    ) {
        return { status: false, message: 'Fill VFS Report Fields' }
    } else {
        return { status: true }
    }
}



function form3Validate(data, fill) {
    if (!fill.one) {
        return { status: false, message: 'Section one required' }
    } else if (!fill.two) {
        return { status: false, message: 'Section two required' }
    } else {
        return { status: true }
    }
}

export { form1Validate, form3Validate }