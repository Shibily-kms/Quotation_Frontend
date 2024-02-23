import React from 'react'
import { Page, View, Image,  StyleSheet, } from '@react-pdf/renderer';
import LetterHead from '../../../assets/images/letter_head.png'

function PageWrapper({ children }) {

    const styles = StyleSheet.create({
        page: {
            paddingBottom: '100pt',
            paddingTop: '80pt',
            paddingLeft: '55pt',
            paddingRight: '55pt',
            fontSize: '11px',
            fontFamily: ' ArimaMalayalam',
            fontWeight: 400 
        },
        watermark: [{
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            top: 0,
            zIndex: -1

        }, {
            alignItems: 'center',
        }]
    });
    return (

        <Page style={styles.page}>
            <View >
                {children}
            </View>
            <View style={styles.watermark} fixed>
                <Image src={LetterHead} fixed />
            </View>
        </Page>

    )
}

export default PageWrapper