function createContent(data) {

    let content = {
        intro: ['We appreciate the opportunity to serve you. At Alliance Water Solutions, we understand the importance of clean and safe water. Our commitment is to offer you the most suitable solutions that meet your requirements.'],
        testReport: [],
        findings: [],
        siteReportWH: [],
        siteReportPr: [],
        solutionList: [],
        preferred: [],
        customerSeleted: [],
        materials: [],
        whComponents: [],
        prComponents: [],
        tac: []
    }
    // Common
    // water test report
    content.testReport.push({ a: 'Source', b: 'TDS (mg/L)', c: 'PH (mg/L)', d: 'IRON (as fe) mg/L', e: 'CALCIUM & MAGNESIUM' })
    content.testReport.push({
        a: data?.test_report?.source,
        b: data?.test_report?.tds ? `${data?.test_report?.tds}` : '-',
        c: data?.test_report?.ph ? `${data?.test_report?.ph}` : '-',
        d: data?.test_report?.fe ? `${data?.test_report?.fe}` : '-',
        e: data?.test_report?.ca ? `${data?.test_report?.ca}` : '-',
    })

    // Findings
    data.findings.forEach((obj) => {
        content.findings.push(obj.text)
    })

    // Preferred
    let amount = 0;
    content.preferred.push({ a: 'MODEL NAME', b: 'RATE', c: 'QTY', d: 'TOTAL' })
    data.preferred_solution.forEach((obj) => {
        content.preferred.push({ a: obj.item, b: obj.price, c: (obj?.qty || 1), d: (obj?.qty || 1) * obj.price })
        amount = amount + ((obj?.qty || 1) * obj.price)
    })
    content.preferred.push({ a: 'TOTAL AMOUNT', b: '', c: '', d: `${data.ps_total}  ${data?.gst_include ? `\n (GST Included)` : amount > data?.ps_total ? `\n (With discount)` : ''}` })

    // Customer selected
    let amount2 = 0;
    content.customerSeleted.push({ a: 'MODEL NAME', b: 'RATE', c: 'QTY', d: 'TOTAL' })
    data.cust_preferred_solution.forEach((obj) => {
        content.customerSeleted.push({ a: obj.item, b: obj.price, c: (obj?.qty || 1), d: (obj?.qty || 1) * obj.price })
        amount2 = amount2 + ((obj?.qty || 1) * obj.price)
    })
    content.customerSeleted.push({ a: 'TOTAL AMOUNT', b: '', c: '', d: `${data.css_total} ${data?.gst_include ? `\n (GST Included)` : amount > data?.css_total ? ` \n (With discount)` : ''}` })

    // TAC
    if (data?.type === 'whole-house' || data?.type === 'wh-and-purifier') {
        /* 1*/
        content.tac.push('The Vessel filtration system is designed specifically for the removal of Iron and Iron smell. However, it does not remove Calcium, Alkalinity, and Total Dissolved Solids (TDS).')
    }
    content.tac.push('The effectiveness of the filtration process is based on the Primary water test report of the current water source. Any changes in the composition of the current water source may affect the filtration results.')
    if (data?.type === 'purifier') {
        /* 2*/
        content.tac.push(`To ensure optimal performance and minimize maintenance requirements, it is recommended that the purifier is used for a maximum daily usage of ${data?.purifier_max_usage} liters per day.`)
    } else if (data?.type === 'whole-house') {
        /* 3*/
        content.tac.push(`To ensure optimal performance and minimize maintenance requirements, it is recommended that the vessel water filtration system can handle a maximum daily usage of up to ${data?.vfs_max_usage} liters per day.`)
    } else {
        /* 4*/
        content.tac.push(`To ensure optimal performance and minimize maintenance requirements, it is recommended that the purifier is used for a maximum daily usage of ${data?.purifier_max_usage} liters per day.The whole house filter, on the other hand, can handle a maximum daily usage of up to ${data?.vfs_max_usage} liters per day.`)
    }
    /* 5*/
    content.tac.push(`The company shall not be held responsible for any additional problems arising from the customer's failure to follow the company's suggestions and recommendations.`)
    /* 6*/
    content.tac.push(`This quotation is valid until ${data?.expr_date}. After this date, the prices and terms mentioned herein may be subject to change.`)
    data.tac.forEach((obj) => {
        content.tac.push(obj.text)
    })


    // Conditions
    if (data?.type === 'purifier') {
        content.intro[0] = content.intro[0] + ` The quotation provided has been tailored specifically to address the needs identified in the ${data?.test_report?.type_of || 'primary'} water test report.`
        content.intro.push(`Visit date: ${data.visit_date} `)
    }

    if (data?.type === 'purifier' || data?.type === 'wh-and-purifier') {
        // Work Sit Report 
        content.siteReportPr.push({ a: 'SITE', b: 'USAGE', c: 'INSTALLATION MODE', d: 'WATER POINT', e: 'PLUG POINT' })
        content.siteReportPr.push({
            a: data?.pws_report?.site,
            b: data?.pws_report?.usage,
            c: data?.pws_report?.iMode,
            d: data?.pws_report?.water_point ? 'Yes' : "No",
            e: data?.pws_report?.plug_point ? 'Yes' : "No"
        })

        // Preferreed Solution
        content.solutionList.push('Installation of RO Purifier System: Removing all types of contaminants and ensuring the water is converted into a directly drinkable form.')

        // Components
        content.prComponents.push({ a: 'NAME', b: 'BRAND' })
        data?.purifier_component.forEach((obj) => {
            content.prComponents.push({ a: obj.item, b: obj.brand })
        })
    }

    if (data?.type === 'whole-house' || data?.type === 'wh-and-purifier') {
        // Intro
        content.intro.push(`Our technician visited your location on ${data.visit_date}, and this quotation has been prepared based on the water conditions, daily water usage and plumbing situation.The quotation provided has been tailored specifically to address the needs identified in the ${data?.test_report?.type_of || 'primary'} water test report.`)

        // Work Site Report - WH
        let arr1 = [], arr2 = []
        arr1.push({ a: 'SITE', b: 'USAGE', c: 'TANK CAPASITY', d: 'MOTOR DETAILS', e: 'FLOOR DETAILS' })
        arr1.push({
            a: data?.vfs_report?.site,
            b: data?.vfs_report?.usage,
            c: data?.vfs_report?.tank_capasity ? `${data?.vfs_report?.tank_capasity} (L)` : '-',
            d: data?.vfs_report?.motor_details,
            e: data?.vfs_report?.floor_details
        })
        arr2.push({ a: 'FLOOR HEIGHT', b: 'INLET', c: 'OUTLET', d: 'BATHROOMS ON TOP', e: 'BASEMENT' })
        arr2.push({
            a: data?.vfs_report?.floor_hight ? `${data?.vfs_report?.floor_hight} feet` : '-',
            b: data?.vfs_report?.inlet ? `${data?.vfs_report?.inlet} mm` : '-',
            c: data?.vfs_report?.outlet ? `${data?.vfs_report?.outlet} mm` : '-',
            d: data?.vfs_report?.bathroom_in_top,
            e: data?.vfs_report?.basement ? 'Yes' : 'No'
        })
        content.siteReportWH.push(arr1)
        content.siteReportWH.push(arr2)

        // Preferreed Solution
        content.solutionList.push('Installation of Vessel Filtration System: Treatment for Turbidity and Iron Removal')

        // Materials
        content.materials.push({ a: 'NAME', b: 'BRAND' })
        data?.materials.forEach((obj) => {
            content.materials.push({ a: obj.item, b: obj.brand })
        })

        // Components
        content.whComponents.push({ a: 'NAME', b: 'BRAND' })
        data?.vfs_component.forEach((obj) => {
            content.whComponents.push({ a: obj.item, b: obj.brand })
        })
    }

    return content;
}

export { createContent }