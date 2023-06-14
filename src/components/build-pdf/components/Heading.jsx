import React from 'react'
import { Text, StyleSheet } from '@react-pdf/renderer';


function Heading({ text }) {
    let styles = StyleSheet.create({
        heading: {
            fontSize: '13px',
            fontWeight: 700,
            marginTop:'15px',
            marginBottom:'5px'
        }
    })
    return (
        <Text style={styles.heading}>{text}</Text>
    )
}

export default Heading