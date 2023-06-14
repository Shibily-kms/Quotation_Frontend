import React from 'react'
import { Text, StyleSheet } from '@react-pdf/renderer';


function Peragraph({ textArray }) {   // textArray = type is array
    const styles = StyleSheet.create({
        paragraph: {
            fontSize: '12px',
            textAlign: 'justify',
            textIndent: 30,
            margin: '8px 0',
            lineHeight:'1.5px'
        }
    })
    return (
        <>
            {textArray.map((text, index) => (
                <Text key={index} style={styles.paragraph}>
                    {text}
                </Text>
            )
            )}
        </>
    )
}

export default Peragraph