import React from 'react';
import { Text, View, Document, Image, StyleSheet } from '@react-pdf/renderer';
import Peragraph from './components/Peragraph';
import PageWrapper from './components/PageWrapper';
import FromTo from './components/FromTo';
import Heading from './components/Heading';
import TableModel from './components/TableModel';
import ListModel from './components/ListModel';
import './fonts/Fonts'
import { createContent } from '../../assets/js/pdf-data-helper'
import imageAPI from '../../config/imageAPI'

const styles = StyleSheet.create({
    w_body: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        flexDirection: 'row',
    },
    w_child: {
        textAlign: 'left'
    },
    w_star: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '5px',
        flexDirection: 'row'
    },
    thanks: {
        textAlign: 'center',
        width: '100%',
        marginBottom: '15px',
        marginTop: '15px',
        fontWeight: 600,
        fontSize: '14px'
    },
    signature: {
        width: "120px",
        height: '50px'
    }

});


const BuildPdf = ({ data }) => {
    const content = createContent(data)

    return (
        <Document>
            <PageWrapper >
                <View >
                    {/* Quotation FromTo */}
                    <FromTo customer={data.customer} />
                    {content?.intro && <Peragraph textArray={content.intro} />}

                    {/* Water Test Report */}
                    <Heading text={'Water test report'} />
                    {content?.testReport && <TableModel data={content?.testReport} />}

                    {/* Additional Findings */}
                    <Heading text={'Additional Findings'} />
                    {content?.findings && <ListModel listArray={content?.findings} />}

                    {/* Work Site Report - WH */}
                    {data.type === 'whole-house' || data.type === 'wh-and-purifier' ? <>
                        <Heading text={data.type === 'whole-house' ? 'Work site Report' : 'Work site Report - Vessel Filter'} />
                        {content?.siteReportWH[0] && <TableModel data={content?.siteReportWH[0]} />}
                        {content?.siteReportWH[1] && <TableModel data={content?.siteReportWH[1]} />}
                    </>
                        : ''}

                    {/* Work Site Report - Purifier */}
                    {data.type === 'purifier' || data.type === 'wh-and-purifier' ? <>
                        <Heading text={data.type === 'purifier' ? 'Work site Report' : 'Work site Report - RO Purifier'} />
                        {content?.siteReportPr && <TableModel data={content?.siteReportPr} />}
                    </>
                        : ''}

                    {/* Preferred Solutions */}
                    <Heading text={'Preferred Solution'} />
                    {content?.solutionList && <ListModel listArray={content?.solutionList} />}
                    {content?.preferred && <TableModel data={content?.preferred} />}

                    {/* Customer Selected Soltions */}
                    <Heading text={'Customer Selected Solution'} />
                    {content?.customerSeleted && <TableModel data={content?.customerSeleted} />}

                    {/* Warranty */}
                    <Heading text={'Warranty'} />
                    <View style={styles.w_body}>
                        <View style={styles.w_child}>
                            {data.type === 'whole-house' || data.type === 'wh-and-purifier' ? <Text>Vessel Filtration System</Text> : ''}
                            {data.type === 'purifier' || data.type === 'wh-and-purifier' ? <Text>RO Purifier</Text> : ''}
                        </View>
                        <View style={styles.w_child}>
                            {data.type === 'whole-house' || data.type === 'wh-and-purifier' ? <Text>{data.warranty?.vfws}</Text> : ''}
                            {data.type === 'purifier' || data.type === 'wh-and-purifier' ? <Text>{data.warranty?.pws}</Text> : ''}
                        </View>
                    </View>
                    <View style={styles.w_star}><Text>*T&C Apply.</Text></View>

                    {/* Materials and Component - WH */}
                    {data.type === 'whole-house' || data.type === 'wh-and-purifier' ? <>
                        <Heading text={'Materials Used In Vessel Filtration System'} />
                        {content?.materials && <TableModel data={content?.materials} />}

                        <Heading text={'Components Used In Vessel Filtration System'} />
                        {content?.whComponents && <TableModel data={content?.whComponents} />}
                    </>
                        : ''}

                    {/* Purifier Component */}

                    {data.type === 'purifier' || data.type === 'wh-and-purifier' ? <>
                        <Heading text={'Components With RO Purifier'} />
                        {content?.prComponents && <TableModel data={content?.prComponents} />}
                    </>
                        : ''}

                    {/* Terms and Conditions */}
                    <Heading text={'*Terms and Conditions'} />
                    {content?.tac && <ListModel listArray={content?.tac} />}

                    {/* Thanks */}
                    <View style={styles.thanks}>
                        <Text>Alliance Keeps Alliances Forever</Text>
                        <Text>Thank you For Your Support</Text>
                    </View>

                    {/* Signature */}
                    <View style={styles.w_body}>
                        <View style={styles.w_child}>
                            <Image style={styles.signature} src={`${imageAPI}/signature/${data.quotation_srl_no}customer.png`} />
                            <Text>Customer signature</Text>
                        </View>
                        <View style={styles.w_child}>
                            <Image style={styles.signature} src={`${imageAPI}/signature/${data.quotation_srl_no}authorized.png`} />
                            <Text>Authorized signature</Text>
                        </View>
                    </View>

                    {/* Date */}
                    <View style={{ marginTop: '15px' }}>
                        <Text>{`Date    : ${data.visit_date}`}</Text>
                        <Text>{`Place   : Kaipamangalam`}</Text>
                    </View>

                </View>
            </PageWrapper>
        </Document>
    );
};

export default BuildPdf;

