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
import sealImage from '../../assets/images/seal.png'
import demmiSign from '../../assets/images/demmiSign.png'

const styles = StyleSheet.create({
    w_body: {
        width: '100%',
    },
    w_child: {
        flexDirection: 'row',
    },
    w_text_1: {
        width: '35%',
        textAlign: 'justify',
    },
    w_text_2: {
        width: '65%',
        textAlign: 'justify',
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
    sign_body: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        flexDirection: 'row',
    },
    sign_child: {
        textAlign: 'left'
    },
    signature: {
        width: "120px",
        height: '50px',
        marginTop: '30px'
    },
    seal: {
        width: "100px",
        height: '80px'
    },
    srlNo: {
        textAlign: 'right',
        fontWeight: 'bold'
    }

});


const BuildPdf = ({ data }) => {
    const content = createContent(data)
 
    return (
        <Document>
            <PageWrapper >
                <View >
                    <Text style={styles.srlNo}>{`Serial No : ${data?.quotation_srl_no}`}</Text>
                    {/* Quotation FromTo */}
                    <FromTo customer={data.customer} />
                    {content?.intro && <Peragraph textArray={content.intro} />}

                    {/* Water Test Report */}
                    <Heading text={'Water test report'} />
                    {content?.testReport && <TableModel data={content?.testReport} />}

                    {/* Additional Findings */}
                    <Heading text={'Additional Findings'} />
                    {content?.findings && <ListModel listArray={content?.findings} />}

                    <Text break={((data.type === 'whole-house' || data.type === 'wh-and-purifier') && content?.findings?.length <= 3) ? true : false} />

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

                    <Text break={data.type === 'purifier' ? true : false} />

                    {/* Preferred Solutions */}
                    <Heading text={'Preferred Solution'} />
                    {content?.solutionList && <ListModel listArray={content?.solutionList} />}
                    {content?.preferred && <TableModel data={content?.preferred} total={true} />}

                    {/* Customer Selected Solutions */}
                    <Heading text={'Customer Selected Solution'}
                    />
                    {content?.customerSeleted && <TableModel data={content?.customerSeleted} total={true} />}

                    {/* <Text break={data.type === 'wh-and-purifier' ? true : false} /> */}

                    {/* Warranty */}
                    <Heading text={'Warranty'} />
                    <View style={styles.w_body}>
                        <View style={styles.w_child}>
                            {data.type === 'whole-house' || data.type === 'wh-and-purifier' ? <Text style={styles.w_text_1}>Vessel Filtration System</Text> : ''}
                            {data.type === 'whole-house' || data.type === 'wh-and-purifier' ? <Text style={styles.w_text_2}>{data.warranty?.vfs}</Text> : ''}
                        </View>
                        <View style={styles.w_child}>
                            {data.type === 'purifier' || data.type === 'wh-and-purifier' ? <Text style={styles.w_text_1}>RO Purifier</Text> : ''}
                            {data.type === 'purifier' || data.type === 'wh-and-purifier' ? <Text style={styles.w_text_2}>{data.warranty?.pws}</Text> : ''}
                        </View>
                    </View>
                    <View style={styles.w_star}><Text>*T&C Apply.</Text></View>

                    {/* <Text break={data.type === 'whole-house' || data.type === 'purifier' ? true : false} /> */}

                    {/* Materials and Component - WH */}
                    {data.type === 'whole-house' || data.type === 'wh-and-purifier' ? <>
                        <Heading text={'Materials Used In Vessel Filtration System'}
                        />
                        {content?.materials && <TableModel data={content?.materials} />}

                        <Heading text={'Components Used In Vessel Filtration System'} />
                        {content?.whComponents && <TableModel data={content?.whComponents} />}
                    </>
                        : ''}

                    {/* <Text break={data.type === 'wh-and-purifier' ? true : false} /> */}

                    {/* Purifier Component */}
                    {data.type === 'purifier' || data.type === 'wh-and-purifier' ? <>
                        <Heading text={'Components With RO Purifier'}
                        />
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
                    <View style={styles.sign_body}>
                        <View style={styles.sign_child}>
                            <Image style={styles.signature} src={data?.sign?.customer?.url || demmiSign} />
                            <Text>Customer signature</Text>
                        </View>
                        <View style={styles.sign_child}>
                            <Image style={styles.seal} src={sealImage} />
                            <Text>Authorized signature</Text>
                        </View>
                    </View>

                    {/* Date */}
                    <View style={{ marginTop: '15px' }}>
                        <Text>{`Date    : ${new Date(data.updatedAt).toDateString()}`}</Text>
                        <Text>{`Place   : Kaipamangalam`}</Text>
                    </View>


                </View>
            </PageWrapper>
        </Document>
    );
};

export default BuildPdf;

