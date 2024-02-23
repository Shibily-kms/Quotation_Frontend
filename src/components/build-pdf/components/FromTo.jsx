import React from 'react'
import { View, Text, StyleSheet } from '@react-pdf/renderer';

function FromTo({ customer }) {
    const styles = StyleSheet.create({
        parent: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: '8px 0',
            marginBottom: '12px'
        },
        head: {
            fontWeight: 600,
            fontSize: '13px',
            marginBottom: '7px'
        },
        text: {
            marginBottom: '2px'
        }
    })
    return (
        <View style={styles.parent}>
            <View style={{ textAlign: 'left' }}>
                <Text style={styles.head}>Quotation From,</Text>
                <Text style={styles.text}>Alliance Water Solutions</Text>
                <Text style={styles.text}>Chalingad PO</Text>
                <Text style={styles.text}>Kaipamangalam, Thrissur</Text>
                <Text style={styles.text}>Pin code: 680 681</Text>
            </View>
            <View style={{ textAlign: 'left' }}>
                <Text style={styles.head}>Quotation To,</Text>
                <Text style={styles.text}>{customer?.name}</Text>
                <Text style={styles.text}>{customer?.address}</Text>
                <Text style={styles.text}>{customer?.place && `${customer?.place},`} {customer?.post && `${customer?.post} (P.O)`}</Text>
                <Text style={styles.text}>{customer?.dt && `${customer?.dt} Dt. `} {customer?.pin && `- ${customer?.pin}`}</Text>
                <Text style={styles.text}>Mobile : {customer?.mobile}</Text>
            </View>
        </View>
    )
}

export default FromTo